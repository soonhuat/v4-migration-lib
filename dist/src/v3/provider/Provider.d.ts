import Account from '../ocean/Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { DDO } from '../ddo/DDO'
export interface ServiceEndpoint {
  serviceName: string
  method: string
  urlPath: string
}
export interface ComputeLimits {
  algoTimeLimit?: string
  storageExpiry?: string
}
export interface UserCustomParameters {
  [key: string]: any
}
/**
 * Provides an interface for provider service.
 * Provider service is the technical component executed
 * by the Publishers allowing to them to provide extended
 * data services.
 */
export declare class Provider extends Instantiable {
  nonce: string
  private baseUrl
  servicesEndpoints: ServiceEndpoint[]
  computeAddress: string
  providerAddress: string
  providerVersion: string
  computeLimits: ComputeLimits
  /**
   * Returns the instance of Provider.
   * @return {Promise<Assets>}
   */
  static getInstance(config: InstantiableConfig): Promise<Provider>
  setBaseUrl(url: string): Promise<boolean>
  get url(): string
  /**
   * Returns the service endpoints that exist
   * in provider.
   * @return {Promise<ServiceEndpoint[]>}
   */
  getServiceEndpoints(): Promise<ServiceEndpoint[]>
  getEndpointURL(serviceName: string): ServiceEndpoint
  createSignature(account: Account, agreementId: string): Promise<string>
  encrypt(did: string, document: any, account: Account): Promise<string>
  /** Get nonce from provider
   * @param {String} consumerAddress
   * @return {Promise<string>} string
   */
  getNonce(consumerAddress: string): Promise<string>
  initialize(
    asset: DDO | string,
    serviceIndex: number,
    serviceType: string,
    consumerAddress: string,
    userCustomParameters?: UserCustomParameters
  ): Promise<string>
  getInitializeEndpoint(): ServiceEndpoint
  getNonceEndpoint(): ServiceEndpoint
  getEncryptEndpoint(): ServiceEndpoint
  getFileinfoEndpoint(): ServiceEndpoint
  getComputeStartEndpoint(): ServiceEndpoint
  getComputeStopEndpoint(): ServiceEndpoint
  getComputeStatusEndpoint(): ServiceEndpoint
  getComputeDeleteEndpoint(): ServiceEndpoint
  getComputeResultEndpoint(): ServiceEndpoint
  getDownloadEndpoint(): ServiceEndpoint
  /** Check for a valid provider at URL
   * @param {String} url
   * @return {Promise<boolean>} string
   */
  isValidProvider(url: string): Promise<boolean>
  getAssetURL(account: any, did: string, serviceId: number): Promise<any>
}
