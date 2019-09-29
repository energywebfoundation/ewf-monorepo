import * as React from 'react';
import { mount } from 'enzyme';
import { ProducingAssetTable } from '../components/ProducingAssetTable';
import { dataTestSelector } from '../utils/Helper';
import { setupStore, WrapperComponent, createRenderedHelpers } from './utils/helpers';

jest.mock('@energyweb/user-registry', () => {
    return {
        User: {
            Entity: class Entity {
                id: string;

                constructor(id: string) {
                    this.id = id;
                }

                sync() {
                    return {
                        id: this.id,
                        organization: 'Example Organization'
                    };
                }
            }
        }
    };
});

describe('ProducingAssetTable', () => {
    afterAll(() => {
        jest.unmock('@energyweb/user-registry');
    });

    it('correctly renders and search works', async () => {
        const { store, history, addProducingAsset } = setupStore();

        addProducingAsset({
            id: '0'
        });

        addProducingAsset({
            id: '1',
            facilityName: 'Biomass Energy Facility',
            assetType: 'Gaseous;Agricultural gas',
            address: 'Amsterdam',
            country: 'Netherlands',
            capacityWh: 736123,
            lastSmartMeterReadWh: 312
        });

        const rendered = mount(
            <WrapperComponent store={store} history={history}>
                <ProducingAssetTable />
            </WrapperComponent>
        );

        const { refresh, assertPagination, assertMainTableContent } = createRenderedHelpers(
            rendered
        );

        await refresh();

        assertMainTableContent([
            'Example Organization',
            'Wuthering Heights facility',
            '95 Moo 7, Sa Si Mum Sub-district, Kamphaeng Saen District, Nakhon Province 73140, Thailand',
            'Solar - Photovoltaic - Roof mounted',
            '9,876.543',
            '7.777',
            // next asset
            'Example Organization',
            'Biomass Energy Facility',
            'Amsterdam, Netherlands',
            'Gaseous - Agricultural gas',
            '736.123',
            '0.312'
        ]);

        assertPagination(1, 2, 2);

        const searchInput = rendered.find(`${dataTestSelector('Search-textfield')} input`);

        searchInput.simulate('change', { target: { value: 'Biomass' } });

        await refresh();

        assertMainTableContent([
            'Example Organization',
            'Biomass Energy Facility',
            'Amsterdam, Netherlands',
            'Gaseous - Agricultural gas',
            '736.123',
            '0.312'
        ]);

        assertPagination(1, 1, 1);

        searchInput.simulate('change', { target: { value: 'Wuthering Heights' } });

        await refresh();

        assertMainTableContent([
            'Example Organization',
            'Wuthering Heights facility',
            '95 Moo 7, Sa Si Mum Sub-district, Kamphaeng Saen District, Nakhon Province 73140, Thailand',
            'Solar - Photovoltaic - Roof mounted',
            '9,876.543',
            '7.777'
        ]);

        assertPagination(1, 1, 1);
    });
});
