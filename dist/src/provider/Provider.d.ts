export interface HttpCallback {
  (httpMethod: string, url: string, body: string, header: any): Promise<any>
}
export interface ServiceEndpoint {
  serviceName: string
  method: string
  urlPath: string
}
export interface UserCustomParameters {
  [key: string]: any
}
export declare class Provider {
  /**
   * Returns the provider endpoints
   * @return {Promise<ServiceEndpoint[]>}
   */
  getEndpoints(providerUri: string): Promise<any>
  getEndpointURL(
    servicesEndpoints: ServiceEndpoint[],
    serviceName: string
  ): ServiceEndpoint
  /**
   * Returns the service endpoints that exist in provider.
   * @param {any} endpoints
   * @return {Promise<ServiceEndpoint[]>}
   */
  getServiceEndpoints(
    providerEndpoint: string,
    endpoints: any
  ): Promise<ServiceEndpoint[]>
  /** Encrypt DDO using the Provider's own symmetric key
   * @param {string} providerUri provider uri address
   * @param {string} consumerAddress Publisher address
   * @param {AbortSignal} signal abort signal
   * @param {string} providerEndpoints Identifier of the asset to be registered in ocean
   * @param {string} serviceEndpoints document description object (DDO)=
   * @return {Promise<string>} urlDetails
   */
  getNonce(
    providerUri: string,
    consumerAddress: string,
    signal?: AbortSignal,
    providerEndpoints?: any,
    serviceEndpoints?: ServiceEndpoint[]
  ): Promise<string>
  /** Encrypt data using the Provider's own symmetric key
   * @param {string} data data in json format that needs to be sent , it can either be a DDO or a File array
   * @param {string} providerUri provider uri address
   * @param {AbortSignal} signal abort signal
   * @return {Promise<string>} urlDetails
   */
  encrypt(data: any, providerUri: string, signal?: AbortSignal): Promise<string>
}
export declare const V4ProviderInstance: Provider
export default V4ProviderInstance
