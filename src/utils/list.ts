import { Version } from '@uniswap/token-lists'
import { DEFAULT_LIST_OF_LISTS } from './../constants/lists'
import { returnValidList } from 'utils/getTokenList'

// use ordering of default list of lists to assign priority
export function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1
  else if (first > second) return -1
  return 0
}

export function listVersionLabel(version: Version): string {
  return `v${version.major}.${version.minor}.${version.patch}`
}

export function filterTokenLists(chainId: number, lists: { [listId: string]: any }) {
  return Object.values(lists).filter((list: any) => {
    try {
      // eslint-disable-next-line
      const namePattern = /^[a-zA-Z0-9+\\\-%\/$.() ]+$/
      let filteredTokens = list.tokens
        // filter not valid token before actuall external validation
        // to leave the option of showing the entire token list
        // (without it token list won't be displayed with an error in at least one token)
        .filter(
          (token: { name: string; chainId: number }) => !!token.name.match(namePattern) && token.chainId === chainId
        )
        .map((token: { decimals: number }) => ({
          ...token,
          // some value(s) has to be other types (for now it's only decimals)
          // but JSON allows only strings
          decimals: Number(token.decimals),
        }))

      if (!filteredTokens.length) return false

      return returnValidList({
        ...list,
        tokens: filteredTokens,
      })
    } catch (error) {
      console.error(error)
      return false
    }
  })
}
