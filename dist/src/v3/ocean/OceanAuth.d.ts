import Account from './Account'
import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
/**
 * Tokens submodule of Ocean Protocol.
 */
export declare class OceanAuth extends Instantiable {
  /**
   * Returns the instance of OceanAuth.
   * @return {Promise<OceanAuth>}
   */
  static getInstance(config: InstantiableConfig): Promise<OceanAuth>
  /**
   * Returns a token for a account.
   * @param  {Account} account Signer account.
   * @return {Promise<string>} Token
   */
  get(account: Account): Promise<string>
  /**
   * Returns the address of signed token.
   * @param  {string}          token Token.
   * @return {Promise<string>}       Signer address.
   */
  check(token: string): Promise<string>
  /**
   * Generates and stores the token for a account.
   * @param {Account} account Signer account.
   */
  store(account: Account): Promise<void>
  /**
   * Returns a stored token.
   * @param {Account} account Signer account.
   */
  restore(account: Account): Promise<string>
  /**
   * Returns if the token is stored and is valid.
   * @param  {Account}          account Signer account.
   * @return {Promise<boolean>}         Is stored and valid.
   */
  isStored(account: Account): Promise<boolean>
  private writeToken
  private readToken
  private getLocalStorage
  private getMessage
  private getExpiration
}
