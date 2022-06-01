import { DDO } from '../ddo/DDO'
import {
  ServiceComputePrivacy,
  ServiceCompute,
  publisherTrustedAlgorithm,
  ServiceCustomParametersRequired
} from '../ddo/interfaces/Service'
import Account from './Account'
import { SubscribablePromise } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { ComputeAlgorithm } from './interfaces/Compute'
import { UserCustomParameters } from '../provider/Provider'
export declare enum OrderProgressStep {
  TransferDataToken = 0
}
export interface Cluster {
  type: string
  url: string
}
export interface Container {
  image: string
  tag: string
  checksum: string
}
export interface Server {
  serverId: string
  serverType: string
  cost: string
  cpu: string
  gpu: string
  memory: string
  disk: string
  maxExecutionTime: number
}
export declare const ComputeJobStatus: Readonly<{
  WarmingUp: number
  Started: number
  ConfiguringVolumes: number
  ProvisioningSuccess: number
  DataProvisioningFailed: number
  AlgorithmProvisioningFailed: number
  RunningAlgorithm: number
  FilteringResults: number
  PublishingResult: number
  Completed: number
  Stopped: number
  Deleted: number
}>
/**
 * Compute submodule of Ocean Protocol.
 */
export declare class Compute extends Instantiable {
  /**
   * Returns the instance of Compute.
   * @return {Promise<Assets>}
   */
  static getInstance(config: InstantiableConfig): Promise<Compute>
  /**
   * Gets the compute address for ordering compute assets
   * @param  {string} did Decentralized identifer of the primary asset (this will determine where compute happens)
   * @param  {number} serviceIndex If asset has multiple compute services
   * @return {Promise<String>} Returns compute address
   */
  getComputeAddress(did: string, serviceIndex?: number): Promise<string>
  createServerAttributes(
    serverId: string,
    serverType: string,
    cost: string,
    cpu: string,
    gpu: string,
    memory: string,
    disk: string,
    maxExecutionTime: number
  ): Server
  createContainerAttributes(
    image: string,
    tag: string,
    checksum: string
  ): Container
  createClusterAttributes(type: string, url: string): Cluster
  createProviderAttributes(
    type: string,
    description: string,
    cluster: Cluster,
    containers: Container[],
    servers: Server[]
  ): {
    type: string
    description: string
    environment: {
      cluster: Cluster
      supportedServers: Server[]
      supportedContainers: Container[]
    }
  }
  /**
   * Creates a compute service
   * @param {Account} consumerAccount
   * @param {String} cost  number of datatokens needed for this service, expressed in wei
   * @param {String} datePublished
   * @param {Object} providerAttributes
   * @param {Object} computePrivacy
   * @param {Number} timeout
   * @return {Promise<string>} service
   */
  createComputeService(
    consumerAccount: Account,
    cost: string,
    datePublished: string,
    providerAttributes: any,
    computePrivacy?: ServiceComputePrivacy,
    timeout?: number,
    providerUri?: string,
    requiredCustomParameters?: ServiceCustomParametersRequired
  ): ServiceCompute
  /**
   * Check the output object and add default properties if needed
   * @param  {Account} consumerAccount The account of the consumer ordering the service.
   * @param  {Output} output Output section used for publishing the result.
   * @return {Promise<Output>} Returns output object
   */
  private checkOutput
  /**
   * Checks if an asset is orderable with a specific algorithm
   * @param  {DDO|string} dataset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier of the asset (of type `dataset`) to run the algorithm on.
   * @param  {string} serviceIndex The Service index
   * @param  {ComputeAlgorithm} algorithm
   * @param  {DDO} algorithmDDO Algorithm DDO object. If undefined then the ddo will be fetched by did
   * @return {Promise<boolean>} True is you can order this
   *
   * Note:  algorithmDid and algorithmMeta are optional, but if they are not passed,
   * you can end up in the situation that you are ordering and paying for your compute job,
   * but provider will not allow the compute, due to privacy settings of the ddo
   */
  isOrderable(
    dataset: DDO | string,
    serviceIndex: number,
    algorithm: ComputeAlgorithm,
    algorithmDDO?: DDO
  ): Promise<boolean>
  /**
   * Starts an order of a compute or access service for a compute job
   * @param  {String} consumerAccount The account of the consumer ordering the service.
   * @param  {DDO|string} dataset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier of the asset (of type `dataset`) to run the algorithm on.
   * @param  {string} serviceIndex The Service index
   * @param  {string} algorithmDid The DID of the algorithm asset (of type `algorithm`) to run on the asset.
   * @param  {string} algorithmServiceIndex The index of the service in the algorithm
   * @param  {MetaData} algorithmMeta Metadata about the algorithm being run if `algorithm` is being used. This is ignored when `algorithmDid` is specified.
   * @return {SubscribablePromise<OrderProgressStep, string>} Returns the transaction details
   *
   * Note:  algorithmDid and algorithmMeta are optional, but if they are not passed,
   * you can end up in the situation that you are ordering and paying for your compute job,
   * but provider will not allow the compute, due to privacy settings of the ddo
   */
  orderAsset(
    consumerAccount: string,
    dataset: DDO | string,
    serviceIndex: number,
    algorithm: ComputeAlgorithm,
    mpAddress?: string,
    computeAddress?: string,
    userCustomParameters?: UserCustomParameters,
    authService?: string,
    searchPreviousOrders?: boolean
  ): SubscribablePromise<OrderProgressStep, string>
  /**
   * Orders & pays for a algorithm
   * @param  {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} payerAddress
   * @param {Number} serviceIndex
   * @param {String} mpAddress Marketplace fee collector address
   * @param {String} consumerAddress Optionally, if the consumer is another address than payer
   * @return {Promise<String>} transactionHash of the payment
   */
  orderAlgorithm(
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
   * Edit Compute Privacy
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {ServiceComputePrivacy} computePrivacy ComputePrivacy fields & new values.
   * @param  {Account} account Ethereum account of owner to sign and prove the ownership.
   * @return {Promise<DDO>}
   */
  editComputePrivacy(
    ddo: DDO,
    serviceIndex: number,
    computePrivacy: ServiceComputePrivacy
  ): Promise<DDO>
  /**
   * Toogle allowAllPublishedAlgorithms
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {boolean} newState
   * @return {Promise<DDDO>} Returns the new DDO
   */
  toggleAllowAllPublishedAlgorithms(
    ddo: DDO,
    serviceIndex: number,
    newState: boolean
  ): Promise<DDO>
  /**
   * Generates a publisherTrustedAlgorithm object from a algorithm did
   * @param  {did} string DID. You can leave this empty if you already have the DDO
   * @param  {ddo} DDO if empty, will trigger a retrieve
   * @return {Promise<publisherTrustedAlgorithm>}
   */
  createPublisherTrustedAlgorithmfromDID(
    did: string,
    ddo?: DDO
  ): Promise<publisherTrustedAlgorithm>
  /**
   * Adds a trusted algorithm to an asset
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {algoDid} string Algorithm DID to be added
   * @return {Promise<DDDO>} Returns the new DDO
   */
  addTrustedAlgorithmtoAsset(
    ddo: DDO,
    serviceIndex: number,
    algoDid: string
  ): Promise<DDO>
  /**
   * Check is an algo is trusted
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {algoDid} string Algorithm DID to be added
   * @return {Promise<DDDO>} Returns the new DDO
   */
  isAlgorithmTrusted(
    ddo: DDO,
    serviceIndex: number,
    algoDid: string
  ): Promise<boolean>
  /**
   * Removes a trusted algorithm from an asset
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {algoDid} string Algorithm DID to be removed
   * @return {Promise<DDDO>} Returns the new DDO
   */
  removeTrustedAlgorithmFromAsset(
    ddo: DDO,
    serviceIndex: number,
    algoDid: string
  ): Promise<DDO>
}
