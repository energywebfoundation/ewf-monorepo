/*
 * Generated by orval v5.0.0-alpha.9 🍺
 * Do not edit manually.
 * Exchange API
 * Swagger documentation for the Exchange API
 * OpenAPI spec version: 0.1
 */
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from 'react-query';
import type {
  BundlePublicDTO,
  Bundle,
  CreateBundleDTO,
  BundleTrade,
  BuyBundleDTO,
  BundleSplitDTO,
} from './exchangeAPI.schemas';
import { customMutator } from '../mutator/custom-mutator';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export const bundleControllerGetAvailableBundles = <Data = unknown>() => {
  return customMutator<Data extends unknown ? BundlePublicDTO[] : Data>({
    url: `/api/bundle/available`,
    method: 'get',
  });
};

export const getBundleControllerGetAvailableBundlesQueryKey = () => [
  `/api/bundle/available`,
];

export const useBundleControllerGetAvailableBundles = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  queryConfig?: UseQueryOptions<
    AsyncReturnType<typeof bundleControllerGetAvailableBundles>,
    Error
  >
) => {
  const queryKey = getBundleControllerGetAvailableBundlesQueryKey();

  const query = useQuery<
    AsyncReturnType<typeof bundleControllerGetAvailableBundles>,
    Error
  >(queryKey, () => bundleControllerGetAvailableBundles<Data>(), queryConfig);

  return {
    queryKey,
    ...query,
  };
};

export const bundleControllerGetMyBundles = <Data = unknown>() => {
  return customMutator<Data extends unknown ? Bundle[] : Data>({
    url: `/api/bundle`,
    method: 'get',
  });
};

export const getBundleControllerGetMyBundlesQueryKey = () => [`/api/bundle`];

export const useBundleControllerGetMyBundles = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  queryConfig?: UseQueryOptions<
    AsyncReturnType<typeof bundleControllerGetMyBundles>,
    Error
  >
) => {
  const queryKey = getBundleControllerGetMyBundlesQueryKey();

  const query = useQuery<
    AsyncReturnType<typeof bundleControllerGetMyBundles>,
    Error
  >(queryKey, () => bundleControllerGetMyBundles<Data>(), queryConfig);

  return {
    queryKey,
    ...query,
  };
};

export const bundleControllerCreateBundle = <Data = unknown>(
  createBundleDTO: CreateBundleDTO
) => {
  return customMutator<Data extends unknown ? Bundle : Data>({
    url: `/api/bundle`,
    method: 'post',
    data: createBundleDTO,
  });
};

export const useBundleControllerCreateBundle = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  mutationConfig?: UseMutationOptions<
    AsyncReturnType<typeof bundleControllerCreateBundle>,
    Error,
    { data: CreateBundleDTO }
  >
) => {
  return useMutation<
    AsyncReturnType<typeof bundleControllerCreateBundle>,
    Error,
    { data: CreateBundleDTO }
  >((props) => {
    const { data } = props || {};

    return bundleControllerCreateBundle<Data>(data);
  }, mutationConfig);
};
export const bundleControllerGetMyTrades = <Data = unknown>() => {
  return customMutator<Data extends unknown ? BundleTrade[] : Data>({
    url: `/api/bundle/trade`,
    method: 'get',
  });
};

export const getBundleControllerGetMyTradesQueryKey = () => [
  `/api/bundle/trade`,
];

export const useBundleControllerGetMyTrades = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  queryConfig?: UseQueryOptions<
    AsyncReturnType<typeof bundleControllerGetMyTrades>,
    Error
  >
) => {
  const queryKey = getBundleControllerGetMyTradesQueryKey();

  const query = useQuery<
    AsyncReturnType<typeof bundleControllerGetMyTrades>,
    Error
  >(queryKey, () => bundleControllerGetMyTrades<Data>(), queryConfig);

  return {
    queryKey,
    ...query,
  };
};

export const bundleControllerBuyBundle = <Data = unknown>(
  buyBundleDTO: BuyBundleDTO
) => {
  return customMutator<Data extends unknown ? BundleTrade : Data>({
    url: `/api/bundle/buy`,
    method: 'put',
    data: buyBundleDTO,
  });
};

export const useBundleControllerBuyBundle = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  mutationConfig?: UseMutationOptions<
    AsyncReturnType<typeof bundleControllerBuyBundle>,
    Error,
    { data: BuyBundleDTO }
  >
) => {
  return useMutation<
    AsyncReturnType<typeof bundleControllerBuyBundle>,
    Error,
    { data: BuyBundleDTO }
  >((props) => {
    const { data } = props || {};

    return bundleControllerBuyBundle<Data>(data);
  }, mutationConfig);
};
export const bundleControllerCancelBundle = <Data = unknown>(id: string) => {
  return customMutator<Data extends unknown ? Bundle : Data>({
    url: `/api/bundle/${id}/cancel`,
    method: 'put',
    data: undefined,
  });
};

export const useBundleControllerCancelBundle = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  mutationConfig?: UseMutationOptions<
    AsyncReturnType<typeof bundleControllerCancelBundle>,
    Error,
    { id: string }
  >
) => {
  return useMutation<
    AsyncReturnType<typeof bundleControllerCancelBundle>,
    Error,
    { id: string }
  >((props) => {
    const { id } = props || {};

    return bundleControllerCancelBundle<Data>(id);
  }, mutationConfig);
};
export const bundleControllerAvailableBundleSplits = <Data = unknown>(
  id: string
) => {
  return customMutator<Data extends unknown ? BundleSplitDTO : Data>({
    url: `/api/bundle/${id}/splits`,
    method: 'get',
  });
};

export const getBundleControllerAvailableBundleSplitsQueryKey = (
  id: string
) => [`/api/bundle/${id}/splits`];

export const useBundleControllerAvailableBundleSplits = <
  Data extends unknown = unknown,
  Error extends unknown = unknown
>(
  id: string,
  queryConfig?: UseQueryOptions<
    AsyncReturnType<typeof bundleControllerAvailableBundleSplits>,
    Error
  >
) => {
  const queryKey = getBundleControllerAvailableBundleSplitsQueryKey(id);

  const query = useQuery<
    AsyncReturnType<typeof bundleControllerAvailableBundleSplits>,
    Error
  >(queryKey, () => bundleControllerAvailableBundleSplits<Data>(id), {
    enabled: !!id,
    ...queryConfig,
  });

  return {
    queryKey,
    ...query,
  };
};
