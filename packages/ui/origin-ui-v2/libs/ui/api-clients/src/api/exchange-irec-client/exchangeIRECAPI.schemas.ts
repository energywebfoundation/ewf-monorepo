/*
 * Generated by orval v5.0.0-alpha.9 🍺
 * Do not edit manually.
 * Exchange I-REC API
 * Swagger documentation for the Exchange I-REC API
 * OpenAPI spec version: 0.1
 */
export type Operator =
  | 'EqualsTo'
  | 'GreaterThanOrEqualsTo'
  | 'LessThanOrEqualsTo';

export const Operator = {
  EqualsTo: 'EqualsTo' as Operator,
  GreaterThanOrEqualsTo: 'GreaterThanOrEqualsTo' as Operator,
  LessThanOrEqualsTo: 'LessThanOrEqualsTo' as Operator,
};

export interface DeviceVintageDTO {
  year: number;
  operator?: Operator;
}

export interface ProductDTO {
  deviceType?: string[];
  location?: string[];
  deviceVintage?: DeviceVintageDTO;
  generationFrom?: string;
  generationTo?: string;
  gridOperator?: string[];
}

export interface CreateBidDTO {
  volume: string;
  price: number;
  validFrom: string;
  product: ProductDTO;
}

export type OrderStatus =
  | 'Active'
  | 'Cancelled'
  | 'Filled'
  | 'PartiallyFilled'
  | 'PendingCancellation'
  | 'NotExecuted';

export const OrderStatus = {
  Active: 'Active' as OrderStatus,
  Cancelled: 'Cancelled' as OrderStatus,
  Filled: 'Filled' as OrderStatus,
  PartiallyFilled: 'PartiallyFilled' as OrderStatus,
  PendingCancellation: 'PendingCancellation' as OrderStatus,
  NotExecuted: 'NotExecuted' as OrderStatus,
};

export type OrderSide = 'Bid' | 'Ask';

export const OrderSide = {
  Bid: 'Bid' as OrderSide,
  Ask: 'Ask' as OrderSide,
};

export type OrderType = 'Limit' | 'Direct';

export const OrderType = {
  Limit: 'Limit' as OrderType,
  Direct: 'Direct' as OrderType,
};

export interface OrderDTO {
  id: string;
  userId: string;
  status: OrderStatus;
  startVolume: string;
  currentVolume: string;
  side: OrderSide;
  price: number;
  type: OrderType;
  directBuyId: string;
  validFrom: string;
  assetId: string;
}

export interface CreateAskDTO {
  volume: string;
  price: number;
  validFrom: string;
  assetId: string;
}

export interface DirectBuyDTO {
  askId: string;
  volume: string;
  price: number;
}

export type Filter = 'All' | 'Specific' | 'Unspecified';

export const Filter = {
  All: 'All' as Filter,
  Specific: 'Specific' as Filter,
  Unspecified: 'Unspecified' as Filter,
};

export interface ProductFilterDTO {
  deviceType?: string[];
  location?: string[];
  deviceVintage?: DeviceVintageDTO;
  generationFrom?: string;
  generationTo?: string;
  gridOperator?: string[];
  deviceTypeFilter?: Filter;
  locationFilter?: Filter;
  deviceVintageFilter?: Filter;
  generationTimeFilter?: Filter;
  gridOperatorFilter?: Filter;
}

export interface OrderBookOrderDTO {
  id: string;
  price: number;
  volume: string;
  userId: string;
  assetId?: string;
  product: ProductDTO;
}

export interface TradePriceInfoDTO {
  created: string;
  price: number;
  assetId: string;
  product: ProductDTO;
}

export interface OrderBookDTO {
  asks: OrderBookOrderDTO[];
  bids: OrderBookOrderDTO[];
  lastTradedPrice: TradePriceInfoDTO;
}

export interface AssetDTO {
  address: string;
  tokenId: string;
  deviceId: string;
  generationFrom: string;
  generationTo: string;
  id: string;
}

export type TimeFrame =
  | 'Yearly'
  | 'Monthly'
  | 'Daily'
  | 'Weekly'
  | 'Hourly'
  | 'HalfHourly';

export const TimeFrame = {
  Yearly: 'Yearly' as TimeFrame,
  Monthly: 'Monthly' as TimeFrame,
  Daily: 'Daily' as TimeFrame,
  Weekly: 'Weekly' as TimeFrame,
  Hourly: 'Hourly' as TimeFrame,
  HalfHourly: 'HalfHourly' as TimeFrame,
};

export interface Asset {
  id: string;
  address: string;
  tokenId: string;
  deviceId: string;
  generationFrom: string;
  generationTo: string;
}

export interface Trade {
  id: string;
  created: string;
  volume: string;
  price: string;
  bid: Order;
  ask: Order;
}

export type OrderProduct = {};

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  startVolume: string;
  currentVolume: string;
  side: OrderSide;
  price: number;
  type: OrderType;
  directBuyId: string;
  validFrom: string;
  product: OrderProduct;
  asset: Asset;
  assetId: string;
  demandId: string;
  trades: Trade[];
}

export type DemandStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED';

export const DemandStatus = {
  ACTIVE: 'ACTIVE' as DemandStatus,
  PAUSED: 'PAUSED' as DemandStatus,
  ARCHIVED: 'ARCHIVED' as DemandStatus,
};

export interface DemandDTO {
  id: string;
  userId: string;
  price: number;
  start: string;
  end: string;
  volumePerPeriod: string;
  periodTimeFrame: TimeFrame;
  bids: Order[];
  status: DemandStatus;
  product: ProductDTO;
}

export interface CreateDemandDTO {
  price: number;
  volumePerPeriod: string;
  periodTimeFrame: TimeFrame;
  start: string;
  end: string;
  boundToGenerationTime: boolean;
  excludeEnd: boolean;
  product: ProductDTO;
}

export interface DemandSummaryDTO {
  bids: CreateBidDTO[];
  volume: string;
}

export interface TradeDTO {
  id: string;
  created: string;
  volume: string;
  price: number;
  bidId: string;
  askId: string;
  assetId: string;
  product: ProductDTO;
}
