'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        )
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
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
exports.Ocean = void 0
var Accounts_1 = require('./Accounts')
var Assets_1 = require('./Assets')
var Versions_1 = require('./Versions')
var Utils_1 = require('./utils/Utils')
var MetadataCache_1 = require('../metadatacache/MetadataCache')
var OnChainMetaData_1 = require('../metadatacache/OnChainMetaData')
var Provider_1 = require('../provider/Provider')
var Datatokens_1 = require('../datatokens/Datatokens')
var Network_1 = require('../datatokens/Network')
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var Compute_1 = require('./Compute')
var OceanPool_1 = require('../balancer/OceanPool')
var FixedRateExchange_1 = require('../exchange/FixedRateExchange')
var Dispenser_1 = require('../dispenser/Dispenser')
var EventAccessControl_1 = require('./EventAccessControl')
/**
 * Main interface for Ocean Protocol.
 */
var Ocean = /** @class */ (function (_super) {
  __extends(Ocean, _super)
  function Ocean() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  /**
   * Returns the instance of Ocean.
   * @param  {Config} config Ocean instance configuration.
   * @return {Promise<Ocean>}
   */
  Ocean.getInstance = function (config) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var instance, instanceConfig, _b, _c, _d, _e, _f, _g, _h
      return __generator(this, function (_j) {
        switch (_j.label) {
          case 0:
            instance = new Ocean()
            instanceConfig = __assign(
              __assign(
                {},
                (0,
                Instantiable_abstract_1.generateIntantiableConfigFromConfig)(
                  config
                )
              ),
              { ocean: instance }
            )
            instance.setInstanceConfig(instanceConfig)
            _b = instance
            return [4 /*yield*/, Utils_1.OceanUtils.getInstance(instanceConfig)]
          case 1:
            _b.utils = _j.sent()
            _c = instance
            return [
              4 /*yield*/,
              Provider_1.Provider.getInstance(instanceConfig)
            ]
          case 2:
            _c.provider = _j.sent()
            _d = instance
            return [
              4 /*yield*/,
              EventAccessControl_1.EventAccessControl.getInstance(
                instanceConfig
              )
            ]
          case 3:
            _d.eventAccessControl = _j.sent()
            instance.metadataCache = new MetadataCache_1.MetadataCache(
              instanceConfig.config.metadataCacheUri,
              instanceConfig.logger,
              (_a = instanceConfig.config) === null || _a === void 0
                ? void 0
                : _a.requestTimeout
            )
            _e = instance
            return [
              4 /*yield*/,
              Accounts_1.Accounts.getInstance(instanceConfig)
              // instance.auth = await Auth.getInstance(instanceConfig)
            ]
          case 4:
            _e.accounts = _j.sent()
            // instance.auth = await Auth.getInstance(instanceConfig)
            _f = instance
            return [4 /*yield*/, Assets_1.Assets.getInstance(instanceConfig)]
          case 5:
            // instance.auth = await Auth.getInstance(instanceConfig)
            _f.assets = _j.sent()
            _g = instance
            return [4 /*yield*/, Compute_1.Compute.getInstance(instanceConfig)]
          case 6:
            _g.compute = _j.sent()
            instance.datatokens = new Datatokens_1.DataTokens(
              instanceConfig.config.factoryAddress,
              instanceConfig.config.factoryABI,
              instanceConfig.config.datatokensABI,
              instanceConfig.config.web3Provider,
              instanceConfig.logger,
              instanceConfig.config
            )
            instance.pool = new OceanPool_1.OceanPool(
              instanceConfig.config.web3Provider,
              instanceConfig.logger,
              instanceConfig.config.poolFactoryABI,
              instanceConfig.config.poolABI,
              instanceConfig.config.poolFactoryAddress,
              instanceConfig.config.oceanTokenAddress,
              instanceConfig.config
            )
            instance.fixedRateExchange =
              new FixedRateExchange_1.OceanFixedRateExchange(
                instanceConfig.config.web3Provider,
                instanceConfig.logger,
                instanceConfig.config.fixedRateExchangeAddress,
                instanceConfig.config.fixedRateExchangeAddressABI,
                instanceConfig.config.oceanTokenAddress,
                instance.datatokens,
                instanceConfig.config
              )
            instance.OceanDispenser = new Dispenser_1.OceanDispenser(
              instanceConfig.config.web3Provider,
              instanceConfig.logger,
              instanceConfig.config.dispenserAddress,
              instanceConfig.config.dispenserABI,
              instance.datatokens,
              instanceConfig.config
            )
            instance.onChainMetadata = new OnChainMetaData_1.OnChainMetadata(
              instanceConfig.config.web3Provider,
              instanceConfig.logger,
              instanceConfig.config.metadataContractAddress,
              instanceConfig.config.metadataContractABI,
              instance.metadataCache,
              instanceConfig.config
            )
            _h = instance
            return [
              4 /*yield*/,
              Versions_1.Versions.getInstance(instanceConfig)
            ]
          case 7:
            _h.versions = _j.sent()
            instance.network = new Network_1.Network()
            return [2 /*return*/, instance]
        }
      })
    })
  }
  return Ocean
})(Instantiable_abstract_1.Instantiable)
exports.Ocean = Ocean
//# sourceMappingURL=Ocean.js.map
