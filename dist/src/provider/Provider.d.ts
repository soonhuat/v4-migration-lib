import Web3 from 'web3'
import {
  FileMetadata,
  ComputeJob,
  ComputeOutput,
  ComputeAlgorithm,
  ComputeAsset,
  ComputeEnvironment,
  ProviderInitialize
} from '../@types'
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
export declare class Provider {
  getEndpoints(providerUri: string): Promise<any>
  getEndpointURL(
    servicesEndpoints: ServiceEndpoint[],
    serviceName: string
  ): ServiceEndpoint
  getServiceEndpoints(
    providerEndpoint: string,
    endpoints: any
  ): Promise<ServiceEndpoint[]>
  getNonce(
    providerUri: string,
    consumerAddress: string,
    signal?: AbortSignal,
    providerEndpoints?: any,
    serviceEndpoints?: ServiceEndpoint[]
  ): Promise<string>
  createSignature(
    web3: Web3,
    accountId: string,
    agreementId: string
  ): Promise<string>
  createHashSignature(
    web3: Web3,
    accountId: string,
    message: string
  ): Promise<string>
  encrypt(data: any, providerUri: string, signal?: AbortSignal): Promise<string>
  checkDidFiles(
    did: string,
    serviceId: number,
    providerUri: string,
    signal?: AbortSignal
  ): Promise<FileMetadata[]>
  checkFileUrl(
    url: string,
    providerUri: string,
    signal?: AbortSignal
  ): Promise<FileMetadata[]>
  getComputeEnvironments(
    providerUri: string,
    signal?: AbortSignal
  ): Promise<ComputeEnvironment[]>
  initialize(
    did: string,
    serviceId: string,
    fileIndex: number,
    consumerAddress: string,
    providerUri: string,
    signal?: AbortSignal,
    userCustomParameters?: UserCustomParameters,
    computeEnv?: string,
    validUntil?: number
  ): Promise<ProviderInitialize>
  getDownloadUrl(
    did: string,
    accountId: string,
    serviceId: string,
    fileIndex: number,
    transferTxId: string,
    providerUri: string,
    web3: Web3,
    userCustomParameters?: UserCustomParameters
  ): Promise<any>
  computeStart(
    providerUri: string,
    web3: Web3,
    consumerAddress: string,
    computeEnv: string,
    dataset: ComputeAsset,
    algorithm: ComputeAlgorithm,
    signal?: AbortSignal,
    additionalDatasets?: ComputeAsset[],
    output?: ComputeOutput
  ): Promise<ComputeJob | ComputeJob[]>
  computeStop(
    did: string,
    consumerAddress: string,
    jobId: string,
    providerUri: string,
    web3: Web3,
    signal?: AbortSignal
  ): Promise<ComputeJob | ComputeJob[]>
  computeStatus(
    providerUri: string,
    signal?: AbortSignal,
    jobId?: string,
    did?: string,
    consumerAddress?: string
  ): Promise<ComputeJob | ComputeJob[]>
  computeResult(
    jobId: string,
    index: number,
    accountId: string,
    providerUri: string,
    web3: Web3,
    signal?: AbortSignal
  ): Promise<DownloadResponse | void>
  computeDelete(
    did: string,
    consumerAddress: string,
    jobId: string,
    providerUri: string,
    web3: Web3,
    signal?: AbortSignal
  ): Promise<ComputeJob | ComputeJob[]>
  isValidProvider(url: string, signal?: AbortSignal): Promise<boolean>
}
export declare const V4ProviderInstance: Provider
export default V4ProviderInstance
