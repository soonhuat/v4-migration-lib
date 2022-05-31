'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateId = void 0
var uuid_1 = require('uuid')
function generateId(length) {
  if (length === void 0) {
    length = 64
  }
  var id = ''
  while (id.length < length) {
    id += (0, uuid_1.v4)().replace(/-/g, '')
  }
  return id.substr(0, length)
}
exports.generateId = generateId
//# sourceMappingURL=GeneratorHelpers.js.map
