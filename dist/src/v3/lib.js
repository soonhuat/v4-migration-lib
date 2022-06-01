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
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ConfigHelper =
  exports.utils =
  exports.DataTokens =
  exports.MetadataCache =
  exports.Provider =
  exports.LogLevel =
  exports.Logger =
  exports.DID =
  exports.Config =
  exports.Account =
  exports.Ocean =
  exports.OceanPlatformTechStatus =
  exports.OrderProgressStep =
  exports.CreateProgressStep =
    void 0
var Config_1 = __importDefault(require('./models/Config'))
exports.Config = Config_1.default
var Account_1 = __importDefault(require('./ocean/Account'))
exports.Account = Account_1.default
var DID_1 = __importDefault(require('./ocean/DID'))
exports.DID = DID_1.default
var Ocean_1 = require('./ocean/Ocean')
Object.defineProperty(exports, 'Ocean', {
  enumerable: true,
  get: function () {
    return Ocean_1.Ocean
  }
})
var Logger_1 = require('./utils/Logger')
Object.defineProperty(exports, 'Logger', {
  enumerable: true,
  get: function () {
    return Logger_1.LoggerInstance
  }
})
Object.defineProperty(exports, 'LogLevel', {
  enumerable: true,
  get: function () {
    return Logger_1.LogLevel
  }
})
var MetadataCache_1 = require('./metadatacache/MetadataCache')
Object.defineProperty(exports, 'MetadataCache', {
  enumerable: true,
  get: function () {
    return MetadataCache_1.MetadataCache
  }
})
var Datatokens_1 = require('./datatokens/Datatokens')
Object.defineProperty(exports, 'DataTokens', {
  enumerable: true,
  get: function () {
    return Datatokens_1.DataTokens
  }
})
var ConfigHelper_1 = require('./utils/ConfigHelper')
Object.defineProperty(exports, 'ConfigHelper', {
  enumerable: true,
  get: function () {
    return ConfigHelper_1.ConfigHelper
  }
})
var utils = __importStar(require('./utils'))
exports.utils = utils
var Provider_1 = require('./provider/Provider')
Object.defineProperty(exports, 'Provider', {
  enumerable: true,
  get: function () {
    return Provider_1.Provider
  }
})
// Exports
__exportStar(require('./ddo/DDO'), exports)
__exportStar(require('./ddo/interfaces'), exports)
var Assets_1 = require('./ocean/Assets')
Object.defineProperty(exports, 'CreateProgressStep', {
  enumerable: true,
  get: function () {
    return Assets_1.CreateProgressStep
  }
})
Object.defineProperty(exports, 'OrderProgressStep', {
  enumerable: true,
  get: function () {
    return Assets_1.OrderProgressStep
  }
})
var Versions_1 = require('./ocean/Versions')
Object.defineProperty(exports, 'OceanPlatformTechStatus', {
  enumerable: true,
  get: function () {
    return Versions_1.OceanPlatformTechStatus
  }
})
//# sourceMappingURL=lib.js.map
