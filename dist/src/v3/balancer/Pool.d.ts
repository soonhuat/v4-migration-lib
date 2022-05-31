import Web3 from 'web3'
import { AbiItem } from 'web3-utils/types'
import { TransactionReceipt } from 'web3-core'
import { Logger } from '../utils'
import { PoolFactory } from './PoolFactory'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
export interface TokensToAdd {
  address: string
  amount: string
  weight: string
}
export declare class Pool extends PoolFactory {
  poolABI: AbiItem | AbiItem[]
  constructor(
    web3: Web3,
    logger: Logger,
    factoryABI?: AbiItem | AbiItem[],
    poolABI?: AbiItem | AbiItem[],
    factoryAddress?: string,
    config?: ConfigHelperConfig
  )
  createPool(account: string): Promise<TransactionReceipt>
  setup(
    account: string,
    poolAddress: string,
    dataToken: string,
    dataTokenAmount: string,
    dataTokenWeight: string,
    baseToken: string,
    baseTokenAmount: string,
    baseTokenWeight: string,
    swapFee: string
  ): Promise<string>
  allowance(
    tokenAdress: string,
    owner: string,
    spender: string
  ): Promise<string>
  approve(
    account: string,
    tokenAddress: string,
    spender: string,
    amount: string,
    force?: boolean
  ): Promise<TransactionReceipt | string>
  sharesBalance(account: string, poolAddress: string): Promise<string>
  addToPool(
    account: string,
    poolAddress: string,
    tokens: TokensToAdd[]
  ): Promise<void>
  setSwapFee(
    account: string,
    poolAddress: string,
    fee: string
  ): Promise<TransactionReceipt>
  finalize(account: string, poolAddress: string): Promise<TransactionReceipt>
  getNumTokens(poolAddress: string): Promise<string>
  getPoolSharesTotalSupply(poolAddress: string): Promise<string>
  getCurrentTokens(poolAddress: string): Promise<string[]>
  getFinalTokens(poolAddress: string): Promise<string[]>
  getController(poolAddress: string): Promise<string>
  setController(
    account: string,
    poolAddress: string,
    controllerAddress: string
  ): Promise<string>
  isBound(poolAddress: string, token: string): Promise<boolean>
  getReserve(poolAddress: string, token: string): Promise<string>
  isFinalized(poolAddress: string): Promise<boolean>
  getSwapFee(poolAddress: string): Promise<string>
  getNormalizedWeight(poolAddress: string, token: string): Promise<string>
  getDenormalizedWeight(poolAddress: string, token: string): Promise<string>
  getTotalDenormalizedWeight(poolAddress: string): Promise<string>
  swapExactAmountIn(
    account: string,
    poolAddress: string,
    tokenIn: string,
    tokenAmountIn: string,
    tokenOut: string,
    minAmountOut: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  swapExactAmountOut(
    account: string,
    poolAddress: string,
    tokenIn: string,
    maxAmountIn: string,
    tokenOut: string,
    minAmountOut: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  joinPool(
    account: string,
    poolAddress: string,
    poolAmountOut: string,
    maxAmountsIn: string[]
  ): Promise<TransactionReceipt>
  exitPool(
    account: string,
    poolAddress: string,
    poolAmountIn: string,
    minAmountsOut: string[]
  ): Promise<TransactionReceipt>
  joinswapExternAmountIn(
    account: string,
    poolAddress: string,
    tokenIn: string,
    tokenAmountIn: string,
    minPoolAmountOut: string
  ): Promise<TransactionReceipt>
  joinswapPoolAmountOut(
    account: string,
    poolAddress: string,
    tokenIn: string,
    poolAmountOut: string,
    maxAmountIn: string
  ): Promise<TransactionReceipt>
  exitswapPoolAmountIn(
    account: string,
    poolAddress: string,
    tokenOut: string,
    poolAmountIn: string,
    minTokenAmountOut: string
  ): Promise<TransactionReceipt>
  exitswapExternAmountOut(
    account: string,
    poolAddress: string,
    tokenOut: string,
    tokenAmountOut: string,
    maxPoolAmountIn: string
  ): Promise<TransactionReceipt>
  getSpotPrice(
    poolAddress: string,
    tokenIn: string,
    tokenOut: string
  ): Promise<string>
  getSpotPriceSansFee(
    poolAddress: string,
    tokenIn: string,
    tokenOut: string
  ): Promise<string>
  calcSpotPrice(
    poolAddress: string,
    tokenBalanceIn: string,
    tokenWeightIn: string,
    tokenBalanceOut: string,
    tokenWeightOut: string,
    swapFee: string
  ): Promise<string>
  calcInGivenOut(
    poolAddress: string,
    tokenBalanceIn: string,
    tokenWeightIn: string,
    tokenBalanceOut: string,
    tokenWeightOut: string,
    tokenAmountOut: string,
    swapFee: string
  ): Promise<string>
  calcOutGivenIn(
    poolAddress: string,
    tokenBalanceIn: string,
    tokenWeightIn: string,
    tokenBalanceOut: string,
    tokenWeightOut: string,
    tokenAmountIn: string,
    swapFee: string
  ): Promise<string>
  calcPoolOutGivenSingleIn(
    poolAddress: string,
    tokenBalanceIn: string,
    tokenWeightIn: string,
    poolSupply: string,
    totalWeight: string,
    tokenAmountIn: string,
    swapFee: string
  ): Promise<string>
  calcSingleInGivenPoolOut(
    poolAddress: string,
    tokenBalanceIn: string,
    tokenWeightIn: string,
    poolSupply: string,
    totalWeight: string,
    poolAmountOut: string,
    swapFee: string
  ): Promise<string>
  calcSingleOutGivenPoolIn(
    poolAddress: string,
    tokenBalanceOut: string,
    tokenWeightOut: string,
    poolSupply: string,
    totalWeight: string,
    poolAmountIn: string,
    swapFee: string
  ): Promise<string>
  calcPoolInGivenSingleOut(
    poolAddress: string,
    tokenBalanceOut: string,
    tokenWeightOut: string,
    poolSupply: string,
    totalWeight: string,
    tokenAmountOut: string,
    swapFee: string
  ): Promise<string>
  getSwapEventSignature(): string
  getJoinEventSignature(): string
  getExitEventSignature(): string
}
