import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// scroll bar
import 'simplebar/dist/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// apex-chart
import 'assets/third-party/apex-chart.css';
import 'assets/third-party/react-table.css';

// project import
import App from './App';
import { store, persister } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </PersistGate>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
