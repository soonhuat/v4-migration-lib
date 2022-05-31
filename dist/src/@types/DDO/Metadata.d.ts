export interface MetadataAlgorithm {
  language?: string
  version?: string
  rawcode?: string
  container: {
    entrypoint: string
    image: string
    tag: string
    checksum: string
  }
}
export interface Metadata {
  created: string
  updated: string
  name: string
  description: string
  type: 'dataset' | 'algorithm'
  author: string
  license: string
  links?: string[]
  tags?: string[]
  categories?: string[]
  copyrightHolder?: string
  contentLanguage?: string
  algorithm?: MetadataAlgorithm
  additionalInformation?: any
}
export interface MetadataProof {
  validatorAddress?: string
  r?: string
  s?: string
  v?: number
}
export interface ValidateMetadata {
  valid: Boolean
  errors?: Object
  hash?: string
  proof?: MetadataProof
}
