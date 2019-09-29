import {
    PaginatedLoaderFiltered,
    IPaginatedLoaderFilteredState,
    IPaginatedLoaderFilteredProps,
    getInitialPaginatedLoaderFilteredState,
    RECORD_INDICATOR
} from '../components/Table/PaginatedLoaderFiltered';
import { IPaginatedLoaderFetchDataReturnValues } from '../components/Table/PaginatedLoader';
import { CustomFilterInputType, ICustomFilter } from '../components/Table/FiltersHeader';

describe('PaginatedLoaderFiltered', () => {
    describe('checkRecordPassesFilters()', () => {
        it('works', () => {
            class TestClass extends PaginatedLoaderFiltered<
                IPaginatedLoaderFilteredProps,
                IPaginatedLoaderFilteredState
            > {
                constructor(props: any) {
                    super(props);

                    this.state = getInitialPaginatedLoaderFilteredState();
                }

                getPaginatedData(): Promise<IPaginatedLoaderFetchDataReturnValues> {
                    throw new Error('Method not implemented.');
                }
            }

            const paginationFilteredLoader = new TestClass({});

            const record = {
                assetType: 'Solar;Photovoltaic;Roof mounted',
                owner: 'A'
            };

            const filters: ICustomFilter[] = [
                {
                    property: `${RECORD_INDICATOR}assetType`,
                    label: 'Asset Type',
                    input: {
                        type: CustomFilterInputType.assetType,
                        defaultOptions: []
                    },
                    selectedValue: null
                },
                {
                    property: `${RECORD_INDICATOR}owner`,
                    label: 'Owner',
                    input: {
                        type: CustomFilterInputType.string
                    },
                    selectedValue: null
                }
            ];

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(true);

            filters[1].selectedValue = 'B';

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(false);

            filters[1].selectedValue = 'A';

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(true);

            filters[0].selectedValue = ['Wind'];

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(false);

            filters[0].selectedValue = ['Solar'];

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(true);

            filters[0].selectedValue = ['Solar;Photovoltaic'];

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(true);

            filters[0].selectedValue = ['Solar;Photovoltaic;Ground mounted'];

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(false);

            filters[0].selectedValue = ['Solar;Photovoltaic;Roof mounted'];

            expect(paginationFilteredLoader.checkRecordPassesFilters(record, filters)).toBe(true);
        });
    });
});
