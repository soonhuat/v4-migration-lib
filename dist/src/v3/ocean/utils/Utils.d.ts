import { Instantiable, InstantiableConfig } from '../../Instantiable.abstract'
import { SignatureUtils } from './SignatureUtils'
import { WebServiceConnector } from './WebServiceConnector'
/**
 * Utils internal submodule of Ocean Protocol.
 */
export declare class OceanUtils extends Instantiable {
  /**
   * Returns the instance of OceanUtils.
   * @return {Promise<OceanUtils>}
   */
  static getInstance(config: InstantiableConfig): Promise<OceanUtils>
  /**
   * Signature utils.
   * @type {SignatureUtils}
   */
  signature: SignatureUtils
  /**
   * Fetch utils.
   * @type {WebServiceConnector}
   */
  fetch: WebServiceConnector
}
