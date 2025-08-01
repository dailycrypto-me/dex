import { ChainId } from '@uniswap/sdk';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.LUMIO]: '0xb9adF241A9F58D06F71F2fff686beFa4d4985E86',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [ChainId.DAILY]: '0x2E631e360e4d0f1EfD842BAe8314f192EB756f1C',
  [ChainId.TDAILY]: '0x669967B122Ce253DB4705514b80029D5bD68AF6a',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
