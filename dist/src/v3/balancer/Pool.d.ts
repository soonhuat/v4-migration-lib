import Web3 from 'web3'
import { AbiItem } from 'web3-utils/types'
import { TransactionReceipt } from 'web3-core'
import { Logger } from '../utils'
import { PoolFactory } from './PoolFactory'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
/**
 * Provides an interface to Balancer BPool & BFactory
 */
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
  /**
   * Creates a new pool
   */
  createPool(account: string): Promise<TransactionReceipt>
  /**
   * Setup a new pool by setting datatoken, base token, swap fee and
   * finalizing the pool to make it public.
   *
   * @param {String} account ethereum address to use for sending this transaction
   * @param {String} poolAddress address of new Balancer Pool
   * @param {String} dataToken address of datatoken ERC20 contract
   * @param {String} dataTokenAmount in wei
   * @param {String} dataTokenWeight in wei
   * @param {String} baseToken address of base token ERC20 contract
   * @param {String} baseTokenAmount in wei
   * @param {String} baseTokenWeight in wei
   * @param {String} swapFee in wei
   */
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
  /**
   * Get Alloance for both DataToken and Ocean
   * @param {String } tokenAdress
   * @param {String} owner
   * @param {String} spender
   */
  allowance(
    tokenAdress: string,
    owner: string,
    spender: string
  ): Promise<string>
  /**
   * Approve spender to spent amount tokens
   * @param {String} account
   * @param {String} tokenAddress
   * @param {String} spender
   * @param {String} amount  (always expressed as wei)
   * @param {String} force  if true, will overwrite any previous allowence. Else, will check if allowence is enough and will not send a transaction if it's not needed
   */
  approve(
    account: string,
    tokenAddress: string,
    spender: string,
    amount: string,
    force?: boolean
  ): Promise<TransactionReceipt | string>
  /**
   * Get user shares of pool tokens
   * @param {String} account
   * @param {String} poolAddress
   * @return {String}
   */
  sharesBalance(account: string, poolAddress: string): Promise<string>
  /**
   * Adds tokens to pool
   * @param {String} account
   * @param {String} poolAddress
   * @param {Array} tokens Array of token object { address,amount,weight}
   */
  addToPool(
    account: string,
    poolAddress: string,
    tokens: TokensToAdd[]
  ): Promise<void>
  /**
   * Set pool fee
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} fee 0.1=10% fee(max allowed)
   */
  setSwapFee(
    account: string,
    poolAddress: string,
    fee: string
  ): Promise<TransactionReceipt>
  /**
   * Finalize a pool
   * @param {String} account
   * @param {String} poolAddress
   */
  finalize(account: string, poolAddress: string): Promise<TransactionReceipt>
  /**
   * Get number of tokens composing this pool
   * @param {String} poolAddress
   * @return {String}
   */
  getNumTokens(poolAddress: string): Promise<string>
  /**
   * Get total supply of pool shares
   * @param {String} poolAddress
   * @return {String}
   */
  getPoolSharesTotalSupply(poolAddress: string): Promise<string>
  /**
   * Get tokens composing this pool
   * @param {String} poolAddress
   * @return {String[]}
   */
  getCurrentTokens(poolAddress: string): Promise<string[]>
  /**
   * Get the final tokens composing this pool
   * @param {String} poolAddress
   * @return {String[]}
   */
  getFinalTokens(poolAddress: string): Promise<string[]>
  /**
   * Get controller address of this pool
   * @param {String} poolAddress
   * @return {String}
   */
  getController(poolAddress: string): Promise<string>
  /**
   * Set controller address of this pool
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} controllerAddress
   * @return {String}
   */
  setController(
    account: string,
    poolAddress: string,
    controllerAddress: string
  ): Promise<string>
  /**
   * Get if a token is bounded to a pool
   * @param {String} poolAddress
   * @param {String} token  Address of the token
   * @return {Boolean}
   */
  isBound(poolAddress: string, token: string): Promise<boolean>
  /**
   * Get how many tokens are in the pool
   * @param {String} poolAddress
   * @param {String} token  Address of the token
   * @return {String}
   */
  getReserve(poolAddress: string, token: string): Promise<string>
  /**
   * Get if a pool is finalized
   * @param {String} poolAddress
   * @return {Boolean}
   */
  isFinalized(poolAddress: string): Promise<boolean>
  /**
   * Get pool fee
   * @param {String} poolAddress
   * @return {String} Swap fee. To get the percentage value, substract by 100. E.g. `0.1` represents a 10% swap fee.
   */
  getSwapFee(poolAddress: string): Promise<string>
  /**
   * The normalized weight of a token. The combined normalized weights of all tokens will sum up to 1. (Note: the actual sum may be 1 plus or minus a few wei due to division precision loss)
   * @param {String} poolAddress
   * @param {String} token
   * @return {String}
   */
  getNormalizedWeight(poolAddress: string, token: string): Promise<string>
  /**
   * getDenormalizedWeight of a token in pool
   * @param {String} poolAddress
   * @param {String} token
   * @return {String}
   */
  getDenormalizedWeight(poolAddress: string, token: string): Promise<string>
  /**
   * getTotalDenormalizedWeight in pool
   * @param {String} poolAddress
   * @return {String}
   */
  getTotalDenormalizedWeight(poolAddress: string): Promise<string>
  /**
   * swapExactAmountIn - Trades an exact tokenAmountIn of tokenIn taken from the caller by the pool, in exchange for at least minAmountOut of tokenOut given to the caller from the pool, with a maximum marginal price of maxPrice.         Returns (tokenAmountOut, spotPriceAfter), where tokenAmountOut is the amount of token that came out of the pool, and spotPriceAfter is the new marginal spot price, ie, the result of getSpotPrice after the call. (These values are what are limited by the arguments; you are guaranteed tokenAmountOut >= minAmountOut and spotPriceAfter <= maxPrice).
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} tokenIn
   * @param {String} tokenAmountIn  will be converted to wei
   * @param {String} tokenOut
   * @param {String} minAmountOut will be converted to wei
   * @param {String} maxPrice will be converted to wei
   * @return {TransactionReceipt}
   */
  swapExactAmountIn(
    account: string,
    poolAddress: string,
    tokenIn: string,
    tokenAmountIn: string,
    tokenOut: string,
    minAmountOut: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  /**
   * swapExactAmountOut
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} tokenIn
   * @param {String} maxAmountIn  will be converted to wei
   * @param {String} tokenOut
   * @param {String} minAmountOut will be converted to wei
   * @param {String} maxPrice will be converted to wei
   * @return {TransactionReceipt}
   */
  swapExactAmountOut(
    account: string,
    poolAddress: string,
    tokenIn: string,
    maxAmountIn: string,
    tokenOut: string,
    minAmountOut: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  /**
   * Join the pool, getting poolAmountOut pool tokens. This will pull some of each of the currently trading tokens in the pool, meaning you must have called approve for each token for this pool. These values are limited by the array of maxAmountsIn in the order of the pool tokens.
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} poolAmountOut will be converted to wei
   * @param {String[]} maxAmountsIn  array holding maxAmount per each token, will be converted to wei
   * @return {TransactionReceipt}
   */
  joinPool(
    account: string,
    poolAddress: string,
    poolAmountOut: string,
    maxAmountsIn: string[]
  ): Promise<TransactionReceipt>
  /**
   * Exit the pool, paying poolAmountIn pool tokens and getting some of each of the currently trading tokens in return. These values are limited by the array of minAmountsOut in the order of the pool tokens.
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} poolAmountIn will be converted to wei
   * @param {String[]} minAmountsOut  array holding minAmount per each token, will be converted to wei
   * @return {TransactionReceipt}
   */
  exitPool(
    account: string,
    poolAddress: string,
    poolAmountIn: string,
    minAmountsOut: string[]
  ): Promise<TransactionReceipt>
  /**
   * Pay tokenAmountIn of token tokenIn to join the pool, getting poolAmountOut of the pool shares.
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} tokenIn
   * @param {String} tokenAmountIn will be converted to wei
   * @param {String} minPoolAmountOut  will be converted to wei
   * @return {TransactionReceipt}
   */
  joinswapExternAmountIn(
    account: string,
    poolAddress: string,
    tokenIn: string,
    tokenAmountIn: string,
    minPoolAmountOut: string
  ): Promise<TransactionReceipt>
  /**
   * Specify poolAmountOut pool shares that you want to get, and a token tokenIn to pay with. This costs tokenAmountIn tokens (these went into the pool).
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} tokenIn
   * @param {String} poolAmountOut will be converted to wei
   * @param {String} maxAmountIn  will be converted to wei
   * @return {TransactionReceipt}
   */
  joinswapPoolAmountOut(
    account: string,
    poolAddress: string,
    tokenIn: string,
    poolAmountOut: string,
    maxAmountIn: string
  ): Promise<TransactionReceipt>
  /**
   * Pay poolAmountIn pool shares into the pool, getting minTokenAmountOut of the given token tokenOut out of the pool.
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} tokenOut
   * @param {String} poolAmountIn will be converted to wei
   * @param {String} minTokenAmountOut  will be converted to wei
   * @return {TransactionReceipt}
   */
  exitswapPoolAmountIn(
    account: string,
    poolAddress: string,
    tokenOut: string,
    poolAmountIn: string,
    minTokenAmountOut: string
  ): Promise<TransactionReceipt>
  /**
   * Specify tokenAmountOut of token tokenOut that you want to get out of the pool. This costs poolAmountIn pool shares (these went into the pool).
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} tokenOut
   * @param {String} tokenAmountOut will be converted to wei
   * @param {String} maxPoolAmountIn  will be converted to wei
   * @return {TransactionReceipt}
   */
  exitswapExternAmountOut(
    account: string,
    poolAddress: string,
    tokenOut: string,
    tokenAmountOut: string,
    maxPoolAmountIn: string
  ): Promise<TransactionReceipt>
  /**
   * Get Spot Price of swaping tokenIn to tokenOut
   * @param {String} poolAddress
   * @param {String} tokenIn
   * @param {String} tokenOut
   * @return {String}
   */
  getSpotPrice(
    poolAddress: string,
    tokenIn: string,
    tokenOut: string
  ): Promise<string>
  /**
   * Get Spot Price of swaping tokenIn to tokenOut without fees
   * @param {String} poolAddress
   * @param {String} tokenIn
   * @param {String} tokenOut
   * @return {String}
   */
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
  /**
   * Get LOG_SWAP encoded topic
   * @return {String}
   */
  getSwapEventSignature(): string
  /**
   * Get LOG_JOIN encoded topic
   * @return {String}
   */
  getJoinEventSignature(): string
  /**
   * Get LOG_EXIT encoded topic
   * @return {String}
   */
  getExitEventSignature(): string
}
