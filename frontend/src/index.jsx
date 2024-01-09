import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootswatch/dist/materia/bootstrap.min.css';
/* eslint-disable import/no-unresolved */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store/index';
import App from './App';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
);
