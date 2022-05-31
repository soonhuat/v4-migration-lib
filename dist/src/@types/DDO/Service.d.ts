export interface PublisherTrustedAlgorithm {
  did: string
  filesChecksum: string
  containerSectionChecksum: string
}
export interface ServiceComputeOptions {
  namespace: string
  cpu?: number
  gpu?: number
  gpuType?: string
  memory?: string
  volumeSize?: string
  allowRawAlgorithm: boolean
  allowNetworkAccess: boolean
  publisherTrustedAlgorithmPublishers: string[]
  publisherTrustedAlgorithms: PublisherTrustedAlgorithm[]
}
export interface Service {
  id: string
  type: 'access' | 'compute' | string
  files: string
  datatokenAddress: string
  serviceEndpoint: string
  timeout: number
  name?: string
  description?: string
  compute?: ServiceComputeOptions
  additionalInformation?: any
}
