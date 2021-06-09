import { getRolesFromRights } from '@energyweb/origin-backend-core';
import { User } from '@energyweb/origin-backend-react-query-client';
import {
  TableActionData,
  TableComponentProps,
  TableRowData,
} from '@energyweb/origin-ui-core';
import { TFunction, useTranslation } from 'react-i18next';
import { roleNamesMatcherForMembersPage } from '../utils';

type TCreateMembersTableArgs = {
  users: User[];
  actions: TableActionData<User['id']>[];
  loading: boolean;
};

type TFormatOrgMembers = (
  props: Omit<TCreateMembersTableArgs, 'loading'> & {
    t: TFunction<'translation'>;
  }
) => TableRowData<User['id']>[];

export const formatOrgMembers: TFormatOrgMembers = ({ t, users, actions }) => {
  return users?.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: getRolesFromRights(user.rights)?.map((role) =>
      t(
        roleNamesMatcherForMembersPage.filter(
          (roleName) => roleName.value === role
        )[0].label
      )
    ),
    actions,
  }));
};

export const useMembersTableLogic = ({
  users,
  actions,
  loading,
}: TCreateMembersTableArgs): TableComponentProps<User['id']> => {
  const { t } = useTranslation();
  return {
    header: {
      firstName: t('organization.members.firstName'),
      lastName: t('organization.members.lastName'),
      email: t('organization.members.email'),
      role: t('organization.members.role'),
      actions: '',
    },
    loading: loading,
    data: formatOrgMembers({ t, users, actions }) ?? [],
  };
};