const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID ?? '';

const mainnet = {
  chainId: process.env.REACT_APP_CHAIN_ID ? Number(process.env.REACT_APP_CHAIN_ID) : 1,
  name: 'Daily',
  currency: 'DLY',
  explorerUrl: process.env.REACT_APP_EXPLORER_URL!,
  rpcUrl: process.env.REACT_APP_NETWORK_URL!,
};

const metadata = {
  name: 'Daily',
  description: 'Daily DEX',
  url: 'https://dex.dailycrypto.net/',
  icons: [''],
};

export {
    projectId,
    mainnet,
    metadata
}