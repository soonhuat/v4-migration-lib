'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.didNoZeroX =
  exports.didZeroX =
  exports.didTransformer =
  exports.noDidPrefixed =
  exports.didPrefixed =
  exports.zeroXTransformer =
  exports.noZeroX =
  exports.zeroX =
    void 0
var Logger_1 = require('./Logger')
// Ox transformer
var zeroX = function (input) {
  return zeroXTransformer(input, true)
}
exports.zeroX = zeroX
var noZeroX = function (input) {
  return zeroXTransformer(input, false)
}
exports.noZeroX = noZeroX
function zeroXTransformer(input, zeroOutput) {
  if (input === void 0) {
    input = ''
  }
  var _a = inputMatch(input, /^(?:0x)*([a-f0-9]+)$/i, 'zeroXTransformer'),
    valid = _a.valid,
    output = _a.output
  return (zeroOutput && valid ? '0x' : '') + output
}
exports.zeroXTransformer = zeroXTransformer
// did:op: transformer
var didPrefixed = function (input) {
  return didTransformer(input, true)
}
exports.didPrefixed = didPrefixed
var noDidPrefixed = function (input) {
  return didTransformer(input, false)
}
exports.noDidPrefixed = noDidPrefixed
function didTransformer(input, prefixOutput) {
  if (input === void 0) {
    input = ''
  }
  var _a = inputMatch(
      input,
      /^(?:0x|did:op:)*([a-f0-9]{40})$/i,
      'didTransformer'
    ),
    valid = _a.valid,
    output = _a.output
  return (prefixOutput && valid ? 'did:op:' : '') + output
}
exports.didTransformer = didTransformer
// 0x + did:op: transformer
var didZeroX = function (input) {
  return (0, exports.zeroX)(didTransformer(input, false))
}
exports.didZeroX = didZeroX
var didNoZeroX = function (input) {
  return (0, exports.noZeroX)(didTransformer(input, false))
}
exports.didNoZeroX = didNoZeroX
// Shared functions
function inputMatch(input, regexp, conversorName) {
  if (typeof input !== 'string') {
    Logger_1.LoggerInstance.debug('Not input string:')
    Logger_1.LoggerInstance.debug(input)
    throw new Error(
      '['
        .concat(conversorName, '] Expected string, input type: ')
        .concat(typeof input)
    )
  }
  var match = input.match(regexp)
  if (!match) {
    Logger_1.LoggerInstance.warn(
      '['.concat(conversorName, '] Input transformation failed.')
    )
    return { valid: false, output: input }
  }
  return { valid: true, output: match[1] }
}
//# sourceMappingURL=ConversionTypeHelpers.js.map
