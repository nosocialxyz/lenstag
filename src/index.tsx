import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Web3 from 'web3';
import { MetaMaskProvider } from './components/wallets/metamask';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Web3ReactProvider getLibrary={(provider, connector) => { new Web3(provider) }}>
          <MetaMaskProvider>
            <App />
          </MetaMaskProvider>
        </Web3ReactProvider>
      </React.StrictMode>
    </BrowserRouter>
  </HelmetProvider>
);

reportWebVitals();

// If you want to enable client cache, register instead.
serviceWorker.unregister();
