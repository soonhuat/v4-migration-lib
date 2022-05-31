'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          }
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p)
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getAndConvertDDO = exports.convertDDO = exports.getDDO = void 0
var importDDO_1 = require('./DDO/importDDO')
Object.defineProperty(exports, 'getDDO', {
  enumerable: true,
  get: function () {
    return importDDO_1.getDDO
  }
})
var convertDDO_1 = require('./DDO/convertDDO')
Object.defineProperty(exports, 'convertDDO', {
  enumerable: true,
  get: function () {
    return convertDDO_1.convertDDO
  }
})
Object.defineProperty(exports, 'getAndConvertDDO', {
  enumerable: true,
  get: function () {
    return convertDDO_1.getAndConvertDDO
  }
})
__exportStar(require('./migration/Migration'), exports)
//# sourceMappingURL=index.js.map
