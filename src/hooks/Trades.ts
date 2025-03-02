import { isTradeBetter } from 'utils/trades'
import { Currency, CurrencyAmount, Pair, Token, Trade } from 'sdk'
import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'
import { useBaseCurrency } from 'hooks/useCurrency'
import { useWrappedToken } from 'hooks/useToken'
import { useAppState } from 'state/application/hooks'

import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { wrappedCurrency } from 'utils/wrappedCurrency'

import { useActiveWeb3React } from './index'
import { useUserSingleHopOnly } from 'state/user/hooks'

function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency): Pair[] {
  const { chainId } = useActiveWeb3React()
  const baseCurrency = useBaseCurrency()
  const wrappedToken = useWrappedToken()

  const bases: Token[] = chainId && wrappedToken ? [wrappedToken] : []

  const [tokenA, tokenB] = chainId
    ? [
        wrappedCurrency(currencyA, chainId, wrappedToken, baseCurrency),
        wrappedCurrency(currencyB, chainId, wrappedToken, baseCurrency),
      ]
    : [undefined, undefined]

  const basePairs: [Token, Token][] = useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])).filter(
        ([t0, t1]) => t0.address !== t1.address
      ),
    [bases]
  )

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
        : [],
    [tokenA, tokenB, bases, basePairs]
  )

  const allPairs = usePairs(allPairCombinations)

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
            return memo
          }, {})
      ),
    [allPairs]
  )
}

const MAX_HOPS = 3

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut)
  const baseCurrency = useBaseCurrency()
  const wrappedToken = useWrappedToken()
  const { factory, pairHash, totalFee } = useAppState()
  const [singleHopOnly] = useUserSingleHopOnly()

  return useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return (
          Trade.bestTradeExactIn({
            pairs: allowedPairs,
            currencyAmountIn,
            currencyOut,
            //@ts-ignore
            baseCurrency,
            //@ts-ignore
            wrappedToken,
            factory,
            pairHash,
            //@ts-ignore
            totalFee,
            options: { maxHops: 1, maxNumResults: 1 },
          })[0] ?? null
        )
      }

      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | null = null

      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade: Trade | null =
          Trade.bestTradeExactIn({
            pairs: allowedPairs,
            currencyAmountIn,
            currencyOut,
            //@ts-ignore
            baseCurrency,
            //@ts-ignore
            wrappedToken,
            factory,
            pairHash,
            //@ts-ignore
            totalFee,
            options: { maxHops: i, maxNumResults: 1 },
          })[0] ?? null

        // if current trade is best yet, save it
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade
        }
      }
      return bestTradeSoFar
    }

    return null
  }, [
    allowedPairs,
    factory,
    pairHash,
    currencyAmountIn,
    currencyOut,
    singleHopOnly,
    wrappedToken,
    baseCurrency,
    totalFee,
  ])
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(currencyIn?: Currency, currencyAmountOut?: CurrencyAmount): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency)
  const baseCurrency = useBaseCurrency()
  const wrappedToken = useWrappedToken()
  const { factory, pairHash, totalFee } = useAppState()
  const [singleHopOnly] = useUserSingleHopOnly()

  return useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return (
          Trade.bestTradeExactOut({
            pairs: allowedPairs,
            currencyIn,
            currencyAmountOut,
            //@ts-ignore
            baseCurrency,
            //@ts-ignore
            wrappedToken,
            factory,
            pairHash,
            //@ts-ignore
            totalFee,
            options: { maxHops: 1, maxNumResults: 1 },
          })[0] ?? null
        )
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | null = null
      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade =
          Trade.bestTradeExactOut({
            pairs: allowedPairs,
            currencyIn,
            currencyAmountOut,
            //@ts-ignore
            baseCurrency,
            //@ts-ignore
            wrappedToken,
            factory,
            pairHash,
            //@ts-ignore
            totalFee,
            options: { maxHops: i, maxNumResults: 1 },
          })[0] ?? null
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade
        }
      }
      return bestTradeSoFar
    }
    return null
  }, [
    currencyIn,
    factory,
    pairHash,
    currencyAmountOut,
    allowedPairs,
    singleHopOnly,
    wrappedToken,
    baseCurrency,
    totalFee,
  ])
}
