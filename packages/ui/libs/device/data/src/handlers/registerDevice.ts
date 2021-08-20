import { useQueryClient } from 'react-query';
import {
  getUserControllerMeQueryKey,
  UserDTO,
} from '@energyweb/origin-backend-react-query-client';
import { useDeviceRegistryControllerCreateDevice as useOriginCreateDevice } from '@energyweb/origin-device-registry-api-react-query-client';
import { useDeviceControllerCreateDevice as useIRecCreateDevice } from '@energyweb/origin-device-registry-irec-local-api-react-query-client';
import {
  NotificationTypeEnum,
  showNotification,
} from '@energyweb/origin-ui-core';
import { TRegisterDeviceFormValues } from '../types';
import { decomposeForIRec, decomposeForOrigin } from '../utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useApiRegisterDevice = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isLoading: isOriginMutating } = useOriginCreateDevice();
  const { mutateAsync, isLoading: isIRecMutating } = useIRecCreateDevice();
  const userQueryKey = getUserControllerMeQueryKey();
  const queryClient = useQueryClient();
  const user: UserDTO = queryClient.getQueryData(userQueryKey);
  const isMutating = isIRecMutating || isOriginMutating;

  const submitHandler = (values: TRegisterDeviceFormValues) => {
    const iRecCreateData = decomposeForIRec(values, user.organization);
    const originCreateData = decomposeForOrigin(values);

    mutateAsync({ data: iRecCreateData }).then((createdIRecDevice) => {
      mutate(
        {
          data: {
            ...originCreateData,
            externalRegistryId: createdIRecDevice.id,
          },
        },
        {
          onSuccess: () => {
            showNotification(
              t('device.register.notifications.registerSuccess'),
              NotificationTypeEnum.Success
            );
            navigate('/device/my');
          },
          onError: (error: any) => {
            showNotification(
              `${t('device.register.notifications.registerError')}:
              ${error?.response?.data?.message || ''}
              `,
              NotificationTypeEnum.Error
            );
          },
        }
      );
    });
  };

  return { submitHandler, isMutating };
};
