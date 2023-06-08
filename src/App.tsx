import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { FLUID_ROUTE, HOME_ROUTE, MAP_ROUTE } from './core-utils/routes';
import ErrorBoundary from './wrappers/ErrorBoundary';
import ThemeWrapper from './wrappers/ThemeWrapper';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactQuery from './reactQuery';
import Fluid from './fluid';
import FluidMap from './Grid/Fluid';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const idleTimer = React.useRef<any>(null);
  return (
    <React.StrictMode>
      <CssBaseline>
        <ThemeWrapper>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <>
                <BrowserRouter>
                  <React.Suspense fallback={<div />}>
                    <Routes>
                      <Route
                        path={HOME_ROUTE}
                        element={
                          <div>
                            {' '}
                            <ReactQuery />{' '}
                          </div>
                        }
                      />
                      <Route path={FLUID_ROUTE} element={<Fluid />} />
                      <Route path={MAP_ROUTE} element={<FluidMap />} />
                    </Routes>
                  </React.Suspense>
                </BrowserRouter>
              </>
            </ErrorBoundary>
          </QueryClientProvider>
        </ThemeWrapper>
      </CssBaseline>
    </React.StrictMode>
  );
};

export default App;
