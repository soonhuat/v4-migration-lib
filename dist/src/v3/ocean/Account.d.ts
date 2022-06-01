import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
/**
 * Account information.
 */
export default class Account extends Instantiable {
  private id
  private password?
  private token?
  constructor(id?: string, config?: InstantiableConfig)
  getId(): string
  setId(id: string): void
  /**
   * Set account password.
   * @param {string} password Password for account.
   */
  setPassword(password: string): void
  /**
   * Returns account password.
   * @return {string} Account password.
   */
  getPassword(): string
  /**
       * Set account token.
       * @param {string} token Token for account.
       
      public setToken(token: string): void {
          this.token = token
      }
      */
  /**
       * Returns account token.
       * @return {Promise<string>} Account token.
       
      public async getToken(): Promise<string> {
          return this.token || this.ocean.auth.restore(this)
      }
      */
  /**
       * Returns if account token is stored.
       * @return {Promise<boolean>} Is stored.
       
      public isTokenStored(): Promise<boolean> {
          return this.ocean.auth.isStored(this)
      }
      */
  /**
       * Authenticate the account.
       
      public authenticate() {
          return this.ocean.auth.store(this)
      }
      */
  /**
   * Balance of Any Token (converted from wei).
   * @return {Promise<string>}
   */
  getTokenBalance(TokenAdress: string): Promise<string>
  /**
   * Decimals of Any Token
   * @return {Promise<number>}
   */
  getTokenDecimals(TokenAdress: string): Promise<number>
  /**
   * Balance of Ocean Token. (converted from wei).
   * @return {Promise<string>}
   */
  getOceanBalance(): Promise<string>
  /**
   * Symbol of a Token
   * @return {Promise<string>}
   */
  getTokenSymbol(TokenAdress: string): Promise<string>
  /**
   * Balance of Ether.(converted from wei).
   * @return {Promise<string>}
   */
  getEtherBalance(): Promise<string>
}
