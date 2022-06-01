import { Accounts } from './Accounts'
import { Assets } from './Assets'
import { Versions } from './Versions'
import { OceanUtils } from './utils/Utils'
import { MetadataCache } from '../metadatacache/MetadataCache'
import { OnChainMetadata } from '../metadatacache/OnChainMetaData'
import { Provider } from '../provider/Provider'
import { DataTokens } from '../datatokens/Datatokens'
import { Network } from '../datatokens/Network'
import { Config } from '../models/Config'
import { Instantiable } from '../Instantiable.abstract'
import { Compute } from './Compute'
import { OceanPool } from '../balancer/OceanPool'
import { OceanFixedRateExchange } from '../exchange/FixedRateExchange'
import { OceanDispenser } from '../dispenser/Dispenser'
import { EventAccessControl } from './EventAccessControl'
/**
 * Main interface for Ocean Protocol.
 */
export declare class Ocean extends Instantiable {
  /**
   * Returns the instance of Ocean.
   * @param  {Config} config Ocean instance configuration.
   * @return {Promise<Ocean>}
   */
  static getInstance(config: Config): Promise<Ocean>
  /**
   * Network instance
   * @type {Network}
   */
  network: Network
  /**
   * Provider instance.
   * @type {Provider}
   */
  provider: Provider
  /**
   * RBAC instance.
   * @type {EventAccessControl}
   */
  eventAccessControl: EventAccessControl
  /**
   * Web3 provider.
   * @type {any}
   */
  web3Provider: any
  /**
   * MetadataCache instance.
   * @type {MetadataCache}
   */
  metadataCache: MetadataCache
  /**
   * OnChainMetadataCache instance.
   * @type {OnChainMetadataCache}
   */
  onChainMetadata: OnChainMetadata
  /**
   * Ocean account submodule
   * @type {Accounts}
   */
  accounts: Accounts
  /**
       * Ocean auth submodule
       * @type {OceanAuth}
       
      public auth: OceanAuth
      */
  /**
   * Ocean assets submodule
   * @type {Assets}
   */
  assets: Assets
  /**
   * Ocean compute submodule
   * @type {Compute}
   */
  compute: Compute
  /**
   * Ocean DataTokens submodule
   * @type {DataTokens}
   */
  datatokens: DataTokens
  /**
   * Ocean Pools submodule
   * @type {OceanPool}
   */
  pool: OceanPool
  /**
   * Ocean FixedRateExchange submodule
   * @type {OceanFixedRateExchange}
   */
  fixedRateExchange: OceanFixedRateExchange
  /**
   * Ocean Dispenser submodule
   * @type {OceanDispenser}
   */
  OceanDispenser: OceanDispenser
  /**
       * Ocean tokens submodule
       * @type {OceanTokens}
       
      public tokens: OceanTokens
      */
  /**
   * Ocean versions submodule
   * @type {Versions}
   */
  versions: Versions
  /**
   * Ocean utils submodule
   * @type {OceanUtils}
   */
  utils: OceanUtils
}
