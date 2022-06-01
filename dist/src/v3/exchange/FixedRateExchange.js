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
exports.OceanFixedRateExchange = exports.FixedRateCreateProgressStep = void 0
var FixedRateExchange_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/FixedRateExchange.json')
)
var bignumber_js_1 = __importDefault(require('bignumber.js'))
var utils_1 = require('../utils')
var MAX_AWAIT_PROMISES = 10
var FixedRateCreateProgressStep
;(function (FixedRateCreateProgressStep) {
  FixedRateCreateProgressStep[
    (FixedRateCreateProgressStep['CreatingExchange'] = 0)
  ] = 'CreatingExchange'
  FixedRateCreateProgressStep[
    (FixedRateCreateProgressStep['ApprovingDatatoken'] = 1)
  ] = 'ApprovingDatatoken'
})(
  (FixedRateCreateProgressStep =
    exports.FixedRateCreateProgressStep ||
    (exports.FixedRateCreateProgressStep = {}))
)
var OceanFixedRateExchange = /** @class */ (function () {
  /**
   * Instantiate FixedRateExchange
   * @param {any} web3
   * @param {String} fixedRateExchangeAddress
   * @param {any} fixedRateExchangeABI
   * @param {String} oceanAddress
   */
  function OceanFixedRateExchange(
    web3,
    logger,
    fixedRateExchangeAddress,
    fixedRateExchangeABI,
    oceanAddress,
    datatokens,
    config
  ) {
    if (fixedRateExchangeAddress === void 0) {
      fixedRateExchangeAddress = null
    }
    if (fixedRateExchangeABI === void 0) {
      fixedRateExchangeABI = null
    }
    if (oceanAddress === void 0) {
      oceanAddress = null
    }
    this.GASLIMIT_DEFAULT = 1000000
    /** Ocean related functions */
    this.oceanAddress = null
    this.contract = null
    this.web3 = web3
    this.fixedRateExchangeAddress = fixedRateExchangeAddress
    this.config = config
    this.startBlock = (config && config.startBlock) || 0
    this.fixedRateExchangeABI =
      fixedRateExchangeABI || FixedRateExchange_json_1.default.abi
    this.oceanAddress = oceanAddress
    this.datatokens = datatokens
    if (web3)
      this.contract = (0, utils_1.setContractDefaults)(
        new this.web3.eth.Contract(
          this.fixedRateExchangeABI,
          this.fixedRateExchangeAddress
        ),
        this.config
      )
    this.logger = logger
  }
  /**
   * Creates new exchange pair between Ocean Token and data token.
   * @param {String} dataToken Data Token Contract Address
   * @param {Number} rate exchange rate
   * @param {String} address User address
   * @param {String} amount Optional, amount of datatokens to be approved for the exchange
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  OceanFixedRateExchange.prototype.create = function (
    dataToken,
    rate,
    address,
    amount
  ) {
    return this.createExchange(
      this.oceanAddress,
      dataToken,
      rate,
      address,
      amount
    )
  }
  /**
   * Creates new exchange pair between Ocean Token and data token.
   * @param {String} dataToken Data Token Contract Address
   * @param {Number} rate exchange rate
   * @param {String} address User address
   * @param {String} amount Optional, amount of datatokens to be approved for the exchange
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  OceanFixedRateExchange.prototype.createExchange = function (
    baseToken,
    dataToken,
    rate,
    address,
    amount
  ) {
    var _this = this
    return new utils_1.SubscribablePromise(function (observer) {
      return __awaiter(_this, void 0, void 0, function () {
        var estGas, gasLimitDefault, e_1, exchangeId, trxReceipt, _a, _b, e_2
        var _c
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              observer.next(FixedRateCreateProgressStep.CreatingExchange)
              gasLimitDefault = this.GASLIMIT_DEFAULT
              _d.label = 1
            case 1:
              _d.trys.push([1, 3, , 4])
              return [
                4 /*yield*/,
                this.contract.methods
                  .create(baseToken, dataToken, this.web3.utils.toWei(rate))
                  .estimateGas({ from: address }, function (err, estGas) {
                    return err ? gasLimitDefault : estGas
                  })
              ]
            case 2:
              estGas = _d.sent()
              return [3 /*break*/, 4]
            case 3:
              e_1 = _d.sent()
              estGas = gasLimitDefault
              return [3 /*break*/, 4]
            case 4:
              exchangeId = null
              trxReceipt = null
              _d.label = 5
            case 5:
              _d.trys.push([5, 8, , 9])
              _b = (_a = this.contract.methods.create(
                baseToken,
                dataToken,
                this.web3.utils.toWei(rate)
              )).send
              _c = {
                from: address,
                gas: estGas + 1
              }
              return [
                4 /*yield*/,
                (0, utils_1.getFairGasPrice)(this.web3, this.config)
              ]
            case 6:
              return [
                4 /*yield*/,
                _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])
              ]
            case 7:
              trxReceipt = _d.sent()
              exchangeId = trxReceipt.events.ExchangeCreated.returnValues[0]
              return [3 /*break*/, 9]
            case 8:
              e_2 = _d.sent()
              this.logger.error(
                'ERROR: Failed to create new exchange: '.concat(e_2.message)
              )
              return [3 /*break*/, 9]
            case 9:
              if (amount && exchangeId) {
                observer.next(FixedRateCreateProgressStep.ApprovingDatatoken)
                this.datatokens.approve(
                  dataToken,
                  this.fixedRateExchangeAddress,
                  amount,
                  address
                )
              }
              return [2 /*return*/, trxReceipt]
          }
        })
      })
    })
  }
  /**
   * Creates unique exchange identifier.
   * @param {String} dataToken Data Token Contract Address
   * @param {String} owner Owner of the exchange
   * @return {Promise<string>} exchangeId
   */
  OceanFixedRateExchange.prototype.generateExchangeId = function (
    dataToken,
    owner
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var exchangeId
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods
                .generateExchangeId(this.oceanAddress, dataToken, owner)
                .call()
            ]
          case 1:
            exchangeId = _a.sent()
            return [2 /*return*/, exchangeId]
        }
      })
    })
  }
  /**
   * Atomic swap
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  OceanFixedRateExchange.prototype.buyDT = function (
    exchangeId,
    dataTokenAmount,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var gasLimitDefault, estGas, e_3, trxReceipt, _a, _b, e_4
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.contract.methods
                .swap(
                  exchangeId,
                  this.web3.utils.toWei(String(dataTokenAmount))
                )
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3 /*break*/, 4]
          case 3:
            e_3 = _d.sent()
            estGas = gasLimitDefault
            return [3 /*break*/, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = this.contract.methods.swap(
              exchangeId,
              this.web3.utils.toWei(String(dataTokenAmount))
            )).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [
              4 /*yield*/,
              (0, utils_1.getFairGasPrice)(this.web3, this.config)
            ]
          case 5:
            return [
              4 /*yield*/,
              _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])
            ]
          case 6:
            trxReceipt = _d.sent()
            return [2 /*return*/, trxReceipt]
          case 7:
            e_4 = _d.sent()
            this.logger.error(
              'ERROR: Failed to buy datatokens: '.concat(e_4.message)
            )
            return [2 /*return*/, null]
          case 8:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * Gets total number of exchanges
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @return {Promise<Number>} no of available exchanges
   */
  OceanFixedRateExchange.prototype.getNumberOfExchanges = function () {
    return __awaiter(this, void 0, void 0, function () {
      var numExchanges
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods.getNumberOfExchanges().call()
            ]
          case 1:
            numExchanges = _a.sent()
            return [2 /*return*/, numExchanges]
        }
      })
    })
  }
  /**
   * Set new rate
   * @param {String} exchangeId ExchangeId
   * @param {Number} newRate New rate
   * @param {String} address User account
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  OceanFixedRateExchange.prototype.setRate = function (
    exchangeId,
    newRate,
    address
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var gasLimitDefault, estGas, e_5, trxReceipt, _a, _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.contract.methods
                .setRate(exchangeId, this.web3.utils.toWei(String(newRate)))
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3 /*break*/, 4]
          case 3:
            e_5 = _d.sent()
            estGas = gasLimitDefault
            return [3 /*break*/, 4]
          case 4:
            _b = (_a = this.contract.methods.setRate(
              exchangeId,
              this.web3.utils.toWei(String(newRate))
            )).send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [
              4 /*yield*/,
              (0, utils_1.getFairGasPrice)(this.web3, this.config)
            ]
          case 5:
            return [
              4 /*yield*/,
              _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])
            ]
          case 6:
            trxReceipt = _d.sent()
            return [2 /*return*/, trxReceipt]
        }
      })
    })
  }
  /**
   * Activate an exchange
   * @param {String} exchangeId ExchangeId
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  OceanFixedRateExchange.prototype.activate = function (exchangeId, address) {
    return __awaiter(this, void 0, void 0, function () {
      var exchange, gasLimitDefault, estGas, e_6, trxReceipt, _a, _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            return [4 /*yield*/, this.getExchange(exchangeId)]
          case 1:
            exchange = _d.sent()
            if (!exchange) return [2 /*return*/, null]
            if (exchange.active === true) return [2 /*return*/, null]
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 2
          case 2:
            _d.trys.push([2, 4, , 5])
            return [
              4 /*yield*/,
              this.contract.methods
                .toggleExchangeState(exchangeId)
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 3:
            estGas = _d.sent()
            return [3 /*break*/, 5]
          case 4:
            e_6 = _d.sent()
            estGas = gasLimitDefault
            return [3 /*break*/, 5]
          case 5:
            _b = (_a = this.contract.methods.toggleExchangeState(exchangeId))
              .send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [
              4 /*yield*/,
              (0, utils_1.getFairGasPrice)(this.web3, this.config)
            ]
          case 6:
            return [
              4 /*yield*/,
              _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])
            ]
          case 7:
            trxReceipt = _d.sent()
            return [2 /*return*/, trxReceipt]
        }
      })
    })
  }
  /**
   * Deactivate an exchange
   * @param {String} exchangeId ExchangeId
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} transaction receipt
   */
  OceanFixedRateExchange.prototype.deactivate = function (exchangeId, address) {
    return __awaiter(this, void 0, void 0, function () {
      var exchange, gasLimitDefault, estGas, e_7, trxReceipt, _a, _b
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            return [4 /*yield*/, this.getExchange(exchangeId)]
          case 1:
            exchange = _d.sent()
            if (!exchange) return [2 /*return*/, null]
            if (exchange.active === false) return [2 /*return*/, null]
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 2
          case 2:
            _d.trys.push([2, 4, , 5])
            return [
              4 /*yield*/,
              this.contract.methods
                .toggleExchangeState(exchangeId)
                .estimateGas({ from: address }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 3:
            estGas = _d.sent()
            return [3 /*break*/, 5]
          case 4:
            e_7 = _d.sent()
            estGas = gasLimitDefault
            return [3 /*break*/, 5]
          case 5:
            _b = (_a = this.contract.methods.toggleExchangeState(exchangeId))
              .send
            _c = {
              from: address,
              gas: estGas + 1
            }
            return [
              4 /*yield*/,
              (0, utils_1.getFairGasPrice)(this.web3, this.config)
            ]
          case 6:
            return [
              4 /*yield*/,
              _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])
            ]
          case 7:
            trxReceipt = _d.sent()
            return [2 /*return*/, trxReceipt]
        }
      })
    })
  }
  /**
   * Get Rate
   * @param {String} exchangeId ExchangeId
   * @return {Promise<string>} Rate (converted from wei)
   */
  OceanFixedRateExchange.prototype.getRate = function (exchangeId) {
    return __awaiter(this, void 0, void 0, function () {
      var weiRate
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods.getRate(exchangeId).call()
            ]
          case 1:
            weiRate = _a.sent()
            return [2 /*return*/, this.web3.utils.fromWei(weiRate)]
        }
      })
    })
  }
  /**
   * Get Supply
   * @param {String} exchangeId ExchangeId
   * @return {Promise<string>} Rate (converted from wei)
   */
  OceanFixedRateExchange.prototype.getSupply = function (exchangeId) {
    return __awaiter(this, void 0, void 0, function () {
      var weiRate
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods.getSupply(exchangeId).call()
            ]
          case 1:
            weiRate = _a.sent()
            return [2 /*return*/, this.web3.utils.fromWei(weiRate)]
        }
      })
    })
  }
  /**
   * getOceanNeeded
   * @param {String} exchangeId ExchangeId
   * @param {Number} dataTokenAmount Amount of Data Tokens
   * @return {Promise<string>} Ocean amount needed
   */
  OceanFixedRateExchange.prototype.getOceanNeeded = function (
    exchangeId,
    dataTokenAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var weiRate
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods
                .CalcInGivenOut(
                  exchangeId,
                  this.web3.utils.toWei(dataTokenAmount)
                )
                .call()
            ]
          case 1:
            weiRate = _a.sent()
            return [2 /*return*/, this.web3.utils.fromWei(weiRate)]
        }
      })
    })
  }
  /**
   * Get exchange details
   * @param {String} exchangeId ExchangeId
   * @return {Promise<FixedPricedExchange>} Exchange details
   */
  OceanFixedRateExchange.prototype.getExchange = function (exchangeId) {
    return __awaiter(this, void 0, void 0, function () {
      var result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods.getExchange(exchangeId).call()
            ]
          case 1:
            result = _a.sent()
            result.fixedRate = this.web3.utils.fromWei(result.fixedRate)
            result.supply = this.web3.utils.fromWei(result.supply)
            result.exchangeID = exchangeId
            return [2 /*return*/, result]
        }
      })
    })
  }
  /**
   * Get all exchanges
   * @param {String} exchangeId ExchangeId
   * @return {Promise<String[]>} Exchanges list
   */
  OceanFixedRateExchange.prototype.getExchanges = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.contract.methods.getExchanges().call()]
          case 1:
            return [2 /*return*/, _a.sent()]
        }
      })
    })
  }
  /**
   * Check if an exchange is active
   * @param {String} exchangeId ExchangeId
   * @return {Promise<Boolean>} Result
   */
  OceanFixedRateExchange.prototype.isActive = function (exchangeId) {
    return __awaiter(this, void 0, void 0, function () {
      var result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods.isActive(exchangeId).call()
            ]
          case 1:
            result = _a.sent()
            return [2 /*return*/, result]
        }
      })
    })
  }
  /**
   * Calculates how many basetokens are needed to get specifyed amount of datatokens
   * @param {String} exchangeId ExchangeId
   * @param {String} dataTokenAmount dataTokenAmount
   * @return {Promise<String>} Result
   */
  OceanFixedRateExchange.prototype.CalcInGivenOut = function (
    exchangeId,
    dataTokenAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.contract.methods
                .CalcInGivenOut(
                  exchangeId,
                  this.web3.utils.toWei(dataTokenAmount)
                )
                .call()
            ]
          case 1:
            result = _a.sent()
            return [2 /*return*/, this.web3.utils.fromWei(result)]
        }
      })
    })
  }
  OceanFixedRateExchange.prototype.searchforDT = function (
    dataTokenAddress,
    minSupply
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result,
        events,
        promises,
        i,
        results,
        j,
        constituents,
        supply,
        required
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            result = []
            return [
              4 /*yield*/,
              this.contract.getPastEvents('ExchangeCreated', {
                filter: { datatoken: dataTokenAddress.toLowerCase() },
                fromBlock: this.startBlock,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _a.sent()
            promises = []
            i = 0
            _a.label = 2
          case 2:
            if (!(i < events.length)) return [3 /*break*/, 5]
            promises.push(this.getExchange(events[i].returnValues[0]))
            if (
              !(promises.length > MAX_AWAIT_PROMISES || i === events.length - 1)
            )
              return [3 /*break*/, 4]
            return [4 /*yield*/, Promise.all(promises)]
          case 3:
            results = _a.sent()
            for (j = 0; j < results.length; j++) {
              constituents = results[j]
              if (
                constituents.active === true &&
                constituents.dataToken.toLowerCase() ===
                  dataTokenAddress.toLowerCase()
              ) {
                supply = new bignumber_js_1.default(constituents.supply)
                required = new bignumber_js_1.default(minSupply)
                if (supply.gte(required)) {
                  result.push(constituents)
                }
              }
            }
            promises = []
            _a.label = 4
          case 4:
            i++
            return [3 /*break*/, 2]
          case 5:
            return [2 /*return*/, result]
        }
      })
    })
  }
  /**
   * Get all exchanges, filtered by creator(if any)
   * @param {String} account
   * @return {Promise<FixedPricedExchange[]>}
   */
  OceanFixedRateExchange.prototype.getExchangesbyCreator = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var result, events, i, _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            result = []
            return [
              4 /*yield*/,
              this.contract.getPastEvents('ExchangeCreated', {
                filter: {},
                fromBlock: this.startBlock,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _c.sent()
            i = 0
            _c.label = 2
          case 2:
            if (!(i < events.length)) return [3 /*break*/, 5]
            if (
              !(
                !account ||
                events[i].returnValues[3].toLowerCase() ===
                  account.toLowerCase()
              )
            )
              return [3 /*break*/, 4]
            _b = (_a = result).push
            return [4 /*yield*/, this.getExchange(events[i].returnValues[0])]
          case 3:
            _b.apply(_a, [_c.sent()])
            _c.label = 4
          case 4:
            i++
            return [3 /*break*/, 2]
          case 5:
            return [2 /*return*/, result]
        }
      })
    })
  }
  /**
   * Get all swaps for an exchange, filtered by account(if any)
   * @param {String} exchangeId
   * @param {String} account
   * @return {Promise<FixedPricedSwap[]>}
   */
  OceanFixedRateExchange.prototype.getExchangeSwaps = function (
    exchangeId,
    account
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, events, i
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            result = []
            return [
              4 /*yield*/,
              this.contract.getPastEvents('Swapped', {
                filter: { exchangeId: exchangeId },
                fromBlock: this.startBlock,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _a.sent()
            for (i = 0; i < events.length; i++) {
              if (
                !account ||
                events[i].returnValues[1].toLowerCase() ===
                  account.toLowerCase()
              )
                result.push(this.getEventData(events[i]))
            }
            return [2 /*return*/, result]
        }
      })
    })
  }
  /**
   * Get all swaps for an account
   * @param {String} account
   * @return {Promise<FixedPricedSwap[]>}
   */
  OceanFixedRateExchange.prototype.getAllExchangesSwaps = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var result, events, i, swaps
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            result = []
            return [
              4 /*yield*/,
              this.contract.getPastEvents('ExchangeCreated', {
                filter: {},
                fromBlock: this.startBlock,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _a.sent()
            i = 0
            _a.label = 2
          case 2:
            if (!(i < events.length)) return [3 /*break*/, 5]
            return [
              4 /*yield*/,
              this.getExchangeSwaps(events[i].returnValues[0], account)
            ]
          case 3:
            swaps = _a.sent()
            swaps.forEach(function (swap) {
              result.push(swap)
            })
            _a.label = 4
          case 4:
            i++
            return [3 /*break*/, 2]
          case 5:
            return [2 /*return*/, result]
        }
      })
    })
  }
  OceanFixedRateExchange.prototype.getEventData = function (data) {
    var result = {
      exchangeID: data.returnValues[0],
      caller: data.returnValues[1],
      baseTokenAmount: this.web3.utils.fromWei(data.returnValues[2]),
      dataTokenAmount: this.web3.utils.fromWei(data.returnValues[3])
    }
    return result
  }
  return OceanFixedRateExchange
})()
exports.OceanFixedRateExchange = OceanFixedRateExchange
//# sourceMappingURL=FixedRateExchange.js.map
