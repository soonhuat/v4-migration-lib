'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Instantiable = exports.generateIntantiableConfigFromConfig = void 0
var utils_1 = require('./utils')
function generateIntantiableConfigFromConfig(config) {
  return {
    config: config,
    web3: config.web3Provider,
    logger: utils_1.LoggerInstance
  }
}
exports.generateIntantiableConfigFromConfig =
  generateIntantiableConfigFromConfig
var Instantiable = /** @class */ (function () {
  function Instantiable() {}
  Object.defineProperty(Instantiable.prototype, 'ocean', {
    get: function () {
      if (!this._ocean) {
        utils_1.LoggerInstance.error('Ocean instance is not defined.')
      }
      return this._ocean
    },
    enumerable: false,
    configurable: true
  })
  Object.defineProperty(Instantiable.prototype, 'web3', {
    get: function () {
      if (!this._web3) {
        utils_1.LoggerInstance.error('Web3 instance is not defined.')
      }
      return this._web3
    },
    enumerable: false,
    configurable: true
  })
  Object.defineProperty(Instantiable.prototype, 'config', {
    get: function () {
      if (!this._config) {
        utils_1.LoggerInstance.error('Config instance is not defined.')
      }
      return this._config
    },
    enumerable: false,
    configurable: true
  })
  Object.defineProperty(Instantiable.prototype, 'logger', {
    get: function () {
      return utils_1.LoggerInstance
    },
    enumerable: false,
    configurable: true
  })
  Object.defineProperty(Instantiable.prototype, 'instanceConfig', {
    get: function () {
      var _a = this,
        ocean = _a.ocean,
        web3 = _a.web3,
        config = _a.config,
        logger = _a.logger
      return { ocean: ocean, web3: web3, config: config, logger: logger }
    },
    enumerable: false,
    configurable: true
  })
  Instantiable.getInstance = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        utils_1.LoggerInstance.warn(
          'getInstance() methods has needs to be added to child class.'
        )
        return [2 /*return*/]
      })
    })
  }
  Instantiable.setInstanceConfig = function (instance, _a) {
    var ocean = _a.ocean,
      config = _a.config,
      web3 = _a.web3,
      logger = _a.logger
    instance._ocean = ocean
    instance._config = config
    instance._web3 = web3
    instance._logger = logger
  }
  Instantiable.prototype.setInstanceConfig = function (config) {
    Instantiable.setInstanceConfig(this, config)
  }
  return Instantiable
})()
exports.Instantiable = Instantiable
//# sourceMappingURL=Instantiable.abstract.js.map
