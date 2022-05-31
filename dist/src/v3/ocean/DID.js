'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var utils_1 = require('../utils')
var prefix = 'did:op:'
var DID = (function () {
  function DID(id) {
    this.id = id
  }
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
  DID.generate = function (dataTokenAddress) {
    return new DID((0, utils_1.noZeroX)(dataTokenAddress))
  }
  DID.prototype.getDid = function () {
    return ''.concat(prefix).concat(this.id)
  }
  DID.prototype.getId = function () {
    return this.id
  }
  return DID
})()
exports.default = DID
//# sourceMappingURL=DID.js.map
