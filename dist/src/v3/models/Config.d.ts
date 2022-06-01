import { LogLevel } from '../utils/Logger'
import { AbiItem } from 'web3-utils/types'
export declare class Config {
  /**
   * Ethereum node URL.
   * @type {string}
   */
  nodeUri?: string
  /**
   * Address of Provider.
   * @type {string}
   */
  providerAddress?: string
  /**
   * Metadata Store URL.
   * @type {string}
   */
  metadataCacheUri?: string
  /**
   * Provider URL.
   * @type {string}
   */
  providerUri?: string
  /**
   * Role-based access control URL.
   * @type {string}
   */
  rbacUri?: string
  /**
   * Web3 Provider.
   * @type {any}
   */
  web3Provider?: any
  /**
   * Ocean Token address
   * @type {string}
   */
  oceanTokenAddress?: string
  /**
   * Factory address
   * @type {string}
   */
  factoryAddress?: string
  /**
   * Factory ABI
   * @type {string}
   */
  factoryABI?: AbiItem | AbiItem[]
  /**
   * datatokens ABI
   * @type {string}
   */
  datatokensABI?: AbiItem | AbiItem[]
  /**
   * Pool Factory address
   * @type {string}
   */
  poolFactoryAddress?: string
  /**
   * Pool Factory ABI
   * @type {string}
   */
  poolFactoryABI?: AbiItem | AbiItem[]
  /**
   * Pool ABI
   * @type {string}
   */
  poolABI?: AbiItem | AbiItem[]
  /**
   * FixedRateExchangeAddress
   * @type {string}
   */
  fixedRateExchangeAddress?: string
  /**
   * FixedRateExchangeAddressABI
   * @type {any}
   */
  fixedRateExchangeAddressABI?: AbiItem | AbiItem[]
  /**
   * DispenserAddress
   * @type {string}
   */
  dispenserAddress?: string
  /**
   * DispenserABI
   * @type {any}
   */
  dispenserABI?: AbiItem | AbiItem[]
  /**
   * DDOContractAddress
   * @type {string}
   */
  metadataContractAddress?: string
  /**
   * DDOContractABI
   * @type {any}
   */
  metadataContractABI?: AbiItem | AbiItem[]
  /**
   * block number of the deployment
   * @type {number}
   */
  startBlock?: number
  /**
   * Log level.
   * @type {boolean | LogLevel}
   */
  verbose?: boolean | LogLevel
  /**
   * Message shown when the user creates its own token.
   * @type {string}
   */
  authMessage?: string
  /**
   * Token expiration time in ms.
   * @type {number}
   */
  authTokenExpiration?: number
  parityUri?: string
  threshold?: number
  /**
   * HTTP request timeout
   * @type {number}
   */
  requestTimeout?: number
}
export default Config
