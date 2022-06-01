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
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var ContractHandler = /** @class */ (function (_super) {
  __extends(ContractHandler, _super)
  function ContractHandler(config) {
    var _this = _super.call(this) || this
    _this.setInstanceConfig(config)
    return _this
  }
  ContractHandler.getContract = function (what, networkId) {
    return ContractHandler.contracts.get(this.getHash(what, networkId))
  }
  ContractHandler.setContract = function (what, networkId, contractInstance) {
    ContractHandler.contracts.set(
      this.getHash(what, networkId),
      contractInstance
    )
  }
  ContractHandler.hasContract = function (what, networkId) {
    return ContractHandler.contracts.has(this.getHash(what, networkId))
  }
  ContractHandler.getHash = function (what, networkId) {
    return ''.concat(what, '/#').concat(networkId)
  }
  ContractHandler.prototype.get = function (what, optional) {
    if (optional === void 0) {
      optional = false
    }
    return __awaiter(this, void 0, void 0, function () {
      var where, networkId, _a, err_1
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4 /*yield*/, this.ocean.network.getNetworkName()]
          case 1:
            where = _b.sent().toLowerCase()
            return [4 /*yield*/, this.ocean.network.getNetworkId()]
          case 2:
            networkId = _b.sent()
            _b.label = 3
          case 3:
            _b.trys.push([3, 6, , 7])
            _a = ContractHandler.getContract(what, networkId)
            if (_a) return [3 /*break*/, 5]
            return [4 /*yield*/, this.load(what, where, networkId)]
          case 4:
            _a = _b.sent()
            _b.label = 5
          case 5:
            return [2 /*return*/, _a]
          case 6:
            err_1 = _b.sent()
            if (!optional) {
              this.logger.error('Failed to load', what, 'from', where, err_1)
            }
            throw err_1
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  ContractHandler.prototype.load = function (what, where, networkId) {
    return __awaiter(this, void 0, void 0, function () {
      var artifact, code, contract
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.logger.debug('Loading', what, 'from', where)
            artifact = require('@oceanprotocol/contracts/artifacts/'
              .concat(where, '/')
              .concat(what, '.json'))
            return [4 /*yield*/, this.web3.eth.getCode(artifact.address)]
          case 1:
            code = _a.sent()
            if (code === '0x0') {
              // no code in the blockchain dude
              throw new Error(
                'No code deployed at address '.concat(
                  artifact.address,
                  ', sorry.'
                )
              )
            }
            contract = new this.web3.eth.Contract(
              artifact.abi,
              artifact.address
            )
            this.logger.debug(
              'Getting instance of',
              what,
              'from',
              where,
              'at address',
              artifact.address
            )
            ContractHandler.setContract(what, networkId, contract)
            return [2 /*return*/, ContractHandler.getContract(what, networkId)]
        }
      })
    })
  }
  ContractHandler.contracts = new Map()
  return ContractHandler
})(Instantiable_abstract_1.Instantiable)
exports.default = ContractHandler
//# sourceMappingURL=ContractHandler.js.map
