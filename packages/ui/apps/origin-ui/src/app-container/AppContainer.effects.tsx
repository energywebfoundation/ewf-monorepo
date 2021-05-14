import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { getOrganizationMenu } from '@energyweb/origin-ui-organization-logic';
import { getDeviceMenu } from '@energyweb/origin-ui-device-logic';
import { getAccountMenu } from '@energyweb/origin-ui-user-logic';
import { getAdminMenu } from '@energyweb/origin-ui-user-logic';

import { useAuthIsAuthenticated } from '@energy-web/origin-ui-api-clients';
import { useAccount } from '@energyweb/origin-ui-user-view';

export const useAppContainerEffects = () => {
  const { t } = useTranslation();
  const isAuthenticated = useAuthIsAuthenticated();
  const accountData = useAccount();
  const orgMenu = getOrganizationMenu({
    t,
    showRegisterOrg: true,
    showMyOrg: true,
    showMembers: true,
    showInvitations: true,
    showInvite: true,
    showAllOrgs: true,
    showRegisterIRec: true,
  });
  const deviceMenu = getDeviceMenu({
    t,
    showAllDevices: true,
    showMapView: true,
    showMyDevices: true,
    showPendingDevices: true,
    showRegisterDevice: true,
    showDeviceImport: true,
  });

  const accountMenu = getAccountMenu({
    t,
    isLoggedIn: isAuthenticated,
    onCloseMobileNav: () => ({}),
  });
  const adminMenu = getAdminMenu({ t, onCloseMobileNav: () => {} });
  const navigate = useNavigate();

  const menuSections = [orgMenu, deviceMenu, accountMenu, adminMenu];

  return {
    navigate: (url: string) => {
      console.log(`navigate => (${url})`);
      navigate(url);
    },
    isAuthenticated,
    menuSections,
    accountData,
  };
};