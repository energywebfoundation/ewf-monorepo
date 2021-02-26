import { InboxPanel } from './InboxPanel';
import {
    CertificateSource,
    requestPublishForSale,
    requestWithdrawCertificate
} from '../../features/certificates';
import React, { useState } from 'react';
import { TabContent } from './Inbox/InboxTabContent';
import { SelectedInboxList } from './Inbox/SelectedInboxList';
import { EnergyFormatter } from '../../utils';
import TextField from '@material-ui/core/TextField';
import { IInboxCertificateData } from './Inbox/InboxItem';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUserOffchain } from '../../features/users';
import { makeStyles } from '@material-ui/styles';
import { useOriginConfiguration } from '../../utils/configuration';

export function ExchangeInboxPage(): JSX.Element {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const user = useSelector(getUserOffchain);
    const [price, setPrice] = useState(0);

    async function publishForSale(certs: IInboxCertificateData[], callback: () => void) {
        certs.forEach((certificate) => {
            dispatch(
                requestPublishForSale({
                    certificateId: certificate.id,
                    amount: certificate.energy,
                    price: Math.round((price + Number.EPSILON) * 100),
                    callback: () => {
                        callback();
                    },
                    source: certificate.source,
                    assetId: certificate.assetId
                })
            );
        });
    }

    async function withdraw(certs: IInboxCertificateData[], callback: () => void) {
        const address = user.blockchainAccountAddress;

        certs.forEach((certificate) => {
            const assetId = certificate.assetId;
            const amount = certificate.energy.toString();
            dispatch(
                requestWithdrawCertificate({
                    assetId,
                    address,
                    amount,
                    callback: () => {
                        callback();
                    }
                })
            );
        });
    }

    const configuration = useOriginConfiguration();

    const { SIMPLE_TEXT_COLOR } = configuration?.styleConfig;

    const useStyles = makeStyles({
        text_1: {
            fontSize: '16px',
            color: SIMPLE_TEXT_COLOR
        },

        text_2: {
            fontSize: '14px',
            color: SIMPLE_TEXT_COLOR,
            opacity: '.5'
        }
    });

    const classes = useStyles();

    return (
        <InboxPanel
            mode={CertificateSource.Exchange}
            title={'certificate.info.exchangeInbox'}
            tabs={['Sell', 'Withdraw']}
        >
            {({
                tabIndex,
                selectedCerts,
                getSelectedItems,
                setEnergy,
                getSelectedCertificates,
                updateView,
                totalVolume
            }) => {
                return (
                    <>
                        {tabIndex === 0 && (
                            <TabContent
                                header="certificate.info.selectedForSale"
                                buttonLabel="certificate.actions.sellNCertificates"
                                onSubmit={() =>
                                    publishForSale(getSelectedCertificates(), updateView)
                                }
                                selectedCerts={selectedCerts}
                            >
                                <SelectedInboxList
                                    pairs={getSelectedItems()}
                                    setEnergy={setEnergy}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className={classes.text_2}>
                                        {t('certificate.info.totalVolume')}:{' '}
                                    </div>
                                    <div className={classes.text_1} style={{ fontSize: 16 }}>
                                        {EnergyFormatter.format(totalVolume, true)}
                                    </div>
                                </div>
                                <TextField
                                    style={{ margin: '24px 0' }}
                                    type="number"
                                    value={price}
                                    onChange={(ev) => {
                                        const newValue = parseFloat(ev.target.value);
                                        if (!isNaN(newValue)) setPrice(newValue);
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className={classes.text_2}>
                                        {t('certificate.info.totalPrice')}:{' '}
                                    </div>
                                    <div className={classes.text_1} style={{ fontSize: 16 }}>
                                        ${EnergyFormatter.format(totalVolume.mul(price))}
                                    </div>
                                </div>
                            </TabContent>
                        )}
                        {tabIndex === 1 && (
                            <TabContent
                                header="certificate.info.selectedForWithdraw"
                                buttonLabel="certificate.actions.withdrawNCertificates"
                                onSubmit={() => withdraw(getSelectedCertificates(), updateView)}
                                selectedCerts={selectedCerts}
                            >
                                <SelectedInboxList
                                    pairs={getSelectedItems()}
                                    setEnergy={setEnergy}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className={classes.text_2}>
                                        {t('certificate.info.totalVolume')}:{' '}
                                    </div>
                                    <div className={classes.text_1} style={{ fontSize: 16 }}>
                                        {EnergyFormatter.format(totalVolume, true)}
                                    </div>
                                </div>
                            </TabContent>
                        )}
                    </>
                );
            }}
        </InboxPanel>
    );
}
