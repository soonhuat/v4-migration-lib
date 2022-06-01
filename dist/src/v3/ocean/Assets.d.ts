import { DDO } from '../ddo/DDO'
import { Metadata } from '../ddo/interfaces/Metadata'
import {
  Service,
  ServiceAccess,
  ServiceCustomParameter,
  ServiceCustomParametersRequired
} from '../ddo/interfaces/Service'
import { SearchQuery } from '../metadatacache/MetadataCache'
import { EditableMetadata } from '../ddo/interfaces/EditableMetadata'
import Account from './Account'
import { SubscribablePromise } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { UserCustomParameters } from '../provider/Provider'
import { TransactionReceipt } from 'web3-core'
import { Consumable } from '../ddo/interfaces/Consumable'
export declare enum CreateProgressStep {
  CreatingDataToken = 0,
  DataTokenCreated = 1,
  EncryptingFiles = 2,
  FilesEncrypted = 3,
  StoringDdo = 4,
  DdoStored = 5
}
export declare enum OrderProgressStep {
  TransferDataToken = 0
}
export interface Order {
  dtAddress: string
  amount: string
  timestamp: number
  transactionHash: string
  consumer: string
  payer: string
  did?: string
  serviceId?: number
  serviceType?: string
}
/**
 * Assets submodule of Ocean Protocol.
 */
export declare class Assets extends Instantiable {
  /**
   * Returns the instance of Assets.
   * @return {Promise<Assets>}
   */
  static getInstance(config: InstantiableConfig): Promise<Assets>
  /**
   * Creates a new DDO. After this, Call ocean.onChainMetadata.to publish
   * @param  {Metadata} metadata DDO metadata.
   * @param  {Account}  publisher Publisher account.
   * @param  {list} services list of Service description documents
   * @param {String} dtAddress existing Data Token Address
   * @param {String} cap Maximum cap (Number) - will be converted to wei
   * @param {String} name Token name
   * @param {String} symbol Token symbol
   * @param {String} providerUri
   * @return {SubscribablePromise<CreateProgressStep, DDO>}
   */
  create(
    metadata: Metadata,
    publisher: Account,
    services?: Service[],
    dtAddress?: string,
    cap?: string,
    name?: string,
    symbol?: string,
    providerUri?: string
  ): SubscribablePromise<CreateProgressStep, DDO>
  /**
   * Returns a DDO by DID.
   * @param  {string} did Decentralized ID.
   * @return {Promise<DDO>}
   */
  resolve(did: string): Promise<DDO>
  /**    Metadata updates
   *  Don't forget to call ocean.OnChainmetadataCache.update after using this functions
   * ie:  ocean.OnChainmetadataCache.update(ddo.id,ddo,account.getId())
   */
  /**
   * Edit Metadata for a DID.
   * @param  {ddo} DDO
   * @param  {newMetadata}  EditableMetadata Metadata fields & new values.
   * @return {Promise<DDO>} the new DDO
   */
  editMetadata(ddo: DDO, newMetadata: EditableMetadata): Promise<DDO>
  /**
   * Update Credentials attribute in DDO
   * @param  {ddo} DDO
   * @param {credentialType} string e.g. address / credentail3Box
   * @param {allowList} string[] List of allow credential
   * @param {denyList} string[] List of deny credential
   * @return {Promise<DDO>} Updated DDO
   */
  updateCredentials(
    ddo: DDO,
    credentialType: string,
    allowList: string[],
    denyList: string[]
  ): Promise<DDO>
  /**
   * check if a credential can consume a dataset
   * @param  {ddo} DDO
   * @param {credentialType} string e.g. address / credentail3Box
   * @param {value} string credential
   * @return {Consumable} allowed  0 = OK , 2 - Credential not in allow list, 3 - Credential in deny list
   */
  checkCredential(ddo: DDO, credentialType: string, value: string): Consumable
  /**
   * Publish DDO on chain.
   * @param  {ddo} DDO
   * @param {String} consumerAccount
   * @param {boolean} encrypt
   * @return {Promise<TransactionReceipt>} transaction
   */
  publishDdo(
    ddo: DDO,
    consumerAccount: string,
    encrypt?: boolean
  ): Promise<TransactionReceipt>
  /**
   * Update Metadata on chain.
   * @param  {ddo} DDO
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} transaction
   */
  updateMetadata(ddo: DDO, consumerAccount: string): Promise<TransactionReceipt>
  /**
   * Edit Service Timeouts
   * @param  {ddo} DDO if empty, will trigger a retrieve
   * @param  {number} serviceIndex Index of the compute service in the DDO.
   * @param  {number} timeout New timeout setting
   * @return {Promise<DDO>}
   */
  editServiceTimeout(
    ddo: DDO,
    serviceIndex: number,
    timeout: number
  ): Promise<DDO>
  /**    End metadata updates   */
  /**
   * Returns the creator of a asset.
   * @param  {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @return {Promise<string>} Returns eth address
   */
  creator(asset: DDO | string): Promise<string>
  getServiceByType(asset: DDO | string, serviceType: string): Promise<Service>
  getServiceByIndex(asset: DDO | string, serviceIndex: number): Promise<Service>
  /**
   * Search over the assets using a query.
   * @param  {SearchQuery} query Query to filter the assets.
   * @return {Promise<QueryResult>}
   */
  query(query: SearchQuery): Promise<any>
  /**
   * Creates an access service
   * @param {Account} creator
   * @param {String} cost  number of datatokens needed for this service
   * @param {String} datePublished
   * @param {Number} timeout
   * @param {String} providerUri
   * @param {ServiceCustomParametersRequired} requiredParameters
   * @return {Promise<ServiceAccess>} service
   */
  createAccessServiceAttributes(
    creator: Account,
    cost: string,
    datePublished: string,
    timeout?: number,
    providerUri?: string,
    requiredParameters?: ServiceCustomParametersRequired
  ): Promise<ServiceAccess>
  /**
   * Initialize a service
   * Can be used to compute totalCost for ordering a service
   * @param {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} consumerAddress
   * @param {Number} serviceIndex
   * @param {String} serviceEndpoint
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<any>} Order details
   */
  initialize(
    asset: DDO | string,
    serviceType: string,
    consumerAddress: string,
    serviceIndex: number,
    serviceEndpoint: string,
    userCustomParameters?: UserCustomParameters
  ): Promise<any>
  /**
   * Orders & pays for a service
   * @param {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} payerAddress
   * @param {Number} serviceIndex
   * @param {String} mpAddress Marketplace fee collector address
   * @param {String} consumerAddress Optionally, if the consumer is another address than payer
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<String>} transactionHash of the payment
   */
  order(
    asset: DDO | string,
    serviceType: string,
    payerAddress: string,
    serviceIndex?: number,
    mpAddress?: string,
    consumerAddress?: string,
    userCustomParameters?: UserCustomParameters,
    authService?: string,
    searchPreviousOrders?: boolean
  ): Promise<string>
  /**
   * get Order History
   * @param {Account} account
   * @param {string} serviceType Optional, filter by
   * @param {number} fromBlock Optional, start at block
   * @return {Promise<OrderHistory[]>} transactionHash of the payment
   */
  getOrderHistory(
    account: Account,
    serviceType?: string,
    fromBlock?: number
  ): Promise<Order[]>
  /**
   *
   * @param {DDO} ddo
   * @param {consumer} string
   * @return {Promise<Consumable>}
   */
  isConsumable(
    ddo: DDO,
    consumer?: string,
    credentialsType?: string,
    authService?: string
  ): Promise<Consumable>
  /**
   * Validate custom user parameters (user & algorithms)
   * @param {ServiceCustomParameter[]} serviceCustomParameters
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<Boolean>}
   */
  isUserCustomParametersValid(
    serviceCustomParameters: ServiceCustomParameter[],
    userCustomParameters?: UserCustomParameters
  ): Promise<boolean>
}
