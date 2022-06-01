import Web3 from 'web3'
import { LoggerInstance, getData } from './utils'
import {
  FileMetadata,
  ComputeJob,
  ComputeOutput,
  ComputeAlgorithm,
  ComputeAsset,
  ComputeEnvironment,
  ProviderInitialize
} from '../@types'
import { noZeroX } from './utils/ConversionTypeHelper'
import { signText, signWithHash } from './utils/SignatureUtils'
import fetch from 'cross-fetch'
import { DownloadResponse } from '../@types/DownloadResponse'
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

export class Provider {
  /**
   * Returns the provider endpoints
   * @return {Promise<ServiceEndpoint[]>}
   */
  async getEndpoints(providerUri: string): Promise<any> {
    try {
      const endpoints = await getData(providerUri)
      return await endpoints.json()
    } catch (e) {
      LoggerInstance.error('Finding the service endpoints failed:', e)
      return null
    }
  }

  getEndpointURL(
    servicesEndpoints: ServiceEndpoint[],
    serviceName: string
  ): ServiceEndpoint {
    if (!servicesEndpoints) return null
    return servicesEndpoints.find(
      (s) => s.serviceName === serviceName
    ) as ServiceEndpoint
  }

  /**
   * Returns the service endpoints that exist in provider.
   * @param {any} endpoints
   * @return {Promise<ServiceEndpoint[]>}
   */
  public async getServiceEndpoints(providerEndpoint: string, endpoints: any) {
    const serviceEndpoints: ServiceEndpoint[] = []
    for (const i in endpoints.serviceEndpoints) {
      const endpoint: ServiceEndpoint = {
        serviceName: i,
        method: endpoints.serviceEndpoints[i][0],
        urlPath: providerEndpoint + endpoints.serviceEndpoints[i][1]
      }
      serviceEndpoints.push(endpoint)
    }
    return serviceEndpoints
  }

  /** Encrypt DDO using the Provider's own symmetric key
   * @param {string} providerUri provider uri address
   * @param {string} consumerAddress Publisher address
   * @param {AbortSignal} signal abort signal
   * @param {string} providerEndpoints Identifier of the asset to be registered in ocean
   * @param {string} serviceEndpoints document description object (DDO)=
   * @return {Promise<string>} urlDetails
   */
  public async getNonce(
    providerUri: string,
    consumerAddress: string,
    signal?: AbortSignal,
    providerEndpoints?: any,
    serviceEndpoints?: ServiceEndpoint[]
  ): Promise<string> {
    if (!providerEndpoints) {
      providerEndpoints = await this.getEndpoints(providerUri)
    }
    if (!serviceEndpoints) {
      serviceEndpoints = await this.getServiceEndpoints(
        providerUri,
        providerEndpoints
      )
    }
    const path = this.getEndpointURL(serviceEndpoints, 'nonce')
      ? this.getEndpointURL(serviceEndpoints, 'nonce').urlPath
      : null
    if (!path) return null
    try {
      const response = await fetch(path + `?userAddress=${consumerAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: signal
      })
      return String((await response.json()).nonce)
    } catch (e) {
      LoggerInstance.error(e)
      throw new Error('HTTP request failed')
    }
  }

  /** Encrypt data using the Provider's own symmetric key
   * @param {string} data data in json format that needs to be sent , it can either be a DDO or a File array
   * @param {string} providerUri provider uri address
   * @param {AbortSignal} signal abort signal
   * @return {Promise<string>} urlDetails
   */
  public async encrypt(
    data: any,
    providerUri: string,
    signal?: AbortSignal
  ): Promise<string> {
    const providerEndpoints = await this.getEndpoints(providerUri)
    const serviceEndpoints = await this.getServiceEndpoints(
      providerUri,
      providerEndpoints
    )
    const path = this.getEndpointURL(serviceEndpoints, 'encrypt')
      ? this.getEndpointURL(serviceEndpoints, 'encrypt').urlPath
      : null
    if (!path) return null
    try {
      const response = await fetch(path, {
        method: 'POST',
        body: decodeURI(JSON.stringify(data)),
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        signal: signal
      })
      return await response.text()
    } catch (e) {
      LoggerInstance.error(e)
      throw new Error('HTTP request failed')
    }
  }
}

export const V4ProviderInstance = new Provider()
export default V4ProviderInstance
