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
exports.OnChainMetadata = void 0
var DDO_1 = require('../ddo/DDO')
var Metadata_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/Metadata.json')
)
var utils_1 = require('../utils')
var lzma_c_1 = require('lzma/src/lzma-c')
var OnChainMetadata = (function () {
  function OnChainMetadata(
    web3,
    logger,
    DDOContractAddress,
    DDOContractABI,
    metadataCache,
    config
  ) {
    if (DDOContractAddress === void 0) {
      DDOContractAddress = null
    }
    if (DDOContractABI === void 0) {
      DDOContractABI = null
    }
    this.GASLIMIT_DEFAULT = 1000000
    this.DDOContract = null
    this.web3 = web3
    this.config = config
    this.DDOContractAddress = DDOContractAddress
    this.DDOContractABI = DDOContractABI || Metadata_json_1.default.abi
    if (web3)
      this.DDOContract = (0, utils_1.setContractDefaults)(
        new this.web3.eth.Contract(
          this.DDOContractABI,
          this.DDOContractAddress
        ),
        this.config
      )
    this.logger = logger
    this.metadataCache = metadataCache
  }
  OnChainMetadata.prototype.compressDDO = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var compressed
      return __generator(this, function (_a) {
        lzma_c_1.LZMA.disableEndMark = true
        compressed = lzma_c_1.LZMA.compress(data, 9)
        return [2, compressed]
      })
    })
  }
  OnChainMetadata.prototype.publish = function (
    did,
    ddo,
    consumerAccount,
    encrypt,
    validate
  ) {
    if (encrypt === void 0) {
      encrypt = false
    }
    if (validate === void 0) {
      validate = true
    }
    return __awaiter(this, void 0, void 0, function () {
      var valid, rawData
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!validate) return [3, 2]
            return [4, this.metadataCache.validateMetadata(ddo)]
          case 1:
            valid = _a.sent()
            if (!valid.valid) {
              throw new Error('DDO has failed validation')
            }
            _a.label = 2
          case 2:
            return [4, this.prepareRawData(ddo, encrypt)]
          case 3:
            rawData = _a.sent()
            if (!rawData) {
              throw new Error('Could not prepare raw data for publish')
            } else return [2, this.publishRaw((0, utils_1.didZeroX)(did), rawData.flags, rawData.data, consumerAccount)]
            return [2]
        }
      })
    })
  }
  OnChainMetadata.prototype.update = function (
    did,
    ddo,
    consumerAccount,
    encrypt,
    validate
  ) {
    if (encrypt === void 0) {
      encrypt = false
    }
    if (validate === void 0) {
      validate = true
    }
    return __awaiter(this, void 0, void 0, function () {
      var valid, rawData
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!validate) return [3, 2]
            return [4, this.metadataCache.validateMetadata(ddo)]
          case 1:
            valid = _a.sent()
            if (!valid.valid) {
              throw new Error('DDO has failed validation')
            }
            _a.label = 2
          case 2:
            return [4, this.prepareRawData(ddo, encrypt)]
          case 3:
            rawData = _a.sent()
            if (!rawData) {
              throw new Error('Could not prepare raw data for udate')
            } else return [2, this.updateRaw((0, utils_1.didZeroX)(did), rawData.flags, rawData.data, consumerAccount)]
            return [2]
        }
      })
    })
  }
  OnChainMetadata.prototype.prepareRawData = function (ddo, encrypt) {
    if (encrypt === void 0) {
      encrypt = false
    }
    return __awaiter(this, void 0, void 0, function () {
      var flags, data
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            flags = 0
            data = DDO_1.DDO.serialize(ddo)
            if (!(encrypt === false)) return [3, 2]
            return [4, this.compressDDO(data)]
          case 1:
            data = _a.sent()
            flags = flags | 1
            data = this.getHex(data)
            return [3, 4]
          case 2:
            return [4, this.metadataCache.encryptDDO(data)]
          case 3:
            data = _a.sent()
            if (!data) return [2, null]
            flags = flags | 2
            _a.label = 4
          case 4:
            return [2, { flags: flags, data: data }]
        }
      })
    })
  }
  OnChainMetadata.prototype.publishRaw = function (
    did,
    flags,
    data,
    consumerAccount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var gasLimitDefault, estGas, e_1, trxReceipt, _a, _b, e_2
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!this.DDOContract) {
              this.logger.error('ERROR: Missing DDOContract')
              return [2, null]
            }
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              this.DDOContract.methods
                .create((0, utils_1.didZeroX)(did), flags, data)
                .estimateGas({ from: consumerAccount }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_1 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = this.DDOContract.methods.create(
              (0, utils_1.didZeroX)(did),
              flags,
              data
            )).send
            _c = {
              from: consumerAccount,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
          case 7:
            e_2 = _d.sent()
            this.logger.error(
              'ERROR: Failed to publish raw DDO : '.concat(e_2.message)
            )
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  OnChainMetadata.prototype.updateRaw = function (
    did,
    flags,
    data,
    consumerAccount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var gasLimitDefault, estGas, e_3, trxReceipt, _a, _b, e_4
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!this.DDOContract) {
              this.logger.error('ERROR: Missing DDOContract')
              return [2, null]
            }
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              this.DDOContract.methods
                .update((0, utils_1.didZeroX)(did), flags, data)
                .estimateGas({ from: consumerAccount }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_3 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = this.DDOContract.methods.update(
              (0, utils_1.didZeroX)(did),
              flags,
              data
            )).send
            _c = {
              from: consumerAccount,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            trxReceipt = _d.sent()
            return [2, trxReceipt]
          case 7:
            e_4 = _d.sent()
            this.logger.error(
              'ERROR: Failed to update raw DDO : '.concat(e_4.message)
            )
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  OnChainMetadata.prototype.transferOwnership = function (
    did,
    newOwner,
    consumerAccount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var trxReceipt, e_5
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.DDOContract) return [2, null]
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              this.DDOContract.methods
                .transferOwnership((0, utils_1.didZeroX)(did), newOwner)
                .send({
                  from: consumerAccount
                })
            ]
          case 2:
            trxReceipt = _a.sent()
            return [2, trxReceipt]
          case 3:
            e_5 = _a.sent()
            this.logger.error(
              'ERROR: Failed to transfer DDO ownership : '.concat(e_5.message)
            )
            return [2, null]
          case 4:
            return [2]
        }
      })
    })
  }
  OnChainMetadata.prototype.getHex = function (message) {
    var hexChar = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F'
    ]
    var hex = ''
    try {
      for (var i = 0; i < message.length; i++) {
        hex +=
          '' + hexChar[(message[i] >> 4) & 0x0f] + hexChar[message[i] & 0x0f]
      }
    } catch (e) {
      this.logger.error(
        'ERROR: Failed to get hex message value : '.concat(e.message)
      )
    }
    var hexMessage = '0x' + hex
    return hexMessage
  }
  return OnChainMetadata
})()
exports.OnChainMetadata = OnChainMetadata
//# sourceMappingURL=OnChainMetaData.js.map
