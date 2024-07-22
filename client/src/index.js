import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/stockStore';
import { saveState } from './localStorage';

store.subscribe(() => {
  saveState({
    code: store.getState().stock.code || 'BTC',
    stockDetails: store.getState().stock.stockDetails || [],
    topStocksDetails: store.getState().stock.topStocksDetails || []
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
