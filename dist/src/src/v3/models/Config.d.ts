import { LogLevel } from '../utils/Logger'
import { AbiItem } from 'web3-utils/types'
export declare class Config {
  nodeUri?: string
  providerAddress?: string
  metadataCacheUri?: string
  providerUri?: string
  rbacUri?: string
  web3Provider?: any
  oceanTokenAddress?: string
  factoryAddress?: string
  factoryABI?: AbiItem | AbiItem[]
  datatokensABI?: AbiItem | AbiItem[]
  poolFactoryAddress?: string
  poolFactoryABI?: AbiItem | AbiItem[]
  poolABI?: AbiItem | AbiItem[]
  fixedRateExchangeAddress?: string
  fixedRateExchangeAddressABI?: AbiItem | AbiItem[]
  dispenserAddress?: string
  dispenserABI?: AbiItem | AbiItem[]
  metadataContractAddress?: string
  metadataContractABI?: AbiItem | AbiItem[]
  startBlock?: number
  verbose?: boolean | LogLevel
  authMessage?: string
  authTokenExpiration?: number
  parityUri?: string
  threshold?: number
  requestTimeout?: number
}
export default Config
