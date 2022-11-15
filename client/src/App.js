import { Alert, createTheme, Snackbar, ThemeProvider } from '@mui/material';
import { createContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useItemsState } from './hooks/items.state';
import { CreateItemPage } from './pages/CreateItemPage';
import { ItemsOverviewPage } from './pages/ItemsOverviewPage';

export const ItemsContext = createContext({
  items: [],
  addItem: () => null,
  deleteItem: () => null,
  setItems: () => null,
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <ItemsOverviewPage />,
  },
  {
    path: '/create',
    element: <CreateItemPage />,
  }
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#7F4EE7',
    },
  },
});

export const App = () => {
  const state = useItemsState();
  
  return (
    <ThemeProvider theme={theme}>
      <ItemsContext.Provider value={state}>
        <RouterProvider router={router} />
        <Snackbar
          autoHideDuration={6000}
          open={!!state.error}
          onClose={state.hideError}
        >
          <Alert
            severity="error"
            onClose={state.hideError}
          >
            {state.error}
          </Alert>
        </Snackbar>
      </ItemsContext.Provider>
    </ThemeProvider>
  );
}
