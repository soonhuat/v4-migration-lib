export interface Operation {
  exchangeIds: string
  source: string
  operation: number
  tokenIn: string
  amountsIn: string | number
  tokenOut: string
  amountsOut: string | number
  maxPrice: string | number
  swapMarketFee: string
  marketFeeAddress: string
}
