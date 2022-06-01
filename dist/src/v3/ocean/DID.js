'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var utils_1 = require('../utils')
var prefix = 'did:op:'
/**
 * Decentralized ID.
 */
var DID = /** @class */ (function () {
  function DID(id) {
    this.id = id
  }
  /**
   * Parses a DID from a string.
   * @param  {string} didString DID in string.
   * @return {DID}
   */
  DID.parse = function (didString) {
    if (didString instanceof DID) {
      didString = didString.getDid()
    }
    var did
    var didMatch = didString.match(/^did:op:([a-f0-9]{40})$/i)
    if (didMatch) {
      did = new DID(didMatch[1])
    }
    if (!did) {
      throw new Error('Parsing DID failed, '.concat(didString))
    }
    return did
  }
  /**
   * Generate a new DID.
   * @param  {string} dataTokenAddress Address of data token to use for DID.
   * @return {DID}
   */
  DID.generate = function (dataTokenAddress) {
    return new DID((0, utils_1.noZeroX)(dataTokenAddress))
  }
  /**
   * Returns the DID.
   * @return {string}
   */
  DID.prototype.getDid = function () {
    return ''.concat(prefix).concat(this.id)
  }
  /**
   * Returns the ID.
   * @return {string}
   */
  DID.prototype.getId = function () {
    return this.id
  }
  return DID
})()
exports.default = DID
//# sourceMappingURL=DID.js.map
