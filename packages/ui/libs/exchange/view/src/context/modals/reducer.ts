import { IExchangeModalsStore, TExchangeModalsAction } from './types';

export enum ExchangeModalsActionsEnum {
  SHOW_UPDATE_SUPPLY = 'SHOW_UPDATE_SUPPLY',
  SHOW_REMOVE_SUPPLY = 'SHOW_REMOVE_SUPPLY',
  SHOW_BUNDLE_DETAILS = 'SHOW_BUNDLE_DETAILS',
  SHOW_BUY_DIRECT = 'SHOW_BUY_DIRECT',
}

export const exchangeModalsInitialState: IExchangeModalsStore = {
  removeSupply: {
    open: false,
    supplyId: null,
  },
  updateSupply: {
    open: false,
    deviceWithSupply: null,
  },
  bundleDetails: {
    open: false,
    bundle: null,
    isOwner: false,
  },
  buyDirect: {
    open: false,
    ask: null,
  },
};

export const exchangeModalsReducer = (
  state = exchangeModalsInitialState,
  action: TExchangeModalsAction
): IExchangeModalsStore => {
  switch (action.type) {
    case ExchangeModalsActionsEnum.SHOW_UPDATE_SUPPLY:
      return { ...state, updateSupply: action.payload };
    case ExchangeModalsActionsEnum.SHOW_REMOVE_SUPPLY:
      return { ...state, removeSupply: action.payload };
    case ExchangeModalsActionsEnum.SHOW_BUNDLE_DETAILS:
      return { ...state, bundleDetails: action.payload };
    case ExchangeModalsActionsEnum.SHOW_BUY_DIRECT:
      return { ...state, buyDirect: action.payload };
  }
};