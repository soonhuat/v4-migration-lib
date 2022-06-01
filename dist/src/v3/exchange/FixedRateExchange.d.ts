import { TransactionReceipt } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils/types'
import Web3 from 'web3'
import { SubscribablePromise, Logger } from '../utils'
import { DataTokens } from '../datatokens/Datatokens'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
export interface FixedPriceExchange {
  exchangeID?: string
  exchangeOwner: string
  dataToken: string
  baseToken: string
  fixedRate: string
  active: boolean
  supply: string
}
export interface FixedPriceSwap {
  exchangeID: string
  caller: string
  baseTokenAmount: string
  dataTokenAmount: string
}
export declare enum FixedRateCreateProgressStep {
  CreatingExchange = 0,
  ApprovingDatatoken = 1
}
export declare class OceanFixedRateExchange {
  GASLIMIT_DEFAULT: number
  /** Ocean related functions */
  oceanAddress: string
  fixedRateExchangeAddress: string
  fixedRateExchangeABI: AbiItem | AbiItem[]
  web3: Web3
  contract: Contract
  private logger
  datatokens: DataTokens
  startBlock: number
  private config
  /**
   * Instantiate FixedRateExchange
   * @param {any} web3
   * @param {String} fixedRateExchangeAddress
   * @param {any} fixedRateExchangeABI
   * @param {String} oceanAddress
   */
  constructor(
    web3: Web3,
    logger: Logger,
    fixedRateExchangeAddress: string,
    fixedRateExchangeABI: AbiItem | AbiItem[],
    oceanAddress: string,
    datatokens: DataTokens,
    config?: ConfigHelperConfig
  )
  /**
   * Creates new exchange pair between Ocean Token and data token.
   * @param {String} dataToken Data Token Contract Address
   * @param {Number} rate exchange rate
   * @param {String} address User address
   * @param {String} amount Optional, amount of datatokens to be approved for the exchange
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  create(
    dataToken: string,
    rate: string,
    address: string,
    amount?: string
  ): SubscribablePromise<FixedRateCreateProgressStep, TransactionReceipt>
  /**
   * Creates new exchange pair between Ocean Token and data token.
   * @param {String} dataToken Data Token Contract Address
   * @param {Number} rate exchange rate
   * @param {String} address User address
   * @param {String} amount Optional, amount of datatokens to be approved for the exchange
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  createExchange(
    baseToken: string,
    dataToken: string,
    rate: string,
    address: string,
    amount?: string
  ): SubscribablePromise<FixedRateCreateProgressStep, TransactionReceipt>
  /**
   * Creates unique exchange identifier.
   * @param {String} dataToken Data Token Contract Address
   * @param {String} owner Owner of the exchange
   * @return {Promise<string>} exchangeId
   */
  generateExchangeId(dataToken: string, owner: string): Promise<string>
  /**
   * Atomic swap
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  buyDT(
    exchangeId: string,
    dataTokenAmount: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Gets total number of exchanges
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @return {Promise<Number>} no of available exchanges
   */
  getNumberOfExchanges(): Promise<number>
  /**
   * Set new rate
   * @param {String} exchangeId ExchangeId
   * @param {Number} newRate New rate
   * @param {String} address User account
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  setRate(
    exchangeId: string,
    newRate: number,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Activate an exchange
   * @param {String} exchangeId ExchangeId
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  activate(exchangeId: string, address: string): Promise<TransactionReceipt>
  /**
   * Deactivate an exchange
   * @param {String} exchangeId ExchangeId
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  deactivate(exchangeId: string, address: string): Promise<TransactionReceipt>
  /**
   * Get Rate
   * @param {String} exchangeId ExchangeId
   * @return {Promise<string>} Rate (converted from wei)
   */
  getRate(exchangeId: string): Promise<string>
  /**
   * Get Supply
   * @param {String} exchangeId ExchangeId
   * @return {Promise<string>} Rate (converted from wei)
   */
  getSupply(exchangeId: string): Promise<string>
  /**
   * getOceanNeeded
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @return {Promise<string>} Ocean amount needed
   */
  getOceanNeeded(exchangeId: string, dataTokenAmount: string): Promise<string>
  /**
   * Get exchange details
   * @param {String} exchangeId ExchangeId
   * @return {Promise<FixedPricedExchange>} Exchange details
   */
  getExchange(exchangeId: string): Promise<FixedPriceExchange>
  /**
   * Get all exchanges
   * @param {String} exchangeId ExchangeId
   * @return {Promise<String[]>} Exchanges list
   */
  getExchanges(): Promise<string[]>
  /**
   * Check if an exchange is active
   * @param {String} exchangeId ExchangeId
   * @return {Promise<Boolean>} Result
   */
  isActive(exchangeId: string): Promise<boolean>
  /**
   * Calculates how many basetokens are needed to get specifyed amount of datatokens
   * @param {String} exchangeId ExchangeId
   * @param {String} dataTokenAmount dataTokenAmount
   * @return {Promise<String>} Result
   */
  CalcInGivenOut(exchangeId: string, dataTokenAmount: string): Promise<string>
  searchforDT(
    dataTokenAddress: string,
    minSupply: string
  ): Promise<FixedPriceExchange[]>
  /**
   * Get all exchanges, filtered by creator(if any)
   * @param {String} account
   * @return {Promise<FixedPricedExchange[]>}
   */
  getExchangesbyCreator(account?: string): Promise<FixedPriceExchange[]>
  /**
   * Get all swaps for an exchange, filtered by account(if any)
   * @param {String} exchangeId
   * @param {String} account
   * @return {Promise<FixedPricedSwap[]>}
   */
  getExchangeSwaps(
    exchangeId: string,
    account?: string
  ): Promise<FixedPriceSwap[]>
  /**
   * Get all swaps for an account
   * @param {String} account
   * @return {Promise<FixedPricedSwap[]>}
   */
  getAllExchangesSwaps(account: string): Promise<FixedPriceSwap[]>
  private getEventData
}
