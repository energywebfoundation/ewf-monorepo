import { call, put, select, take, all, fork, apply, cancel } from 'redux-saga/effects';
import { SagaIterator, eventChannel } from 'redux-saga';
import { setMarketContractLookupAddress } from './actions';
import { getSearch } from 'connected-react-router';
import { getConfiguration } from '../selectors';
import * as queryString from 'query-string';
import * as Winston from 'winston';
import { Certificate } from '@energyweb/origin';
import { Configuration, ContractEventHandler, EventHandlerManager } from '@energyweb/utils-general';
import Web3 from 'web3';
import {
    Demand,
    createBlockchainProperties as marketCreateBlockchainProperties
} from '@energyweb/market';
import {
    configurationUpdated,
    demandDeleted,
    consumingAssetCreatedOrUpdated,
    demandCreated
} from '../actions';
import { ProducingAsset, ConsumingAsset } from '@energyweb/asset-registry';
import { BACKEND_URL, getMarketContractLookupAddressFromAPI } from '../../utils/api';
import { setError, setLoading } from '../general/actions';
import { updateCurrentUserId } from '../users/actions';
import { producingAssetCreatedOrUpdated } from '../producingAssets/actions';
import { certificateCreatedOrUpdated } from '../certificates/actions';

enum ERROR {
    WRONG_NETWORK_OR_CONTRACT_ADDRESS = "Please make sure you've chosen correct blockchain network and the contract address is valid."
}

async function initConf(
    marketContractLookupAddress: string,
    routerSearch: string
): Promise<Configuration.Entity> {
    let web3: Web3 = null;
    const params: any = queryString.parse(routerSearch);

    if (params.rpc) {
        web3 = new Web3(params.rpc);
    } else if ((window as any).ethereum) {
        web3 = new Web3((window as any).ethereum);
        try {
            // Request account access if needed
            await (window as any).ethereum.enable();
        } catch (error) {
            // User denied account access...
        }
    } else if ((window as any).web3) {
        web3 = new Web3(web3.currentProvider);
    }

    const blockchainProperties: Configuration.BlockchainProperties = await marketCreateBlockchainProperties(
        web3,
        marketContractLookupAddress
    );

    return {
        blockchainProperties,
        offChainDataSource: {
            baseUrl: BACKEND_URL
        },

        logger: Winston.createLogger({
            level: 'debug',
            format: Winston.format.combine(Winston.format.colorize(), Winston.format.simple()),
            transports: [new Winston.transports.Console({ level: 'silly' })]
        })
    };
}

function* initEventHandler() {
    const configuration: Configuration.Entity = yield select(getConfiguration);

    if (!configuration) {
        return;
    }

    const currentBlockNumber: number = yield call(
        configuration.blockchainProperties.web3.eth.getBlockNumber
    );

    const eventHandlerManager: EventHandlerManager = new EventHandlerManager(4000, configuration);

    const certificateContractEventHandler: ContractEventHandler = new ContractEventHandler(
        configuration.blockchainProperties.certificateLogicInstance,
        currentBlockNumber
    );

    const demandContractEventHandler: ContractEventHandler = new ContractEventHandler(
        configuration.blockchainProperties.marketLogicInstance,
        currentBlockNumber
    );

    const channel = eventChannel(emitter => {
        certificateContractEventHandler.onEvent('LogPublishForSale', async function(event: any) {
            const certificate = await new Certificate.Entity(
                event.returnValues._entityId,
                configuration
            ).sync();

            emitter({
                action: certificateCreatedOrUpdated(certificate)
            });
        });

        certificateContractEventHandler.onEvent('LogCertificateSplit', async function(event: any) {
            const certificate = await new Certificate.Entity(
                event.returnValues._certificateId,
                configuration
            ).sync();

            emitter({
                action: certificateCreatedOrUpdated(certificate)
            });
        });

        certificateContractEventHandler.onEvent('LogCertificateRetired', async function(
            event: any
        ) {
            const certificate = await new Certificate.Entity(
                event.returnValues._certificateId,
                configuration
            ).sync();

            emitter({
                action: certificateCreatedOrUpdated(certificate)
            });
        });

        certificateContractEventHandler.onEvent('Transfer', async function(event: any) {
            const certificate = await new Certificate.Entity(
                event.returnValues._tokenId,
                configuration
            ).sync();

            emitter({
                action: certificateCreatedOrUpdated(certificate)
            });
        });

        certificateContractEventHandler.onEvent('LogUnpublishForSale', async function(event: any) {
            const certificate = await new Certificate.Entity(
                event.returnValues._entityId,
                configuration
            ).sync();

            emitter({
                action: certificateCreatedOrUpdated(certificate)
            });
        });

        demandContractEventHandler.onEvent('createdNewDemand', async (event: any) => {
            const demand = await new Demand.Entity(
                event.returnValues._demandId,
                configuration
            ).sync();

            emitter({
                action: demandCreated(demand)
            });
        });

        demandContractEventHandler.onEvent('DemandStatusChanged', async (event: any) => {
            if (event.returnValues._status === Demand.DemandStatus.ARCHIVED) {
                emitter({
                    action: demandDeleted(
                        await new Demand.Entity(event.returnValues._demandId, configuration).sync()
                    )
                });
            }
        });

        return () => {
            eventHandlerManager.stop();
        };
    });

    eventHandlerManager.registerEventHandler(certificateContractEventHandler);
    eventHandlerManager.registerEventHandler(demandContractEventHandler);
    eventHandlerManager.start();

    while (true) {
        const { action } = yield take(channel);

        if (!action) {
            break;
        }

        yield put(action);
    }
}

function* fillMarketContractLookupAddressIfMissing(): SagaIterator {
    const marketContractLookupAddress: string = yield call(getMarketContractLookupAddressFromAPI);

    if (marketContractLookupAddress) {
        yield put(setMarketContractLookupAddress(marketContractLookupAddress));
    } else {
        yield put(setError(ERROR.WRONG_NETWORK_OR_CONTRACT_ADDRESS));
        yield put(setLoading(false));

        return;
    }

    const routerSearch: string = yield select(getSearch);

    let configuration: Configuration.Entity;
    try {
        configuration = yield call(initConf, marketContractLookupAddress, routerSearch);

        yield put(configurationUpdated(configuration));

        yield put(setLoading(false));
    } catch (error) {
        console.error('ContractsSaga::WrongNetwork', error);
        yield put(setError(ERROR.WRONG_NETWORK_OR_CONTRACT_ADDRESS));
        yield put(setLoading(false));

        yield cancel();
    }

    try {
        const accounts: string[] = yield call(
            configuration.blockchainProperties.web3.eth.getAccounts
        );

        yield put(updateCurrentUserId(accounts[0]));
    } catch (error) {
        console.error('ContractsSaga::UserDoesntExist', error);
    }

    const producingAssets: ProducingAsset.Entity[] = yield apply(
        ProducingAsset,
        ProducingAsset.getAllAssets,
        [configuration]
    );

    for (const asset of producingAssets) {
        yield put(producingAssetCreatedOrUpdated(asset));
    }

    const consumingAssets: ConsumingAsset.Entity[] = yield apply(
        ConsumingAsset,
        ConsumingAsset.getAllAssets,
        [configuration]
    );

    for (const asset of consumingAssets) {
        yield put(consumingAssetCreatedOrUpdated(asset));
    }

    const demands: Demand.Entity[] = yield apply(Demand, Demand.getAllDemands, [configuration]);

    for (const demand of demands) {
        yield put(demandCreated(demand));
    }

    const certificates: Certificate.Entity[] = yield apply(
        Certificate,
        Certificate.getAllCertificates,
        [configuration]
    );

    for (const certificate of certificates) {
        yield put(certificateCreatedOrUpdated(certificate));
    }

    yield call(initEventHandler);
}

export function* contractsSaga(): SagaIterator {
    yield all([fork(fillMarketContractLookupAddressIfMissing)]);
}
