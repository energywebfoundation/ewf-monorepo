import { Bundle } from '../../utils/exchange';
import { IBundleAction, BundlesActionType } from './actions';

export interface IBundlesState {
    bundles: Bundle[];
}

const initialState: IBundlesState = {
    bundles: []
};

export default function reducer(
    state: IBundlesState = initialState,
    { payload, type }: IBundleAction
): IBundlesState {
    switch (type) {
        case BundlesActionType.STORE:
            const bundles = [...state.bundles.filter((b) => b.id === payload.id)];
            bundles.push(payload);
            return {
                ...state,
                bundles
            };
        default:
            return state;
    }
}
