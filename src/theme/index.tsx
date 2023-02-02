import React from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import GlobalStyles from './globalStyles';

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  // const themeOptions = useMemo(
  //   () => ({
  //     palette,
  //     shape: { borderRadius: 6 },
  //     typography,
  //     shadows: shadows(),
  //     customShadows: customShadows(),
  //   }),
  //   []
  // );

  // const theme = createTheme(themeOptions as unknown as ThemeOptions);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  // theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={darkTheme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
