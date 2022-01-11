import React, { FC } from 'react';
import { render } from '@testing-library/react';

import FilterIcon from './FilterIcon';

import { makeOriginUiTheme, ThemeModeEnum } from '@energyweb/origin-ui-theme';
import { ThemeProvider } from '@mui/material/styles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

const originTheme = makeOriginUiTheme({ themeMode: ThemeModeEnum.Dark });

export const OriginThemeProvider: FC = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={originTheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

describe('FilterIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <OriginThemeProvider>
        <FilterIcon />
      </OriginThemeProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
