'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getHash = exports.generateDid = void 0
var sha256_1 = __importDefault(require('crypto-js/sha256'))
var web3_1 = __importDefault(require('web3'))
function generateDid(erc721Address, chainId) {
  erc721Address = web3_1.default.utils.toChecksumAddress(erc721Address)
  var checksum = (0, sha256_1.default)(erc721Address + chainId.toString(10))
  return 'did:op:'.concat(checksum.toString())
}
exports.generateDid = generateDid
function getHash(data) {
  return (0, sha256_1.default)(data).toString()
}
exports.getHash = getHash
//# sourceMappingURL=DdoHelpers.js.map
