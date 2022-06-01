import { Instantiable } from '../Instantiable.abstract'
export declare class Network extends Instantiable {
  /**
   * Returns network id.
   * @return {Promise<number>} Network ID.
   */
  getNetworkId(): Promise<number>
  /**
   * Returns the network by name.
   * @return {Promise<string>} Network name.
   */
  getNetworkName(): Promise<string>
}
