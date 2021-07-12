import {
  useCachedExchangeCertificates,
  useCachedAllFuelTypes,
  useCachedAllDevices,
  useCachedUser,
  useWithdrawCertificateHandler,
} from '@energyweb/origin-ui-certificate-data';
import { useWithdrawActionLogic } from '@energyweb/origin-ui-certificate-logic';

export const useWithdrawActionEffects = <Id>(
  selectedIds: Id[],
  resetIds: () => void
) => {
  const exchangeCertificates = useCachedExchangeCertificates();
  const allDevices = useCachedAllDevices();
  const allFuelTypes = useCachedAllFuelTypes();
  const user = useCachedUser();

  const withdrawalAddress = user?.organization?.blockchainAccountAddress;

  const withdrawHandler = useWithdrawCertificateHandler(
    withdrawalAddress,
    exchangeCertificates,
    resetIds
  );

  const actionLogic = useWithdrawActionLogic({
    selectedIds,
    exchangeCertificates,
    allDevices,
    allFuelTypes,
  });

  return { ...actionLogic, withdrawHandler };
};
