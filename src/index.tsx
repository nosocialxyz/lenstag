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
import { WagmiConfig } from 'wagmi';
import { LensProvider } from '@lens-protocol/react';
import { lensConfig } from './lib/LensConfig';
import { client } from './lib/wagmiClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log('lensConfig::', lensConfig)

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <React.StrictMode>
        <WagmiConfig client={client}>
          <LensProvider config={lensConfig}>
            <Web3ReactProvider getLibrary={(provider) => { new Web3(provider) }}>
              <MetaMaskProvider>
                <App />
              </MetaMaskProvider>
            </Web3ReactProvider>
          </LensProvider>
        </WagmiConfig>
      </React.StrictMode>
    </BrowserRouter>
  </HelmetProvider>
);

reportWebVitals();

// If you want to enable client cache, register instead.
serviceWorker.unregister();
