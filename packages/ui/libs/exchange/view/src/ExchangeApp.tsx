import { PageNotFound } from '@energyweb/origin-ui-core';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ViewMarketPage } from './pages';

export const ExchangeApp: FC = () => {
  return (
    <Routes>
      <Route path="view-market" element={<ViewMarketPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};