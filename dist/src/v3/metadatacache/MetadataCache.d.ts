import { DDO } from '../ddo/DDO'
import DID from '../ocean/DID'
import { Logger } from '../utils'
import { WebServiceConnector } from '../ocean/utils/WebServiceConnector'
import { Metadata, ValidateMetadata } from '../ddo/interfaces'
export interface SearchQuery {
  from?: number
  size?: number
  query: {
    match?: {
      [property: string]:
        | string
        | number
        | boolean
        | Record<string, string | number | boolean>
    }
    query_string?: {
      [property: string]: string | number | string[] | number[] | boolean
    }
    simple_query_string?: {
      [property: string]: string | number | string[] | number[] | boolean
    }
  }
  sort?: {
    [jsonPath: string]: string
  }
}
/**
 * Provides an interface with Metadata Cache.
 * Metadata Cache provides an off-chain database cache for on-chain metadata about data assets.
 */
export declare class MetadataCache {
  fetch: WebServiceConnector
  private logger
  private metadataCacheUri
  private get url()
  /**
   * Instantiate Metadata Cache (independently of Ocean) for off-chain interaction.
   * @param {String} metadataCacheUri
   * @param {Logger} logger
   */
  constructor(metadataCacheUri: string, logger: Logger, requestTimeout?: number)
  getVersionInfo(): Promise<any>
  getAccessUrl(accessToken: any, payload: any): Promise<string>
  /**
   * Search over the DDOs using a query.
   * @param  {SearchQuery} query Query to filter the DDOs.
   * @return {Promise<QueryResult>}
   */
  queryMetadata(query: SearchQuery): Promise<any>
  /**
   * Encrypts a DDO
   * @param  {any} ddo bytes to be encrypted.
   * @return {Promise<String>} Hex encoded encrypted DDO.
   */
  encryptDDO(ddo: any): Promise<any>
  /**
   * Validate Metadata
   * @param  {Metadata} metadata  metadata to be validated. If it's a Metadata, it will be validated agains the local schema. Else, it's validated agains the remote schema
   * @return {Promise<Boolean|Object>}  Result.
   */
  validateMetadata(metadata: Metadata | DDO): Promise<ValidateMetadata>
  /**
   * Retrieves a DDO by DID.
   * @param  {DID | string} did DID of the asset.
   * @return {Promise<DDO>} DDO of the asset.
   */
  retrieveDDO(did: DID | string, metadataServiceEndpoint?: string): Promise<DDO>
  retrieveDDOByUrl(metadataServiceEndpoint?: string): Promise<DDO>
  getServiceEndpoint(did: DID): string
  getURI(): string
  /**
   * Simple blocking sleep function
   */
  sleep(ms: number): Promise<unknown>
  /**
   * Blocks until Aqua will cache the did (or the update for that did) or timeouts
   * @param  {string} did DID of the asset.
   * @param  {string} txid used when the did exists and we expect an update with that txid.
   * @return {Promise<DDO>} DDO of the asset.
   */
  waitForAqua(did: string, txid?: string): Promise<void>
}
