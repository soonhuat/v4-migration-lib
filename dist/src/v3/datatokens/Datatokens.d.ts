import Web3 from 'web3'
import { AbiItem } from 'web3-utils/types'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
import { Logger } from '../utils'
import { TransactionReceipt } from 'web3-core'
/**
 * Provides an interface to DataTokens
 */
export declare class DataTokens {
  GASLIMIT_DEFAULT: number
  factoryAddress: string
  factoryABI: AbiItem | AbiItem[]
  datatokensABI: AbiItem | AbiItem[]
  web3: Web3
  private logger
  startBlock: number
  private config
  /**
   * Instantiate DataTokens (independently of Ocean).
   * @param {String} factoryAddress
   * @param {AbiItem | AbiItem[]} factoryABI
   * @param {AbiItem | AbiItem[]} datatokensABI
   * @param {Web3} web3
   */
  constructor(
    factoryAddress: string,
    factoryABI: AbiItem | AbiItem[],
    datatokensABI: AbiItem | AbiItem[],
    web3: Web3,
    logger: Logger,
    config?: ConfigHelperConfig
  )
  /**
   * Generate new datatoken name & symbol from a word list
   * @return {<{ name: String; symbol: String }>} datatoken name & symbol. Produces e.g. "Endemic Jellyfish Token" & "ENDJEL-45"
   */
  generateDtName(wordList?: { nouns: string[]; adjectives: string[] }): {
    name: string
    symbol: string
  }
  /**
   * Create new datatoken
   * @param {String} metadataCacheUri
   * @param {String} address
   * @param {String} cap Maximum cap (Number) - will be converted to wei
   * @param {String} name Token name
   * @param {String} symbol Token symbol
   * @return {Promise<string>} datatoken address
   */
  create(
    metadataCacheUri: string,
    address: string,
    cap?: string,
    name?: string,
    symbol?: string
  ): Promise<string>
  /**
   * Approve
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {string} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  approve(
    dataTokenAddress: string,
    spender: string,
    amount: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Mint
   * @param {String} dataTokenAddress
   * @param {String} address
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} toAddress   - only if toAddress is different from the minter
   * @return {Promise<TransactionReceipt>} transactionId
   */
  mint(
    dataTokenAddress: string,
    address: string,
    amount: string,
    toAddress?: string
  ): Promise<TransactionReceipt>
  /**
   * Transfer as number from address to toAddress
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  transfer(
    dataTokenAddress: string,
    toAddress: string,
    amount: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Transfer as number from address to toAddress
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  transferToken(
    dataTokenAddress: string,
    toAddress: string,
    amount: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Transfer in wei from address to toAddress
   * @param {String} dataTokenAddress
   * @param {String} toAddress
   * @param {String} amount Number of datatokens, as number. Expressed as wei
   * @param {String} address
   * @return {Promise<TransactionReceipt>} transactionId
   */
  transferWei(
    dataTokenAddress: string,
    toAddress: string,
    amount: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Transfer from fromAddress to address  (needs an Approve operation before)
   * @param {String} dataTokenAddress
   * @param {String} fromAddress
   * @param {String} amount Number of datatokens, as number. Will be converted to wei
   * @param {String} address
   * @return {Promise<string>} transactionId
   */
  transferFrom(
    dataTokenAddress: string,
    fromAddress: string,
    amount: string,
    address: string
  ): Promise<string>
  /**
   * Get Address Balance for datatoken
   * @param {String} dataTokenAddress
   * @param {String} address
   * @return {Promise<String>} balance  Number of datatokens. Will be converted from wei
   */
  balance(dataTokenAddress: string, address: string): Promise<string>
  /**
   * Get Alloance
   * @param {String } dataTokenAddress
   * @param {String} owner
   * @param {String} spender
   */
  allowance(
    dataTokenAddress: string,
    owner: string,
    spender: string
  ): Promise<string>
  /** Get Blob
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  getBlob(dataTokenAddress: string): Promise<string>
  /** Get Name
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  getName(dataTokenAddress: string): Promise<string>
  /** Get Symbol
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  getSymbol(dataTokenAddress: string): Promise<string>
  /** Get Cap
   * @param {String} dataTokenAddress
   * @return {Promise<string>} string
   */
  getCap(dataTokenAddress: string): Promise<string>
  /** Convert to wei
   * @param {String} amount
   * @return {Promise<string>} string
   */
  toWei(amount: string): string
  /** Convert from wei
   * @param {String} amount
   * @return {Promise<string>} string
   */
  fromWei(amount: string): string
  /** Start Order
   * @param {String} dataTokenAddress
   * @param {String} consumer consumer Address
   * @param {String} amount
   * @param {Number} serviceId
   * @param {String} mpFeeAddress
   * @param {String} address consumer Address
   * @return {Promise<string>} string
   */
  startOrder(
    dataTokenAddress: string,
    consumer: string,
    amount: string,
    serviceId: number,
    mpFeeAddress: string,
    address: string
  ): Promise<TransactionReceipt>
  /** Search and return txid for a previous valid order with the same params
   * @param {String} dataTokenAddress
   * @param {String} amount
   * @param {String} did
   * @param {Number} serviceId
   * @param {Number} timeout service timeout
   * @param {String} address consumer Address
   * @return {Promise<string>} string
   */
  getPreviousValidOrders(
    dataTokenAddress: string,
    amount: string,
    serviceId: number,
    timeout: number,
    address: string
  ): Promise<string>
  getStartOrderEventSignature(): string
  /**
   * Purpose a new minter
   * @param {String} dataTokenAddress
   * @param {String} newMinter
   * @param {String} address - only current minter can call this
   * @return {Promise<string>} transactionId
   */
  proposeMinter(
    dataTokenAddress: string,
    newMinterAddress: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Approve minter role
   * @param {String} dataTokenAddress
   * @param {String} address - only proposad minter can call this
   * @return {Promise<string>} transactionId
   */
  approveMinter(
    dataTokenAddress: string,
    address: string
  ): Promise<TransactionReceipt>
  /** Check if an address has the minter role
   * @param {String} dataTokenAddress
   * * @param {String} address
   * @return {Promise<string>} string
   */
  isMinter(dataTokenAddress: string, address: string): Promise<boolean>
}
