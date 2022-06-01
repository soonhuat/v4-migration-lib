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
/**
 * DID Descriptor Object.
 * Contains all the data related to an asset.
 */
export declare class DDO {
  /**
   * Serializes the DDO object.
   * @param  {DDO} DDO to be serialized.
   * @return {string} DDO serialized.
   */
  static serialize(ddo: DDO): string
  /**
   * Deserializes the DDO object.
   * @param  {DDO} DDO to be deserialized.
   * @return {string} DDO deserialized.
   */
  static deserialize(ddoString: string): DDO
  '@context': string
  /**
   * DID, descentralized ID.
   * @type {string}
   */
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
  /**
   * Finds a service of a DDO by index.
   * @param  {number} Service index.
   * @return {Service} Service.
   */
  findServiceById<T extends ServiceType>(index: number): Service<T>
  /**
   * Finds a service of a DDO by type.
   * @param  {string} serviceType Service type.
   * @return {Service} Service.
   */
  findServiceByType<T extends ServiceType>(serviceType: T): Service<T>
  /**
   * Generate the checksum using the current content.
   * @return {string[]} DDO checksum.
   */
  getChecksum(): string
  /**
   * Generates and adds a simple hash proof on publicKey
   * @param  {Ocean}          ocean     Ocean instance.
   * @param  {string}         publicKey Public key to be used on personal sign.
   * @return {Promise<void>}
   */
  addProof(ocean: Ocean, publicKey: string, password?: string): Promise<void>
}
