import { DDO } from '../ddo/DDO'
import { TransactionReceipt } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils/types'
import Web3 from 'web3'
import { Logger } from '../utils'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
import { MetadataCache } from '../metadatacache/MetadataCache'
export interface rawMetadata {
  flags: number
  data: any
}
/**
 * Provides an interface with Metadata Cache.
 * Metadata Cache provides an off-chain database store for metadata about data assets.
 */
export declare class OnChainMetadata {
  GASLIMIT_DEFAULT: number
  DDOContractAddress: string
  DDOContractABI: AbiItem | AbiItem[]
  web3: Web3
  DDOContract: Contract
  private logger
  metadataCache: MetadataCache
  private config
  /**
   * Instantiate OnChainMetadata Store for on-chain interaction.
   */
  constructor(
    web3: Web3,
    logger: Logger,
    DDOContractAddress: string,
    DDOContractABI: AbiItem | AbiItem[],
    metadataCache: MetadataCache,
    config?: ConfigHelperConfig
  )
  /**
   * Compress DDO using xz/lzma2
   */
  compressDDO(data: any): Promise<string>
  /**
   * Publish a new DDO
   * @param {String} did
   * @param {DDO} ddo
   * @param {String} consumerAccount
   * @param {Boolean} encrypt If the DDO should be encrypted
   * @param {Boolean} validate If the DDO should be validated against Aqua prior to publish
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  publish(
    did: string,
    ddo: DDO,
    consumerAccount: string,
    encrypt?: boolean,
    validate?: boolean
  ): Promise<TransactionReceipt>
  /**
   * Update DDO
   * @param {String} did
   * @param {DDO} ddo
   * @param {String} consumerAccount
   * @param {Boolean} encrypt If the DDO should be encrypted
   * @param {Boolean} validate If the DDO should be validated against Aqua prior to publish
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  update(
    did: string,
    ddo: DDO,
    consumerAccount: string,
    encrypt?: boolean,
    validate?: boolean
  ): Promise<TransactionReceipt>
  /**
   * Prepare onchain data
   * @param {Any} ddo
   * @param {Boolean} encrypt Should encrypt the ddo
   * @return {Promise<rawMetadata>} Raw metadata bytes
   */
  prepareRawData(ddo: DDO, encrypt?: boolean): Promise<rawMetadata>
  /**
   * Raw publish ddo
   * @param {String} did
   * @param {Any} flags
   * @param {Any} ddo
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  publishRaw(
    did: string,
    flags: any,
    data: any,
    consumerAccount: string
  ): Promise<TransactionReceipt>
  /**
   * Raw update of a ddo
   * @param {String} did
   * @param {Any} flags
   * @param {Any} ddo
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  updateRaw(
    did: string,
    flags: any,
    data: any,
    consumerAccount: string
  ): Promise<TransactionReceipt>
  /**
   * Transfer Ownership of a DDO
   * @param {String} did
   * @param {String} newOwner
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} exchangeId
   */
  transferOwnership(
    did: string,
    newOwner: string,
    consumerAccount: string
  ): Promise<TransactionReceipt>
  getHex(message: any): string
}
