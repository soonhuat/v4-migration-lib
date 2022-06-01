import Web3 from 'web3'
import { AbiItem } from 'web3-utils/types'
import { TransactionReceipt } from 'web3-core'
import { Pool } from './Pool'
import { SubscribablePromise, Logger } from '../utils'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
declare type PoolTransactionType = 'swap' | 'join' | 'exit'
export interface PoolDetails {
  poolAddress: string
  tokens: string[]
}
export interface PoolShare {
  poolAddress: string
  shares: string
  did: string
}
export interface TokensReceived {
  dtAmount: string
  oceanAmount: string
}
export interface PoolTransaction {
  poolAddress: string
  dtAddress: string
  caller: string
  transactionHash: string
  blockNumber: number
  timestamp: number
  tokenIn?: string
  tokenOut?: string
  tokenAmountIn?: string
  tokenAmountOut?: string
  type: PoolTransactionType
}
export declare enum PoolCreateProgressStep {
  CreatingPool = 0,
  ApprovingDatatoken = 1,
  ApprovingOcean = 2,
  SetupPool = 3
}
/**
 * Ocean Pools submodule exposed under ocean.pool
 */
export declare class OceanPool extends Pool {
  oceanAddress: string
  dtAddress: string
  startBlock: number
  constructor(
    web3: Web3,
    logger: Logger,
    factoryABI?: AbiItem | AbiItem[],
    poolABI?: AbiItem | AbiItem[],
    factoryAddress?: string,
    oceanAddress?: string,
    config?: ConfigHelperConfig
  )
  /**
       * Create DataToken pool
       @param {String} account
       * @param {String} dtAddress  DataToken address
       * @param {String} dtAmount DataToken amount
       * @param {String} dtWeight DataToken weight
       * @param {String} oceanAmount Ocean amount
       * @param {String} fee Swap fee. E.g. to get a 0.1% swapFee use `0.001`. The maximum allowed swapFee is `0.1` (10%).
       * @return {String}
       */
  create(
    account: string,
    dtAddress: string,
    dtAmount: string,
    dtWeight: string,
    oceanAmount: string,
    fee: string
  ): SubscribablePromise<PoolCreateProgressStep, TransactionReceipt>
  /**
   * Get DataToken address of token in this pool
   * @param {String} account
   * @param {String} poolAddress
   * @return {string}
   */
  getDTAddress(poolAddress: string): Promise<string>
  /**
   * Get Ocean Token balance of a pool
   * @param {String} poolAddress
   * @return {String}
   */
  getOceanReserve(poolAddress: string): Promise<string>
  /**
   * Get datatoken balance of a pool
   * @param {String} poolAddress
   * @return {String}
   */
  getDTReserve(poolAddress: string): Promise<string>
  /**
   * Returns max amount that you can buy.
   * @param poolAddress
   * @param tokenAddress
   */
  getMaxBuyQuantity(poolAddress: string, tokenAddress: string): Promise<string>
  /**
   * Returns max amount of OCEAN that you can buy.
   * @param poolAddress
   * @param tokenAddress
   */
  getOceanMaxBuyQuantity(poolAddress: string): Promise<string>
  /**
   * Returns max amount of DT that you can buy.
   * @param poolAddress
   * @param tokenAddress
   */
  getDTMaxBuyQuantity(poolAddress: string): Promise<string>
  /**
   * Returns tokenInAmount required to get tokenOutAmount
   * @param poolAddress
   * @param tokenInAddress
   * @param tokenOutAddress
   * @param tokenOutAmount
   */
  calcInGivenOut(
    poolAddress: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    tokenOutAmount: string
  ): Promise<string>
  /**
   * Returns tokenOutAmount given tokenInAmount
   * @param poolAddress
   * @param tokenInAddress
   * @param tokenOutAddress
   * @param tokenInAmount
   */
  calcOutGivenIn(
    poolAddress: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    tokenInAmount: string
  ): Promise<string>
  /**
   * Returns no of shares receved for adding a token to the pool
   * @param poolAddress
   * @param tokenInAddress
   * @param tokenInAmount
   */
  calcPoolOutGivenSingleIn(
    poolAddress: string,
    tokenInAddress: string,
    tokenInAmount: string
  ): Promise<string>
  /**
   * Returns no of tokens required to get a specific no of poolShares
   * @param poolAddress
   * @param tokenInAddress
   * @param poolShares
   */
  calcSingleInGivenPoolOut(
    poolAddress: string,
    tokenInAddress: string,
    poolShares: string
  ): Promise<string>
  /**
   * Returns no of tokens received for spending a specific no of poolShares
   * @param poolAddress
   * @param tokenOutAddress
   * @param poolShares
   */
  calcSingleOutGivenPoolIn(
    poolAddress: string,
    tokenOutAddress: string,
    poolShares: string
  ): Promise<string>
  /**
   * Returns no of pool shares required to  receive a specified amount of tokens
   * @param poolAddress
   * @param tokenOutAddress
   * @param tokenOutAmount
   */
  calcPoolInGivenSingleOut(
    poolAddress: string,
    tokenOutAddress: string,
    tokenOutAmount: string
  ): Promise<string>
  /**
   * Returns no of pool shares required to  receive specified amount of DT
   * @param poolAddress
   * @param dtAmount
   */
  getPoolSharesRequiredToRemoveDT(
    poolAddress: string,
    dtAmount: string
  ): Promise<string>
  /**
   * Returns DT amnount received after spending poolShares
   * @param poolAddress
   * @param poolShares
   */
  getDTRemovedforPoolShares(
    poolAddress: string,
    poolShares: string
  ): Promise<string>
  /**
   * Returns no of pool shares required to  receive specified amount of DT
   * @param poolAddress
   * @param dtAmount
   */
  getPoolSharesRequiredToRemoveOcean(
    poolAddress: string,
    oceanAmount: string
  ): Promise<string>
  /**
   * Returns Ocean amnount received after spending poolShares
   * @param poolAddress
   * @param poolShares
   */
  getOceanRemovedforPoolShares(
    poolAddress: string,
    poolShares: string
  ): Promise<string>
  /**
   * Returns Datatoken & Ocean amounts received after spending poolShares
   * @param {String} poolAddress
   * @param {String} poolShares
   * @return {TokensReceived}
   */
  getTokensRemovedforPoolShares(
    poolAddress: string,
    poolShares: string
  ): Promise<TokensReceived>
  /**
   * Returns max DT amount that you can add to the pool
   * @param poolAddress
   */
  getDTMaxAddLiquidity(poolAddress: string): Promise<string>
  /**
   * Returns max Ocean amount that you can add to the pool
   * @param poolAddress
   */
  getOceanMaxAddLiquidity(poolAddress: string): Promise<string>
  /**
   * Returns max amount of tokens that you can add to the pool
   * @param poolAddress
   * @param tokenAddress
   */
  getMaxAddLiquidity(poolAddress: string, tokenAddress: string): Promise<string>
  /**
   * Returns max amount of tokens that you can withdraw from the pool
   * @param poolAddress
   * @param tokenAddress
   */
  getMaxRemoveLiquidity(
    poolAddress: string,
    tokenAddress: string
  ): Promise<string>
  /**
   * Returns max amount of DT that you can withdraw from the pool
   * @param poolAddress
   * @param tokenAddress
   */
  getDTMaxRemoveLiquidity(poolAddress: string): Promise<string>
  /**
   * Returns max amount of Ocean that you can withdraw from the pool
   * @param poolAddress
   * @param tokenAddress
   */
  getOceanMaxRemoveLiquidity(poolAddress: string): Promise<string>
  /**
   * Buy datatoken from a pool
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount  datatoken amount
   * @param {String} oceanAmount  Ocean Token amount payed
   * @param {String} maxPrice  Maximum price to pay
   * @return {TransactionReceipt}
   */
  buyDT(
    account: string,
    poolAddress: string,
    dtAmountWanted: string,
    maxOceanAmount: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  /**
   * Buy at least datatoken from a pool for a fixed Ocean amount
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount  datatoken amount
   * @param {String} oceanAmount  Ocean Token amount payed
   * @param {String} maxPrice  Maximum price to pay
   * @return {TransactionReceipt}
   */
  buyDTWithExactOcean(
    account: string,
    poolAddress: string,
    minimumdtAmountWanted: string,
    oceanAmount: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  /**
   * Sell a specific amount of datatoken to get some ocean tokens
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount  datatoken amount to be sold
   * @param {String} oceanAmount  Ocean Token amount expected
   * @param {String} maxPrice  Minimum price to sell
   * @return {TransactionReceipt}
   */
  sellDT(
    account: string,
    poolAddress: string,
    dtAmount: string,
    oceanAmountWanted: string,
    maxPrice?: string
  ): Promise<TransactionReceipt>
  /**
   * Add datatoken amount to pool liquidity
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount datatoken amount
   * @return {TransactionReceipt}
   */
  addDTLiquidity(
    account: string,
    poolAddress: string,
    amount: string
  ): Promise<TransactionReceipt>
  /**
   * Remove datatoken amount from pool liquidity
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount datatoken amount
   * @param {String} maximumPoolShares
   * @return {TransactionReceipt}
   */
  removeDTLiquidity(
    account: string,
    poolAddress: string,
    amount: string,
    maximumPoolShares: string
  ): Promise<TransactionReceipt>
  /**
   * Add Ocean Token amount to pool liquidity
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount Ocean Token amount in OCEAN
   * @return {TransactionReceipt}
   */
  addOceanLiquidity(
    account: string,
    poolAddress: string,
    amount: string
  ): Promise<TransactionReceipt>
  /**
   * Remove Ocean Token amount from pool liquidity based on the minimum allowed of Ocean Tokens received
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} poolShares pool shares
   * @param {String} minOcean minimum amount of OCEAN received
   * @return {TransactionReceipt}
   */
  removeOceanLiquidityWithMinimum(
    account: string,
    poolAddress: string,
    poolShares: string,
    minOcean: string
  ): Promise<TransactionReceipt>
  /**
   * Remove Ocean Token amount from pool liquidity based on the maximum pool shares allowed to be spent
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} amount Ocean Token amount in OCEAN
   * @param {String} maximumPoolShares maximum pool shares allowed to be spent
   * @return {TransactionReceipt}
   */
  removeOceanLiquidity(
    account: string,
    poolAddress: string,
    amount: string,
    maximumPoolShares: string
  ): Promise<TransactionReceipt>
  /**
   * Remove pool liquidity
   * @param {String} account
   * @param {String} poolAddress
   * @param {String} poolShares
   * @param {String} minDT Minimum DT expected (defaults 0)
   * @param {String} poolShares Minim Ocean expected (defaults 0)
   * @return {TransactionReceipt}
   */
  removePoolLiquidity(
    account: string,
    poolAddress: string,
    poolShares: string,
    minDT?: string,
    minOcean?: string
  ): Promise<TransactionReceipt>
  /**
   * Get datatoken price from pool
   * @param {String} poolAddress
   * @return {String}
   */
  getDTPrice(poolAddress: string): Promise<string>
  /**
   * Search all pools that have datatoken in their composition
   * @param {String} dtAddress
   * @return {String[]}
   */
  searchPoolforDT(dtAddress: string): Promise<string[]>
  getOceanNeeded(poolAddress: string, dtRequired: string): Promise<string>
  /**
   * Calculate how many Ocean Tokens are you going to receive for selling a specific dtAmount (selling DT)
   * @param {String} poolAddress
   * @param {String} dtAmount
   * @return {String[]} - amount of ocean tokens received
   */
  getOceanReceived(poolAddress: string, dtAmount: string): Promise<string>
  /**
   * Calculate how many data token are you going to receive for selling a specific oceanAmount (buying DT)
   * @param {String} poolAddress
   * @param {String} oceanAmount
   * @return {String[]} - amount of ocean tokens received
   */
  getDTReceived(poolAddress: string, oceanAmount: string): Promise<string>
  getDTNeeded(poolAddress: string, OceanRequired: string): Promise<string>
  /**
   * Search all pools created by an address
   * @param {String} account If empty, will return all pools ever created by anybody
   * @return {PoolDetails[]}
   */
  getPoolsbyCreator(account?: string): Promise<PoolDetails[]>
  private getResult
  /**
   * Search all pools in which a user has shares
   * @param {String} account
   * @return {AllPoolsShares[]}
   */
  getPoolSharesByAddress(account: string): Promise<PoolShare[]>
  /**
   * Get pool details
   * @param {String} poolAddress Pool address
   * @return {PoolDetails}
   */
  getPoolDetails(poolAddress: string): Promise<PoolDetails>
  /**
   * Get all actions from a pool (join,exit,swap)
   * @param {String} poolAddress Pool address
   * @param {String} account Optional, filter for this address
   * @return {PoolTransaction[]}
   */
  getPoolLogs(
    poolAddress: string,
    startBlock?: number,
    account?: string
  ): Promise<PoolTransaction[]>
  /**
   * Get all logs on all pools for a specific address
   * @param {String} account
   * @return {PoolTransaction[]}
   */
  getAllPoolLogs(account: string): Promise<PoolTransaction[]>
  private getEventData
  private computeSlippage
  computeBuySlippage(poolAddress: string, oceanAmount: string): Promise<string>
  computeSellSlippage(poolAddress: string, dtAmount: string): Promise<string>
}
export {}
