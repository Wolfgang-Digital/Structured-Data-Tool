import React, { Suspense } from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset, Grid, Box } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import routes from 'routes';
import { defaultTheme } from './styles/theme';
import BusyIndicator from './components/BusyIndicator';
import Sidebar from './components/Sidebar';
import { RenderRoutes } from './components/Routes';
import ThemeSwapper from './components/ThemeSwapper';

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <ColorModeProvider>
            <CSSReset />
            <ThemeSwapper />
            <Grid templateColumns="220px 1fr" templateAreas='"sidebar main"'>
              <Sidebar />
              <Box as="main" gridArea="main" paddingBottom={12}>
                <Suspense fallback={<BusyIndicator isBusy color="#38B2AC" />}>
                  <RenderRoutes routes={routes} />
                </Suspense>
              </Box>
            </Grid>
          </ColorModeProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

export default App;
