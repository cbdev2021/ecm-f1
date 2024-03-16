// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
import './global.css';
import { Provider } from 'react-redux';
import store from './store.js';

const muiTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);



// import React from 'react';
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx';
// import './global.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
