import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
/**
 * Account submodule of Ocean Protocol.
 */
export declare class Accounts extends Instantiable {
  /**
   * Returns the instance of OceanAccounts.
   * @return {Promise<OceanAccounts>}
   */
  static getInstance(config: InstantiableConfig): Promise<Accounts>
  /**
   * Returns the list of accounts.
   * @return {Promise<Account[]>}
   */
  list(): Promise<Account[]>
  /**
   * Return account balance for a given ERC20 token
   * @param  {String}          TokenAddress .
   * @param  {Account}          account Account instance.
   * @return {Promise<String>}         Token balance.
   */
  getTokenBalance(TokenAddress: string, account: Account): Promise<string>
  /**
   * Return account balance for a Ocean Tokens
   * @param  {Account}          account Account instance.
   * @return {Promise<String>}         Ocean Token balance.
   */
  getOceanBalance(account: Account): Promise<string>
  /**
   * Return account balance in ETH
   * @param  {Account}          account Account instance.
   * @return {Promise<String>}         Ether  balance.
   */
  getEtherBalance(account: Account): Promise<string>
}
