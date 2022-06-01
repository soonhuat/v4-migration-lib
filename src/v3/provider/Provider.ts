import Account from '../ocean/Account'
import { noZeroX, assetResolve } from '../utils'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
import { File } from '../ddo/interfaces/File'
import {
  ComputeJob,
  ComputeInput,
  ComputeOutput,
  ComputeAlgorithm
} from '../ocean/interfaces/Compute'
import { DDO } from '../ddo/DDO'
import DID from '../ocean/DID'
import { Service } from '../ddo/interfaces'
import fetch from 'cross-fetch'

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
export class Provider extends Instantiable {
  public nonce: string
  private baseUrl: string
  public servicesEndpoints: ServiceEndpoint[]
  public computeAddress: string
  public providerAddress: string
  public providerVersion: string
  public computeLimits: ComputeLimits
  /**
   * Returns the instance of Provider.
   * @return {Promise<Assets>}
   */
  public static async getInstance(
    config: InstantiableConfig
  ): Promise<Provider> {
    const instance = new Provider()
    instance.setInstanceConfig(config)
    instance.nonce = '0'
    await instance.setBaseUrl(config.config.providerUri)
    return instance
  }

  public async setBaseUrl(url: string): Promise<boolean> {
    this.baseUrl = url
    this.servicesEndpoints = await this.getServiceEndpoints()
    return true
  }

  public get url(): string {
    return this.baseUrl
  }

  /**
   * Returns the service endpoints that exist
   * in provider.
   * @return {Promise<ServiceEndpoint[]>}
   */

  public async getServiceEndpoints(): Promise<ServiceEndpoint[]> {
    const serviceEndpoints: ServiceEndpoint[] = []
    try {
      const result = await (await this.ocean.utils.fetch.get(this.url)).json()
      this.providerAddress = result.providerAddress
      if ('computeAddress' in result)
        this.computeAddress = result.computeAddress
      if ('version' in result) this.providerVersion = result.version
      if ('computeLimits' in result) this.computeLimits = result.computeLimits
      for (const i in result.serviceEndpoints) {
        const endpoint: ServiceEndpoint = {
          serviceName: i,
          method: result.serviceEndpoints[i][0],
          urlPath: this.url + result.serviceEndpoints[i][1]
        }
        serviceEndpoints.push(endpoint)
      }
      return serviceEndpoints
    } catch (e) {
      this.logger.error('Finding the service endpoints failed:', e)

      return null
    }
  }

  public getEndpointURL(serviceName: string): ServiceEndpoint {
    if (!this.servicesEndpoints) return null
    return this.servicesEndpoints.find(
      (s) => s.serviceName === serviceName
    ) as ServiceEndpoint
  }

  public async createSignature(
    account: Account,
    agreementId: string
  ): Promise<string> {
    const signature = await this.ocean.utils.signature.signText(
      noZeroX(agreementId),
      account.getId()
    )

    return signature
  }

  public async encrypt(
    did: string,
    document: any,
    account: Account
  ): Promise<string> {
    await this.getNonce(account.getId())
    const args = {
      documentId: did,
      document: JSON.stringify(document),
      publisherAddress: account.getId()
    }
    const path = this.getEncryptEndpoint()
      ? this.getEncryptEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.post(
        path,
        decodeURI(JSON.stringify(args))
      )
      return (await response.json()).encryptedDocument
    } catch (e) {
      this.logger.error(e)
      throw new Error('HTTP request failed')
    }
  }

  /** Get nonce from provider
   * @param {String} consumerAddress
   * @return {Promise<string>} string
   */
  public async getNonce(consumerAddress: string): Promise<string> {
    const path = this.getNonceEndpoint()
      ? this.getNonceEndpoint().urlPath
      : null
    if (!path) return null
    try {
      const response = await this.ocean.utils.fetch.get(
        path + `?userAddress=${consumerAddress}`
      )
      this.nonce = String((await response.json()).nonce)
      return this.nonce
    } catch (e) {
      this.logger.error(e)
      throw new Error('HTTP request failed')
    }
  }

  public async initialize(
    asset: DDO | string,
    serviceIndex: number,
    serviceType: string,
    consumerAddress: string,
    userCustomParameters?: UserCustomParameters
  ): Promise<string> {
    const { did, ddo } = await assetResolve(asset, this.ocean)
    let initializeUrl = this.getInitializeEndpoint()
      ? this.getInitializeEndpoint().urlPath
      : null
    if (!initializeUrl) return null
    initializeUrl += `?documentId=${did}`
    initializeUrl += `&serviceId=${serviceIndex}`
    initializeUrl += `&serviceType=${serviceType}`
    initializeUrl += `&dataToken=${ddo.dataToken}`
    initializeUrl += `&consumerAddress=${consumerAddress}`
    if (userCustomParameters)
      initializeUrl +=
        '&userdata=' + encodeURI(JSON.stringify(userCustomParameters))
    try {
      const response = await this.ocean.utils.fetch.get(initializeUrl)
      return await response.text()
    } catch (e) {
      this.logger.error(e)
      throw new Error('Asset URL not found or not available.')
    }
  }

  public getInitializeEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('initialize')
  }

  public getNonceEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('nonce')
  }

  public getEncryptEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('encrypt')
  }

  public getFileinfoEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('fileinfo')
  }

  public getComputeStartEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('computeStart')
  }

  public getComputeStopEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('computeStop')
  }

  public getComputeStatusEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('computeStatus')
  }

  public getComputeDeleteEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('computeDelete')
  }

  public getComputeResultEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('computeResult')
  }

  public getDownloadEndpoint(): ServiceEndpoint {
    return this.getEndpointURL('download')
  }

  /** Check for a valid provider at URL
   * @param {String} url
   * @return {Promise<boolean>} string
   */
  public async isValidProvider(url: string): Promise<boolean> {
    try {
      const response = await this.ocean.utils.fetch.get(url)
      if (response?.ok) {
        const params = await response.json()
        if (params && params.providerAddress) return true
      }
      return false
    } catch (error) {
      this.logger.error(`Error validating provider: ${error.message}`)
      return false
    }
  }

  public async getAssetURL(account, did: string, serviceId: number) {
    // const provider = await ProviderInstance
    const accountId = account.getId()
    const nonce = await this.getNonce(accountId)
    let signature
    try {
      signature = await this.createSignature(account, did + nonce)
    } catch (error) {
      console.log('error', error)
    }
    let path = this.getEndpointURL('assetUrls')
      ? this.getEndpointURL('encrypt').urlPath
      : null

    if (path === null) path = 'http://localhost:8030/api/v1/services/assetUrls'
    let initializeUrl = path
    initializeUrl += `?documentId=${did}`
    initializeUrl += `&signature=${signature}`
    initializeUrl += `&serviceId=${serviceId}`
    initializeUrl += `&nonce=${nonce}`
    initializeUrl += `&publisherAddress=${accountId}`
    try {
      const response = await fetch(initializeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseURL = JSON.parse(await response.text())[0]
      return responseURL
    } catch (e) {
      console.error(e)
      throw new Error('HTTP request failed')
    }
  }
}
