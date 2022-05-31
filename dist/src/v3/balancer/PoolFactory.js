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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.PoolFactory = void 0
var utils_1 = require('../utils')
var BFactory_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/BFactory.json')
)
var PoolFactory = (function () {
  function PoolFactory(web3, logger, factoryABI, factoryAddress, config) {
    if (factoryABI === void 0) {
      factoryABI = null
    }
    if (factoryAddress === void 0) {
      factoryAddress = null
    }
    this.GASLIMIT_DEFAULT = 1000000
    this.web3 = null
    this.web3 = web3
    if (factoryABI) this.factoryABI = factoryABI
    else this.factoryABI = BFactory_json_1.default.abi
    if (factoryAddress) {
      this.factoryAddress = factoryAddress
    }
    this.logger = logger
    this.config = config
  }
  PoolFactory.prototype.createPool = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var factory, txid, gasLimitDefault, estGas, e_1, _a, _b, e_2
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (this.web3 === null) {
              this.logger.error('ERROR: Web3 object is null')
              return [2, null]
            }
            if (this.factoryAddress === null) {
              this.logger.error('ERROR: bfactoryAddress is null')
              return [2, null]
            }
            factory = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.factoryABI, this.factoryAddress, {
                from: account
              }),
              this.config
            )
            txid = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              factory.methods
                .newBPool()
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_1 = _d.sent()
            this.logger.log('Error estimate gas newBPool')
            this.logger.log(e_1)
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = factory.methods.newBPool()).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            txid = _d.sent()
            return [3, 8]
          case 7:
            e_2 = _d.sent()
            this.logger.error(
              'ERROR: Failed to create new pool: '.concat(e_2.message)
            )
            return [3, 8]
          case 8:
            return [2, txid]
        }
      })
    })
  }
  return PoolFactory
})()
exports.PoolFactory = PoolFactory
//# sourceMappingURL=PoolFactory.js.map
