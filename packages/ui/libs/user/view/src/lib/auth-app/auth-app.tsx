import React, { FC, useCallback } from 'react';

import { Route, Routes, useNavigate } from 'react-router';
import LoginPage from '../pages/login-page/LoginPage';
import SignInPage from '../pages/sign-in-page/SignInPage';
import LogoutPage from '../pages/logout-page/LogoutPage';

/* eslint-disable-next-line */
export interface AuthAppProps {
  paths?: {
    register: string;
    login: string;
    resetPassword: string;
    logout: string;
  };
}

export const AuthApp: FC<AuthAppProps> = ({ paths }) => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Routes>
        <Route
          path={paths.login}
          element={
            <LoginPage
              handleNavigateToResetPasswordPage={useCallback(
                () => navigate(paths.resetPassword),
                []
              )}
              handleNavigateToRegisterUserPage={useCallback(
                () => navigate(paths.register),
                []
              )}
            />
          }
        />
        <Route
          path={paths.register}
          element={<SignInPage handleSuccess={useCallback(() => {}, [])} />}
        />
        <Route
          path={paths.logout}
          element={<LogoutPage handleSuccess={useCallback(() => {}, [])} />}
        />
      </Routes>
    </Routes>
  );
};

AuthApp.defaultProps = {
  paths: {
    login: 'login',
    register: 'register',
    resetPassword: 'reset-password',
    logout: 'logout',
  },
};

export default AuthApp;