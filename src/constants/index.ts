import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import {
  // fortmatic,
  injected,
  // portis,
  walletconnect,
  walletlink,
} from '../connectors';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const FACTORY_ADDRESS = '0xE2f8eed6B03C55F78958BfFA533d03E7CE96D2C0';
export const ROUTER_ADDRESS = '0xa303f356F0E91ca0465a9AF8CCe061b2426cC3c0';

export const LP_TOKEN_NAME = 'Daily V2';
export const LP_TOKEN_SYMBOL = 'DLY-V2';

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export const DAI = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
);
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C');
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound');
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker');
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth');
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC');

export const LUMIO_USDC = new Token(9990, '0x8ac3404A85bd98F578e006F3fD56c82398d6216F', 18, 'USDC', 'USD//C');
export const LUMIO_USDT = new Token(9990, '0xB09C234Bac6185D54085a5C39782c97f98c8E06b', 18, 'USDT', 'Tether USD');

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13;
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320;
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS;
export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC';

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [TIMELOCK_ADDRESS]: 'Timelock',
};

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.LUMIO]: [WETH[ChainId.LUMIO]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.DAILY]: [WETH[ChainId.DAILY]],
  [ChainId.TDAILY]: [WETH[ChainId.TDAILY]],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR, WBTC],
  [ChainId.LUMIO]: [...WETH_ONLY[ChainId.LUMIO], LUMIO_USDC, LUMIO_USDT],
  [ChainId.DAILY]: [...WETH_ONLY[ChainId.DAILY]],
  [ChainId.TDAILY]: [...WETH_ONLY[ChainId.TDAILY]]
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]],
  },
};

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.LUMIO]: [...WETH_ONLY[ChainId.LUMIO], LUMIO_USDC, LUMIO_USDT],
  [ChainId.DAILY]: [...WETH_ONLY[ChainId.DAILY]],
  [ChainId.TDAILY]: [...WETH_ONLY[ChainId.TDAILY]]
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.ROPSTEN]: [...WETH_ONLY[ChainId.ROPSTEN]],
  [ChainId.LUMIO]: [...WETH_ONLY[ChainId.LUMIO], LUMIO_USDC, LUMIO_USDT],
  [ChainId.GÖRLI]: [...WETH_ONLY[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [...WETH_ONLY[ChainId.KOVAN]],
  [ChainId.DAILY]: [...WETH_ONLY[ChainId.DAILY]],
  [ChainId.TDAILY]: [...WETH_ONLY[ChainId.TDAILY]]
};

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
    ],
    [USDC, USDT],
    [DAI, USDT],
  ],
};

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: 'Fortmatic',
  //   iconName: 'fortmaticIcon.png',
  //   description: 'Login using Fortmatic hosted wallet',
  //   href: null,
  //   color: '#6748FF',
  //   mobile: true,
  // },
  // Portis: {
  //   connector: portis,
  //   name: 'Portis',
  //   iconName: 'portisIcon.png',
  //   description: 'Login using Portis hosted wallet',
  //   href: null,
  //   color: '#4A6C9B',
  //   mobile: true,
  // },
};

export const NetworkContextName = 'NETWORK';
// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7);
export const BIG_INT_ZERO = JSBI.BigInt(0);
// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%
// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));
export const ZERO_PERCENT = new Percent('0');
export const ONE_HUNDRED_PERCENT = new Percent('1');
