import Web3 from 'web3'
import Config from '../models/Config'
export default class Web3Provider {
  /**
   * Returns Web3 instance.
   * @return {Web3}
   */
  static getWeb3(config?: Partial<Config>): Web3
}
