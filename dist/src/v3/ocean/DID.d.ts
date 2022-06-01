/**
 * Decentralized ID.
 */
export default class DID {
  /**
   * Parses a DID from a string.
   * @param  {string} didString DID in string.
   * @return {DID}
   */
  static parse(didString: string | DID): DID
  /**
   * Generate a new DID.
   * @param  {string} dataTokenAddress Address of data token to use for DID.
   * @return {DID}
   */
  static generate(dataTokenAddress: string): DID
  /**
   * ID.
   * @type {string}
   */
  private id
  private constructor()
  /**
   * Returns the DID.
   * @return {string}
   */
  getDid(): string
  /**
   * Returns the ID.
   * @return {string}
   */
  getId(): string
}
