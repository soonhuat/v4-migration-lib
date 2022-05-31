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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OceanPool = exports.PoolCreateProgressStep = void 0
var Pool_1 = require('./Pool')
var bignumber_js_1 = __importDefault(require('bignumber.js'))
var utils_1 = require('../utils')
var decimal_js_1 = __importDefault(require('decimal.js'))
var POOL_MAX_AMOUNT_IN_LIMIT = 0.25
var POOL_MAX_AMOUNT_OUT_LIMIT = 0.25
var BPFACTORY_DEPLOY_BLOCK = 0
var MAX_AWAIT_PROMISES = 10
var PoolCreateProgressStep
;(function (PoolCreateProgressStep) {
  PoolCreateProgressStep[(PoolCreateProgressStep['CreatingPool'] = 0)] =
    'CreatingPool'
  PoolCreateProgressStep[(PoolCreateProgressStep['ApprovingDatatoken'] = 1)] =
    'ApprovingDatatoken'
  PoolCreateProgressStep[(PoolCreateProgressStep['ApprovingOcean'] = 2)] =
    'ApprovingOcean'
  PoolCreateProgressStep[(PoolCreateProgressStep['SetupPool'] = 3)] =
    'SetupPool'
})(
  (PoolCreateProgressStep =
    exports.PoolCreateProgressStep || (exports.PoolCreateProgressStep = {}))
)
var OceanPool = (function (_super) {
  __extends(OceanPool, _super)
  function OceanPool(
    web3,
    logger,
    factoryABI,
    poolABI,
    factoryAddress,
    oceanAddress,
    config
  ) {
    if (factoryABI === void 0) {
      factoryABI = null
    }
    if (poolABI === void 0) {
      poolABI = null
    }
    if (factoryAddress === void 0) {
      factoryAddress = null
    }
    if (oceanAddress === void 0) {
      oceanAddress = null
    }
    var _this =
      _super.call(
        this,
        web3,
        logger,
        factoryABI,
        poolABI,
        factoryAddress,
        config
      ) || this
    _this.oceanAddress = null
    _this.dtAddress = null
    if (oceanAddress) {
      _this.oceanAddress = oceanAddress
    }
    _this.startBlock = (config && config.startBlock) || 0
    return _this
  }
  OceanPool.prototype.create = function (
    account,
    dtAddress,
    dtAmount,
    dtWeight,
    oceanAmount,
    fee
  ) {
    var _this = this
    if (this.oceanAddress == null) {
      this.logger.error('ERROR: oceanAddress is not defined')
      throw new Error('ERROR: oceanAddress is not defined')
    }
    if (parseFloat(fee) > 0.1) {
      this.logger.error(
        'ERROR: Swap fee too high. The maximum allowed swapFee is 10%'
      )
      throw new Error(
        'ERROR: Swap fee too high. The maximum allowed swapFee is 10%'
      )
    }
    if (parseFloat(dtAmount) < 2) {
      this.logger.error('ERROR: Amount of DT is too low')
      throw new Error('ERROR: Amount of DT is too low')
    }
    if (parseFloat(dtWeight) > 9 || parseFloat(dtWeight) < 1) {
      this.logger.error('ERROR: Weight out of bounds (min 1, max9)')
      throw new Error('ERROR: Weight out of bounds (min 1, max9)')
    }
    return new utils_1.SubscribablePromise(function (observer) {
      return __awaiter(_this, void 0, void 0, function () {
        var createTxid, address, oceanWeight, txid
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              observer.next(PoolCreateProgressStep.CreatingPool)
              return [4, _super.prototype.createPool.call(this, account)]
            case 1:
              createTxid = _a.sent()
              if (!createTxid) {
                this.logger.error('ERROR: Failed to call create pool')
                throw new Error('ERROR: Failed to call create pool')
              }
              address = createTxid.events.BPoolRegistered.returnValues[0]
              oceanWeight = 10 - parseFloat(dtWeight)
              this.dtAddress = dtAddress
              observer.next(PoolCreateProgressStep.ApprovingDatatoken)
              return [
                4,
                this.approve(
                  account,
                  dtAddress,
                  address,
                  this.web3.utils.toWei(String(dtAmount))
                )
              ]
            case 2:
              txid = _a.sent()
              if (!txid) {
                this.logger.error('ERROR: Failed to call approve DT token')
                throw new Error('ERROR: Failed to call approve DT token')
              }
              observer.next(PoolCreateProgressStep.ApprovingOcean)
              return [
                4,
                this.approve(
                  account,
                  this.oceanAddress,
                  address,
                  this.web3.utils.toWei(String(oceanAmount))
                )
              ]
            case 3:
              txid = _a.sent()
              if (!txid) {
                this.logger.error('ERROR: Failed to call approve OCEAN token')
                throw new Error('ERROR: Failed to call approve OCEAN token')
              }
              observer.next(PoolCreateProgressStep.SetupPool)
              return [
                4,
                _super.prototype.setup.call(
                  this,
                  account,
                  address,
                  dtAddress,
                  this.web3.utils.toWei(String(dtAmount)),
                  this.web3.utils.toWei(String(dtWeight)),
                  this.oceanAddress,
                  this.web3.utils.toWei(String(oceanAmount)),
                  this.web3.utils.toWei(String(oceanWeight)),
                  this.web3.utils.toWei(fee)
                )
              ]
            case 4:
              txid = _a.sent()
              if (!txid) {
                this.logger.error('ERROR: Failed to create a new pool')
                throw new Error('ERROR: Failed to create a new pool')
              }
              return [2, createTxid]
          }
        })
      })
    })
  }
  OceanPool.prototype.getDTAddress = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var tokens, token, _i, tokens_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.dtAddress = null
            return [4, this.getCurrentTokens(poolAddress)]
          case 1:
            tokens = _a.sent()
            if (tokens != null)
              for (_i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                token = tokens_1[_i]
                if (token.toLowerCase() !== this.oceanAddress.toLowerCase())
                  this.dtAddress = token
              }
            return [2, this.dtAddress]
        }
      })
    })
  }
  OceanPool.prototype.getOceanReserve = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.oceanAddress == null) {
          this.logger.error('ERROR: oceanAddress is not defined')
          return [2, null]
        }
        return [
          2,
          _super.prototype.getReserve.call(this, poolAddress, this.oceanAddress)
        ]
      })
    })
  }
  OceanPool.prototype.getDTReserve = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              2,
              _super.prototype.getReserve.call(this, poolAddress, dtAddress)
            ]
        }
      })
    })
  }
  OceanPool.prototype.getMaxBuyQuantity = function (poolAddress, tokenAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var balance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, tokenAddress)
            ]
          case 1:
            balance = _a.sent()
            return [2, new decimal_js_1.default(balance).div(3).toString()]
        }
      })
    })
  }
  OceanPool.prototype.getOceanMaxBuyQuantity = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2, this.getMaxBuyQuantity(poolAddress, this.oceanAddress)]
      })
    })
  }
  OceanPool.prototype.getDTMaxBuyQuantity = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = this.getMaxBuyQuantity
            _b = [poolAddress]
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            return [2, _a.apply(this, _b.concat([_c.sent()]))]
        }
      })
    })
  }
  OceanPool.prototype.calcInGivenOut = function (
    poolAddress,
    tokenInAddress,
    tokenOutAddress,
    tokenOutAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, _a, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _b = (_a = _super.prototype.calcInGivenOut).call
            _c = [this, poolAddress]
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 1:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 2:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 3:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 4:
            _c = _c.concat([_d.sent(), tokenOutAmount])
            return [4, this.getSwapFee(poolAddress)]
          case 5:
            return [4, _b.apply(_a, _c.concat([_d.sent()]))]
          case 6:
            result = _d.sent()
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.calcOutGivenIn = function (
    poolAddress,
    tokenInAddress,
    tokenOutAddress,
    tokenInAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, _a, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _b = (_a = _super.prototype.calcOutGivenIn).call
            _c = [this, poolAddress]
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 1:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 2:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 3:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 4:
            _c = _c.concat([_d.sent(), tokenInAmount])
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 5:
            return [4, _b.apply(_a, _c.concat([_d.sent()]))]
          case 6:
            result = _d.sent()
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.calcPoolOutGivenSingleIn = function (
    poolAddress,
    tokenInAddress,
    tokenInAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, _a, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _b = (_a = _super.prototype.calcPoolOutGivenSingleIn).call
            _c = [this, poolAddress]
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 1:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 2:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getPoolSharesTotalSupply.call(this, poolAddress)
            ]
          case 3:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getTotalDenormalizedWeight.call(
                this,
                poolAddress
              )
            ]
          case 4:
            _c = _c.concat([_d.sent(), tokenInAmount])
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 5:
            result = _b.apply(_a, _c.concat([_d.sent()]))
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.calcSingleInGivenPoolOut = function (
    poolAddress,
    tokenInAddress,
    poolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, _a, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _b = (_a = _super.prototype.calcSingleInGivenPoolOut).call
            _c = [this, poolAddress]
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 1:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenInAddress
              )
            ]
          case 2:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getPoolSharesTotalSupply.call(this, poolAddress)
            ]
          case 3:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getTotalDenormalizedWeight.call(
                this,
                poolAddress
              )
            ]
          case 4:
            _c = _c.concat([_d.sent(), poolShares])
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 5:
            result = _b.apply(_a, _c.concat([_d.sent()]))
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.calcSingleOutGivenPoolIn = function (
    poolAddress,
    tokenOutAddress,
    poolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, _a, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _b = (_a = _super.prototype.calcSingleOutGivenPoolIn).call
            _c = [this, poolAddress]
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 1:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 2:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getPoolSharesTotalSupply.call(this, poolAddress)
            ]
          case 3:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getTotalDenormalizedWeight.call(
                this,
                poolAddress
              )
            ]
          case 4:
            _c = _c.concat([_d.sent(), poolShares])
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 5:
            result = _b.apply(_a, _c.concat([_d.sent()]))
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.calcPoolInGivenSingleOut = function (
    poolAddress,
    tokenOutAddress,
    tokenOutAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var result, _a, _b, _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _b = (_a = _super.prototype.calcPoolInGivenSingleOut).call
            _c = [this, poolAddress]
            return [
              4,
              _super.prototype.getReserve.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 1:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                tokenOutAddress
              )
            ]
          case 2:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getPoolSharesTotalSupply.call(this, poolAddress)
            ]
          case 3:
            _c = _c.concat([_d.sent()])
            return [
              4,
              _super.prototype.getTotalDenormalizedWeight.call(
                this,
                poolAddress
              )
            ]
          case 4:
            _c = _c.concat([_d.sent(), tokenOutAmount])
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 5:
            result = _b.apply(_a, _c.concat([_d.sent()]))
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.getPoolSharesRequiredToRemoveDT = function (
    poolAddress,
    dtAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              2,
              this.calcPoolInGivenSingleOut(poolAddress, dtAddress, dtAmount)
            ]
        }
      })
    })
  }
  OceanPool.prototype.getDTRemovedforPoolShares = function (
    poolAddress,
    poolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              2,
              this.calcSingleOutGivenPoolIn(poolAddress, dtAddress, poolShares)
            ]
        }
      })
    })
  }
  OceanPool.prototype.getPoolSharesRequiredToRemoveOcean = function (
    poolAddress,
    oceanAmount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2,
          this.calcPoolInGivenSingleOut(
            poolAddress,
            this.oceanAddress,
            oceanAmount
          )
        ]
      })
    })
  }
  OceanPool.prototype.getOceanRemovedforPoolShares = function (
    poolAddress,
    poolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2,
          this.calcSingleOutGivenPoolIn(
            poolAddress,
            this.oceanAddress,
            poolShares
          )
        ]
      })
    })
  }
  OceanPool.prototype.getTokensRemovedforPoolShares = function (
    poolAddress,
    poolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var totalPoolTokens, dtReserve, oceanReserve, dtAmount, oceanAmount, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5])
            return [4, this.getPoolSharesTotalSupply(poolAddress)]
          case 1:
            totalPoolTokens = _a.sent()
            return [4, this.getDTReserve(poolAddress)]
          case 2:
            dtReserve = _a.sent()
            return [4, this.getOceanReserve(poolAddress)]
          case 3:
            oceanReserve = _a.sent()
            dtAmount = new decimal_js_1.default(poolShares)
              .div(totalPoolTokens)
              .mul(dtReserve)
              .toString()
            oceanAmount = new decimal_js_1.default(poolShares)
              .div(totalPoolTokens)
              .mul(oceanReserve)
              .toString()
            return [2, { dtAmount: dtAmount, oceanAmount: oceanAmount }]
          case 4:
            e_1 = _a.sent()
            this.logger.error(
              'ERROR: Unable to get token info. '.concat(e_1.message)
            )
            return [3, 5]
          case 5:
            return [2]
        }
      })
    })
  }
  OceanPool.prototype.getDTMaxAddLiquidity = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [2, this.getMaxAddLiquidity(poolAddress, dtAddress)]
        }
      })
    })
  }
  OceanPool.prototype.getOceanMaxAddLiquidity = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2, this.getMaxAddLiquidity(poolAddress, this.oceanAddress)]
      })
    })
  }
  OceanPool.prototype.getMaxAddLiquidity = function (
    poolAddress,
    tokenAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var balance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, tokenAddress)
            ]
          case 1:
            balance = _a.sent()
            if (parseFloat(balance) > 0) {
              return [
                2,
                new decimal_js_1.default(balance)
                  .mul(POOL_MAX_AMOUNT_IN_LIMIT)
                  .toString()
              ]
            } else return [2, '0']
            return [2]
        }
      })
    })
  }
  OceanPool.prototype.getMaxRemoveLiquidity = function (
    poolAddress,
    tokenAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var balance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, tokenAddress)
            ]
          case 1:
            balance = _a.sent()
            if (parseFloat(balance) > 0) {
              return [
                2,
                new decimal_js_1.default(balance)
                  .mul(POOL_MAX_AMOUNT_OUT_LIMIT)
                  .toString()
              ]
            } else return [2, '0']
            return [2]
        }
      })
    })
  }
  OceanPool.prototype.getDTMaxRemoveLiquidity = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [2, this.getMaxRemoveLiquidity(poolAddress, dtAddress)]
        }
      })
    })
  }
  OceanPool.prototype.getOceanMaxRemoveLiquidity = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2, this.getMaxRemoveLiquidity(poolAddress, this.oceanAddress)]
      })
    })
  }
  OceanPool.prototype.buyDT = function (
    account,
    poolAddress,
    dtAmountWanted,
    maxOceanAmount,
    maxPrice
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, _a, _b, calcInGivenOut, txid, tx
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (this.oceanAddress == null) {
              this.logger.error('ERROR: undefined ocean token contract address')
              return [2, null]
            }
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _c.sent()
            _b = (_a = new decimal_js_1.default(dtAmountWanted)).greaterThan
            return [4, this.getDTMaxBuyQuantity(poolAddress)]
          case 2:
            if (_b.apply(_a, [_c.sent()])) {
              this.logger.error('ERROR: Buy quantity exceeds quantity allowed')
              return [2, null]
            }
            return [4, this.getOceanNeeded(poolAddress, dtAmountWanted)]
          case 3:
            calcInGivenOut = _c.sent()
            if (
              new decimal_js_1.default(calcInGivenOut).greaterThan(
                maxOceanAmount
              )
            ) {
              this.logger.error('ERROR: Not enough Ocean Tokens')
              return [2, null]
            }
            return [
              4,
              _super.prototype.approve.call(
                this,
                account,
                this.oceanAddress,
                poolAddress,
                this.web3.utils.toWei(maxOceanAmount)
              )
            ]
          case 4:
            txid = _c.sent()
            if (!txid) {
              this.logger.error('ERROR: Failed to call approve OCEAN token')
              throw new Error('ERROR: Failed to call approve OCEAN token')
            }
            return [
              4,
              _super.prototype.swapExactAmountOut.call(
                this,
                account,
                poolAddress,
                this.oceanAddress,
                maxOceanAmount,
                dtAddress,
                dtAmountWanted,
                maxPrice
              )
            ]
          case 5:
            tx = _c.sent()
            return [2, tx]
        }
      })
    })
  }
  OceanPool.prototype.buyDTWithExactOcean = function (
    account,
    poolAddress,
    minimumdtAmountWanted,
    oceanAmount,
    maxPrice
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, _a, _b, calcInGivenOut, txid, tx
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (this.oceanAddress == null) {
              this.logger.error('ERROR: undefined ocean token contract address')
              return [2, null]
            }
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _c.sent()
            _b = (_a = new decimal_js_1.default(minimumdtAmountWanted))
              .greaterThan
            return [4, this.getDTMaxBuyQuantity(poolAddress)]
          case 2:
            if (_b.apply(_a, [_c.sent()])) {
              this.logger.error('ERROR: Buy quantity exceeds quantity allowed')
              return [2, null]
            }
            return [4, this.getOceanNeeded(poolAddress, minimumdtAmountWanted)]
          case 3:
            calcInGivenOut = _c.sent()
            if (
              new decimal_js_1.default(calcInGivenOut).greaterThan(oceanAmount)
            ) {
              this.logger.error('ERROR: Not enough Ocean Tokens')
              return [2, null]
            }
            return [
              4,
              _super.prototype.approve.call(
                this,
                account,
                this.oceanAddress,
                poolAddress,
                this.web3.utils.toWei(oceanAmount)
              )
            ]
          case 4:
            txid = _c.sent()
            if (!txid) {
              this.logger.error('ERROR: Failed to call approve OCEAN token')
              throw new Error('ERROR: Failed to call approve OCEAN token')
            }
            return [
              4,
              _super.prototype.swapExactAmountIn.call(
                this,
                account,
                poolAddress,
                this.oceanAddress,
                oceanAmount,
                dtAddress,
                minimumdtAmountWanted,
                maxPrice
              )
            ]
          case 5:
            tx = _c.sent()
            return [2, tx]
        }
      })
    })
  }
  OceanPool.prototype.sellDT = function (
    account,
    poolAddress,
    dtAmount,
    oceanAmountWanted,
    maxPrice
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, _a, _b, calcOutGivenIn, txid, tx
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (this.oceanAddress == null) {
              this.logger.error('ERROR: oceanAddress is not defined')
              return [2, null]
            }
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _c.sent()
            _b = (_a = new decimal_js_1.default(oceanAmountWanted)).greaterThan
            return [4, this.getOceanMaxBuyQuantity(poolAddress)]
          case 2:
            if (_b.apply(_a, [_c.sent()])) {
              this.logger.error('ERROR: Buy quantity exceeds quantity allowed')
              return [2, null]
            }
            return [4, this.getOceanReceived(poolAddress, dtAmount)]
          case 3:
            calcOutGivenIn = _c.sent()
            if (
              new decimal_js_1.default(calcOutGivenIn).lessThan(
                oceanAmountWanted
              )
            ) {
              this.logger.error('ERROR: Not enough datatokens')
              return [2, null]
            }
            return [
              4,
              _super.prototype.approve.call(
                this,
                account,
                dtAddress,
                poolAddress,
                this.web3.utils.toWei(dtAmount)
              )
            ]
          case 4:
            txid = _c.sent()
            if (!txid) {
              this.logger.error('ERROR: Failed to call approve DT token')
              throw new Error('ERROR: Failed to call approve DT token')
            }
            return [
              4,
              _super.prototype.swapExactAmountIn.call(
                this,
                account,
                poolAddress,
                dtAddress,
                dtAmount,
                this.oceanAddress,
                oceanAmountWanted,
                maxPrice
              )
            ]
          case 5:
            tx = _c.sent()
            return [2, tx]
        }
      })
    })
  }
  OceanPool.prototype.addDTLiquidity = function (account, poolAddress, amount) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, maxAmount, txid, result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [4, this.getMaxAddLiquidity(poolAddress, dtAddress)]
          case 2:
            maxAmount = _a.sent()
            if (new decimal_js_1.default(amount).greaterThan(maxAmount)) {
              this.logger.error('ERROR: Too much reserve to add')
              return [2, null]
            }
            return [
              4,
              _super.prototype.approve.call(
                this,
                account,
                dtAddress,
                poolAddress,
                this.web3.utils.toWei(amount)
              )
            ]
          case 3:
            txid = _a.sent()
            if (!txid) {
              this.logger.error('ERROR: Failed to call approve DT token')
              throw new Error('ERROR: Failed to call approve DT token')
            }
            return [
              4,
              _super.prototype.joinswapExternAmountIn.call(
                this,
                account,
                poolAddress,
                dtAddress,
                amount,
                '0'
              )
            ]
          case 4:
            result = _a.sent()
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.removeDTLiquidity = function (
    account,
    poolAddress,
    amount,
    maximumPoolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, maxAmount, usershares, sharesRequired
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [4, this.getDTMaxRemoveLiquidity(poolAddress)]
          case 2:
            maxAmount = _a.sent()
            if (new decimal_js_1.default(amount).greaterThan(maxAmount)) {
              this.logger.error('ERROR: Too much reserve to remove')
              return [2, null]
            }
            return [4, this.sharesBalance(account, poolAddress)]
          case 3:
            usershares = _a.sent()
            if (
              new decimal_js_1.default(usershares).lessThan(maximumPoolShares)
            ) {
              this.logger.error('ERROR: Not enough poolShares')
              return [2, null]
            }
            return [
              4,
              this.getPoolSharesRequiredToRemoveDT(poolAddress, amount)
            ]
          case 4:
            sharesRequired = _a.sent()
            if (
              new decimal_js_1.default(maximumPoolShares).lessThan(
                sharesRequired
              )
            ) {
              this.logger.error('ERROR: Not enough poolShares')
              return [2, null]
            }
            if (
              new decimal_js_1.default(maximumPoolShares).lessThan(
                sharesRequired
              )
            )
              maximumPoolShares = new decimal_js_1.default(maximumPoolShares)
                .mul(0.9999)
                .toString()
            return [
              2,
              this.exitswapExternAmountOut(
                account,
                poolAddress,
                dtAddress,
                amount,
                maximumPoolShares
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.addOceanLiquidity = function (
    account,
    poolAddress,
    amount
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var maxAmount, txid, result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.oceanAddress == null) {
              this.logger.error('ERROR: oceanAddress is not defined')
              return [2, null]
            }
            return [4, this.getOceanMaxAddLiquidity(poolAddress)]
          case 1:
            maxAmount = _a.sent()
            if (new decimal_js_1.default(amount).greaterThan(maxAmount)) {
              this.logger.error('ERROR: Too much reserve to add')
              return [2, null]
            }
            return [
              4,
              _super.prototype.approve.call(
                this,
                account,
                this.oceanAddress,
                poolAddress,
                this.web3.utils.toWei(amount)
              )
            ]
          case 2:
            txid = _a.sent()
            if (!txid) {
              this.logger.error('ERROR: Failed to call approve OCEAN token')
              throw new Error('ERROR: Failed to call approve OCEAN token')
            }
            return [
              4,
              _super.prototype.joinswapExternAmountIn.call(
                this,
                account,
                poolAddress,
                this.oceanAddress,
                amount,
                '0'
              )
            ]
          case 3:
            result = _a.sent()
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.removeOceanLiquidityWithMinimum = function (
    account,
    poolAddress,
    poolShares,
    minOcean
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var usershares
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.oceanAddress == null) {
              this.logger.error('ERROR: oceanAddress is not defined')
              return [2, null]
            }
            return [4, this.sharesBalance(account, poolAddress)]
          case 1:
            usershares = _a.sent()
            if (new decimal_js_1.default(usershares).lessThan(poolShares)) {
              this.logger.error('ERROR: Not enough poolShares')
              return [2, null]
            }
            return [
              2,
              _super.prototype.exitswapPoolAmountIn.call(
                this,
                account,
                poolAddress,
                this.oceanAddress,
                poolShares,
                minOcean
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.removeOceanLiquidity = function (
    account,
    poolAddress,
    amount,
    maximumPoolShares
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var maxAmount, usershares, sharesRequired
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.oceanAddress == null) {
              this.logger.error('ERROR: oceanAddress is not defined')
              return [2, null]
            }
            return [4, this.getOceanMaxRemoveLiquidity(poolAddress)]
          case 1:
            maxAmount = _a.sent()
            if (new decimal_js_1.default(amount).greaterThan(maxAmount)) {
              this.logger.error('ERROR: Too much reserve to remove')
              return [2, null]
            }
            return [4, this.sharesBalance(account, poolAddress)]
          case 2:
            usershares = _a.sent()
            if (
              new decimal_js_1.default(usershares).lessThan(maximumPoolShares)
            ) {
              this.logger.error('ERROR: Not enough poolShares')
              return [2, null]
            }
            return [
              4,
              this.getPoolSharesRequiredToRemoveOcean(poolAddress, amount)
            ]
          case 3:
            sharesRequired = _a.sent()
            if (
              new decimal_js_1.default(maximumPoolShares).lessThan(
                sharesRequired
              )
            ) {
              this.logger.error('ERROR: Not enough poolShares')
              return [2, null]
            }
            if (
              new decimal_js_1.default(maximumPoolShares).lessThan(
                sharesRequired
              )
            )
              maximumPoolShares = new decimal_js_1.default(maximumPoolShares)
                .mul(0.9999)
                .toString()
            return [
              2,
              _super.prototype.exitswapExternAmountOut.call(
                this,
                account,
                poolAddress,
                this.oceanAddress,
                amount,
                maximumPoolShares
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.removePoolLiquidity = function (
    account,
    poolAddress,
    poolShares,
    minDT,
    minOcean
  ) {
    if (minDT === void 0) {
      minDT = '0'
    }
    if (minOcean === void 0) {
      minOcean = '0'
    }
    return __awaiter(this, void 0, void 0, function () {
      var usershares
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.sharesBalance(account, poolAddress)]
          case 1:
            usershares = _a.sent()
            if (new decimal_js_1.default(usershares).lessThan(poolShares)) {
              this.logger.error('ERROR: Not enough poolShares')
              return [2, null]
            }
            if (new decimal_js_1.default(usershares).equals(poolShares))
              poolShares = new decimal_js_1.default(poolShares)
                .mul(0.9999)
                .toString()
            return [
              2,
              this.exitPool(account, poolAddress, poolShares, [minDT, minOcean])
            ]
        }
      })
    })
  }
  OceanPool.prototype.getDTPrice = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.oceanAddress == null) {
          this.logger.error('ERROR: oceanAddress is not defined')
          return [2, '0']
        }
        return [2, this.getOceanNeeded(poolAddress, '1')]
      })
    })
  }
  OceanPool.prototype.searchPoolforDT = function (dtAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var result, factory, events, i, constituents
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            result = []
            factory = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
              this.config
            )
            return [
              4,
              factory.getPastEvents('BPoolRegistered', {
                filter: {},
                fromBlock: this.startBlock,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _a.sent()
            events.sort(function (a, b) {
              return a.blockNumber > b.blockNumber ? 1 : -1
            })
            i = 0
            _a.label = 2
          case 2:
            if (!(i < events.length)) return [3, 5]
            return [
              4,
              _super.prototype.getCurrentTokens.call(
                this,
                events[i].returnValues[0]
              )
            ]
          case 3:
            constituents = _a.sent()
            if (constituents.includes(dtAddress))
              result.push(events[i].returnValues[0])
            _a.label = 4
          case 4:
            i++
            return [3, 2]
          case 5:
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.getOceanNeeded = function (poolAddress, dtRequired) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _c.sent()
            _b = (_a = new decimal_js_1.default(dtRequired)).greaterThan
            return [4, this.getDTMaxBuyQuantity(poolAddress)]
          case 2:
            if (_b.apply(_a, [_c.sent()])) {
              return [2, '0']
            }
            return [
              2,
              this.calcInGivenOut(
                poolAddress,
                this.oceanAddress,
                dtAddress,
                dtRequired
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.getOceanReceived = function (poolAddress, dtAmount) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              2,
              this.calcOutGivenIn(
                poolAddress,
                dtAddress,
                this.oceanAddress,
                dtAmount
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.getDTReceived = function (poolAddress, oceanAmount) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              2,
              this.calcOutGivenIn(
                poolAddress,
                this.oceanAddress,
                dtAddress,
                oceanAmount
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.getDTNeeded = function (poolAddress, OceanRequired) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress, _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _c.sent()
            _b = (_a = new decimal_js_1.default(OceanRequired)).greaterThan
            return [4, this.getOceanMaxBuyQuantity(poolAddress)]
          case 2:
            if (_b.apply(_a, [_c.sent()])) {
              return [2, '0']
            }
            return [
              2,
              this.calcInGivenOut(
                poolAddress,
                dtAddress,
                this.oceanAddress,
                OceanRequired
              )
            ]
        }
      })
    })
  }
  OceanPool.prototype.getPoolsbyCreator = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var result, factory, events, i, _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            result = []
            factory = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
              this.config
            )
            return [
              4,
              factory.getPastEvents('BPoolRegistered', {
                filter: account ? { registeredBy: account } : {},
                fromBlock: this.startBlock,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _c.sent()
            i = 0
            _c.label = 2
          case 2:
            if (!(i < events.length)) return [3, 5]
            if (
              !(
                !account ||
                events[i].returnValues[1].toLowerCase() ===
                  account.toLowerCase()
              )
            )
              return [3, 4]
            _b = (_a = result).push
            return [4, this.getPoolDetails(events[i].returnValues[0])]
          case 3:
            _b.apply(_a, [_c.sent()])
            _c.label = 4
          case 4:
            i++
            return [3, 2]
          case 5:
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.getResult = function (account, event) {
    return __awaiter(this, void 0, void 0, function () {
      var shares, dtAddress, onePool
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              _super.prototype.sharesBalance.call(
                this,
                account,
                event.returnValues[0]
              )
            ]
          case 1:
            shares = _a.sent()
            if (!(parseFloat(shares) > 0)) return [3, 3]
            return [4, this.getDTAddress(event.returnValues[0])]
          case 2:
            dtAddress = _a.sent()
            if (dtAddress) {
              onePool = {
                shares: shares,
                poolAddress: event.returnValues[0],
                did: (0, utils_1.didPrefixed)(
                  (0, utils_1.didNoZeroX)(dtAddress)
                )
              }
              return [2, onePool]
            }
            _a.label = 3
          case 3:
            return [2]
        }
      })
    })
  }
  OceanPool.prototype.getPoolSharesByAddress = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var result,
        factory,
        events,
        promises,
        i,
        results,
        j,
        results,
        j,
        filteredResult
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            result = []
            factory = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
              this.config
            )
            return [
              4,
              factory.getPastEvents('BPoolRegistered', {
                filter: {},
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
            if (!(i < events.length)) return [3, 5]
            promises.push(this.getResult(account, events[i]))
            if (!(promises.length > MAX_AWAIT_PROMISES)) return [3, 4]
            return [4, Promise.all(promises)]
          case 3:
            results = _a.sent()
            for (j = 0; j < results.length; j++) {
              result.push(results[j])
            }
            promises = []
            _a.label = 4
          case 4:
            i++
            return [3, 2]
          case 5:
            if (!(promises.length > 0)) return [3, 7]
            return [4, Promise.all(promises)]
          case 6:
            results = _a.sent()
            for (j = 0; j < results.length; j++) {
              result.push(results[j])
            }
            promises = []
            _a.label = 7
          case 7:
            filteredResult = result.filter(function (share) {
              return share !== undefined
            })
            return [2, filteredResult]
        }
      })
    })
  }
  OceanPool.prototype.getPoolDetails = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var tokens, details
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, _super.prototype.getFinalTokens.call(this, poolAddress)]
          case 1:
            tokens = _a.sent()
            details = { poolAddress: poolAddress, tokens: tokens }
            return [2, details]
        }
      })
    })
  }
  OceanPool.prototype.getPoolLogs = function (
    poolAddress,
    startBlock,
    account
  ) {
    if (startBlock === void 0) {
      startBlock = 0
    }
    return __awaiter(this, void 0, void 0, function () {
      var results,
        dtAddress,
        swapTopic,
        joinTopic,
        exitTopic,
        addressTopic,
        events,
        promises,
        i,
        data,
        j,
        data,
        j,
        eventResults
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            results = []
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            if (startBlock === 0) startBlock = this.startBlock
            swapTopic = _super.prototype.getSwapEventSignature.call(this)
            joinTopic = _super.prototype.getJoinEventSignature.call(this)
            exitTopic = _super.prototype.getExitEventSignature.call(this)
            if (account)
              addressTopic =
                '0x000000000000000000000000' +
                account.substring(2).toLowerCase()
            else addressTopic = null
            return [
              4,
              this.web3.eth.getPastLogs({
                address: poolAddress,
                topics: [[swapTopic, joinTopic, exitTopic], addressTopic],
                fromBlock: startBlock,
                toBlock: 'latest'
              })
            ]
          case 2:
            events = _a.sent()
            promises = []
            i = 0
            _a.label = 3
          case 3:
            if (!(i < events.length)) return [3, 6]
            promises.push(this.getEventData(poolAddress, dtAddress, events[i]))
            if (!(promises.length > MAX_AWAIT_PROMISES)) return [3, 5]
            return [4, Promise.all(promises)]
          case 4:
            data = _a.sent()
            for (j = 0; j < data.length; j++) {
              results.push(data[j])
            }
            promises = []
            _a.label = 5
          case 5:
            i++
            return [3, 3]
          case 6:
            if (!(promises.length > 0)) return [3, 8]
            return [4, Promise.all(promises)]
          case 7:
            data = _a.sent()
            for (j = 0; j < data.length; j++) {
              results.push(data[j])
            }
            promises = []
            _a.label = 8
          case 8:
            eventResults = results.filter(function (share) {
              return share !== undefined
            })
            return [2, eventResults]
        }
      })
    })
  }
  OceanPool.prototype.getAllPoolLogs = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      var results, factory, events, promises, i, data, j, data, j, concatResults
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            results = []
            factory = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.factoryABI, this.factoryAddress),
              this.config
            )
            return [
              4,
              factory.getPastEvents('BPoolRegistered', {
                filter: {},
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
            if (!(i < events.length)) return [3, 5]
            promises.push(
              this.getPoolLogs(
                events[i].returnValues[0],
                events[i].blockNumber,
                account
              )
            )
            if (!(promises.length > MAX_AWAIT_PROMISES)) return [3, 4]
            return [4, Promise.all(promises)]
          case 3:
            data = _a.sent()
            for (j = 0; j < data.length; j++) {
              results.push(data[j])
            }
            promises = []
            _a.label = 4
          case 4:
            i++
            return [3, 2]
          case 5:
            if (!(promises.length > 0)) return [3, 7]
            return [4, Promise.all(promises)]
          case 6:
            data = _a.sent()
            for (j = 0; j < data.length; j++) {
              results.push(data[j])
            }
            promises = []
            _a.label = 7
          case 7:
            concatResults = results.reduce(function (elem1, elem2) {
              return elem1.concat(elem2)
            })
            return [2, concatResults]
        }
      })
    })
  }
  OceanPool.prototype.getEventData = function (poolAddress, dtAddress, data) {
    return __awaiter(this, void 0, void 0, function () {
      var blockDetails, swapTopic, joinTopic, exitTopic, type, result, params
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.web3.eth.getBlock(data.blockNumber)]
          case 1:
            blockDetails = _a.sent()
            swapTopic = _super.prototype.getSwapEventSignature.call(this)
            joinTopic = _super.prototype.getJoinEventSignature.call(this)
            exitTopic = _super.prototype.getExitEventSignature.call(this)
            switch (data.topics[0]) {
              case swapTopic:
                type = 'swap'
                break
              case joinTopic:
                type = 'join'
                break
              case exitTopic:
                type = 'exit'
                break
            }
            result = {
              poolAddress: poolAddress,
              dtAddress: dtAddress,
              caller: data.topics[1],
              transactionHash: data.transactionHash,
              blockNumber: data.blockNumber,
              timestamp: parseInt(String(blockDetails.timestamp)),
              type: type
            }
            switch (type) {
              case 'swap':
                params = this.web3.eth.abi.decodeParameters(
                  ['uint256', 'uint256'],
                  data.data
                )
                result = __assign(__assign({}, result), {
                  tokenIn:
                    '0x' + data.topics[2].substring(data.topics[2].length - 40),
                  tokenOut:
                    '0x' + data.topics[3].substring(data.topics[3].length - 40),
                  tokenAmountIn: this.web3.utils.fromWei(params[0]),
                  tokenAmountOut: this.web3.utils.fromWei(params[1])
                })
                break
              case 'join':
                params = this.web3.eth.abi.decodeParameters(
                  ['uint256'],
                  data.data
                )
                result = __assign(__assign({}, result), {
                  tokenIn:
                    '0x' + data.topics[2].substring(data.topics[2].length - 40),
                  tokenAmountIn: this.web3.utils.fromWei(params[0])
                })
                break
              case 'exit':
                params = this.web3.eth.abi.decodeParameters(
                  ['uint256'],
                  data.data
                )
                result = __assign(__assign({}, result), {
                  tokenOut:
                    '0x' + data.topics[2].substring(data.topics[2].length - 40),
                  tokenAmountOut: this.web3.utils.fromWei(params[0])
                })
                break
            }
            return [2, result]
        }
      })
    })
  }
  OceanPool.prototype.computeSlippage = function (
    poolAddress,
    tokenInBalance,
    tokenInWeight,
    tokenOutBalance,
    tokenOutWeight,
    newTokenInBalance,
    newTokenOutBalance,
    swapfee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var initialPrice, newPrice
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              _super.prototype.calcSpotPrice.call(
                this,
                poolAddress,
                tokenInBalance,
                tokenInWeight,
                tokenOutBalance,
                tokenOutWeight,
                swapfee
              )
            ]
          case 1:
            initialPrice = _a.sent()
            return [
              4,
              _super.prototype.calcSpotPrice.call(
                this,
                poolAddress,
                newTokenInBalance,
                tokenInWeight,
                newTokenOutBalance,
                tokenOutWeight,
                swapfee
              )
            ]
          case 2:
            newPrice = _a.sent()
            return [
              2,
              new decimal_js_1.default(newPrice)
                .mul(100)
                .div(initialPrice)
                .minus(100)
                .toString()
            ]
        }
      })
    })
  }
  OceanPool.prototype.computeBuySlippage = function (poolAddress, oceanAmount) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress,
        dtWeight,
        oceanWeight,
        dtReserve,
        oceanReserve,
        swapFee,
        dtReceived,
        newDtReserve,
        newOceanReserve,
        slippage
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                dtAddress
              )
            ]
          case 2:
            dtWeight = _a.sent()
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                this.oceanAddress
              )
            ]
          case 3:
            oceanWeight = _a.sent()
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, dtAddress)
            ]
          case 4:
            dtReserve = _a.sent()
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, dtAddress)
            ]
          case 5:
            oceanReserve = _a.sent()
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 6:
            swapFee = _a.sent()
            return [
              4,
              _super.prototype.calcOutGivenIn.call(
                this,
                poolAddress,
                oceanReserve,
                oceanWeight,
                dtReserve,
                dtWeight,
                oceanAmount,
                swapFee
              )
            ]
          case 7:
            dtReceived = _a.sent()
            newDtReserve = new bignumber_js_1.default(
              this.web3.utils.toWei(dtReserve)
            ).minus(this.web3.utils.toWei(dtReceived))
            newOceanReserve = new bignumber_js_1.default(
              this.web3.utils.toWei(oceanReserve)
            ).plus(this.web3.utils.toWei(oceanAmount))
            return [
              4,
              this.computeSlippage(
                poolAddress,
                oceanReserve,
                oceanWeight,
                dtReserve,
                dtWeight,
                this.web3.utils.fromWei(newOceanReserve.toString()),
                this.web3.utils.fromWei(newDtReserve.toString()),
                swapFee
              )
            ]
          case 8:
            slippage = _a.sent()
            return [2, slippage]
        }
      })
    })
  }
  OceanPool.prototype.computeSellSlippage = function (poolAddress, dtAmount) {
    return __awaiter(this, void 0, void 0, function () {
      var dtAddress,
        dtWeight,
        oceanWeight,
        dtReserve,
        oceanReserve,
        swapFee,
        oceanReceived,
        newDtReserve,
        newOceanReserve,
        slippage
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getDTAddress(poolAddress)]
          case 1:
            dtAddress = _a.sent()
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                dtAddress
              )
            ]
          case 2:
            dtWeight = _a.sent()
            return [
              4,
              _super.prototype.getDenormalizedWeight.call(
                this,
                poolAddress,
                this.oceanAddress
              )
            ]
          case 3:
            oceanWeight = _a.sent()
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, dtAddress)
            ]
          case 4:
            dtReserve = _a.sent()
            return [
              4,
              _super.prototype.getReserve.call(this, poolAddress, dtAddress)
            ]
          case 5:
            oceanReserve = _a.sent()
            return [4, _super.prototype.getSwapFee.call(this, poolAddress)]
          case 6:
            swapFee = _a.sent()
            return [
              4,
              _super.prototype.calcOutGivenIn.call(
                this,
                poolAddress,
                dtReserve,
                dtWeight,
                oceanReserve,
                oceanWeight,
                dtAmount,
                swapFee
              )
            ]
          case 7:
            oceanReceived = _a.sent()
            newDtReserve = new bignumber_js_1.default(
              this.web3.utils.toWei(dtReserve)
            ).plus(this.web3.utils.toWei(dtAmount))
            newOceanReserve = new bignumber_js_1.default(
              this.web3.utils.toWei(oceanReserve)
            ).minus(this.web3.utils.toWei(oceanReceived))
            return [
              4,
              this.computeSlippage(
                poolAddress,
                dtReserve,
                dtWeight,
                oceanReserve,
                oceanWeight,
                this.web3.utils.fromWei(newDtReserve.toString()),
                this.web3.utils.fromWei(newOceanReserve.toString()),
                swapFee
              )
            ]
          case 8:
            slippage = _a.sent()
            return [2, slippage]
        }
      })
    })
  }
  return OceanPool
})(Pool_1.Pool)
exports.OceanPool = OceanPool
//# sourceMappingURL=OceanPool.js.map
