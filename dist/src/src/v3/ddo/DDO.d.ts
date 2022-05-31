import { Ocean } from '../ocean/Ocean'
import { Authentication } from './interfaces/Authentication'
import { Proof } from './interfaces/Proof'
import { PublicKey } from './interfaces/PublicKey'
import { Service, ServiceType } from './interfaces/Service'
import { BestPrice } from './interfaces/BestPrice'
import { DataTokenInfo } from './interfaces/DataTokenInfo'
import { PurgatoryData } from './interfaces/PurgatoryData'
import { Credentials } from './interfaces/Credentials'
import { Event } from './interfaces/Event'
export declare class DDO {
  static serialize(ddo: DDO): string
  static deserialize(ddoString: string): DDO
  '@context': string
  id: string
  created: string
  updated: string
  dataToken: string
  publicKey: PublicKey[]
  authentication: Authentication[]
  service: Service[]
  proof: Proof
  price: BestPrice
  isInPurgatory: 'false' | 'true'
  purgatoryData?: PurgatoryData
  dataTokenInfo?: DataTokenInfo
  credentials?: Credentials
  chainId?: number
  event?: Event
  constructor(ddo?: Partial<DDO>)
  shortId(): string
  findServiceById<T extends ServiceType>(index: number): Service<T>
  findServiceByType<T extends ServiceType>(serviceType: T): Service<T>
  getChecksum(): string
  addProof(ocean: Ocean, publicKey: string, password?: string): Promise<void>
}
