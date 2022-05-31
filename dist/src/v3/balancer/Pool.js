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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Pool = void 0
var utils_1 = require('../utils')
var BPool_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/BPool.json')
)
var DataTokenTemplate_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json')
)
var PoolFactory_1 = require('./PoolFactory')
var decimal_js_1 = __importDefault(require('decimal.js'))
var MaxUint256 =
  '115792089237316195423570985008687907853269984665640564039457584007913129639934'
var Pool = (function (_super) {
  __extends(Pool, _super)
  function Pool(web3, logger, factoryABI, poolABI, factoryAddress, config) {
    if (factoryABI === void 0) {
      factoryABI = null
    }
    if (poolABI === void 0) {
      poolABI = null
    }
    if (factoryAddress === void 0) {
      factoryAddress = null
    }
    var _this =
      _super.call(this, web3, logger, factoryABI, factoryAddress, config) ||
      this
    if (poolABI) _this.poolABI = poolABI
    else _this.poolABI = BPool_json_1.default.abi
    return _this
  }
  Pool.prototype.createPool = function (account) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, _super.prototype.createPool.call(this, account)]
          case 1:
            return [2, _a.sent()]
        }
      })
    })
  }
  Pool.prototype.setup = function (
    account,
    poolAddress,
    dataToken,
    dataTokenAmount,
    dataTokenWeight,
    baseToken,
    baseTokenAmount,
    baseTokenWeight,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, gasLimitDefault, estGas, e_1, _a, _b, e_2
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .setup(
                  dataToken,
                  dataTokenAmount,
                  dataTokenWeight,
                  baseToken,
                  baseTokenAmount,
                  baseTokenWeight,
                  swapFee
                )
                .estimateGas({ from: account }, function (err, estGas) {
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
            _b = (_a = pool.methods.setup(
              dataToken,
              dataTokenAmount,
              dataTokenWeight,
              baseToken,
              baseTokenAmount,
              baseTokenWeight,
              swapFee
            )).send
            _c = {
              from: account,
              gas: estGas
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_2 = _d.sent()
            this.logger.error(
              'ERROR: Failed to setup a pool: '.concat(e_2.message)
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.allowance = function (tokenAdress, owner, spender) {
    return __awaiter(this, void 0, void 0, function () {
      var tokenAbi, datatoken, trxReceipt
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            tokenAbi = DataTokenTemplate_json_1.default.abi
            datatoken = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(tokenAbi, tokenAdress, {
                from: spender
              }),
              this.config
            )
            return [4, datatoken.methods.allowance(owner, spender).call()]
          case 1:
            trxReceipt = _a.sent()
            return [2, this.web3.utils.fromWei(trxReceipt)]
        }
      })
    })
  }
  Pool.prototype.approve = function (
    account,
    tokenAddress,
    spender,
    amount,
    force
  ) {
    if (force === void 0) {
      force = false
    }
    return __awaiter(this, void 0, void 0, function () {
      var minABI,
        token,
        currentAllowence,
        result,
        gasLimitDefault,
        estGas,
        e_3,
        _a,
        _b,
        e_4
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            minABI = [
              {
                constant: false,
                inputs: [
                  {
                    name: '_spender',
                    type: 'address'
                  },
                  {
                    name: '_value',
                    type: 'uint256'
                  }
                ],
                name: 'approve',
                outputs: [
                  {
                    name: '',
                    type: 'bool'
                  }
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              }
            ]
            token = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(minABI, tokenAddress, {
                from: account
              }),
              this.config
            )
            if (!!force) return [3, 2]
            return [4, this.allowance(tokenAddress, account, spender)]
          case 1:
            currentAllowence = _d.sent()
            if (
              new decimal_js_1.default(
                this.web3.utils.toWei(currentAllowence)
              ).greaterThanOrEqualTo(amount)
            ) {
              return [2, currentAllowence]
            }
            _d.label = 2
          case 2:
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 3
          case 3:
            _d.trys.push([3, 5, , 6])
            return [
              4,
              token.methods
                .approve(spender, amount)
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 4:
            estGas = _d.sent()
            return [3, 6]
          case 5:
            e_3 = _d.sent()
            estGas = gasLimitDefault
            return [3, 6]
          case 6:
            _d.trys.push([6, 9, , 10])
            _b = (_a = token.methods.approve(spender, amount)).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 7:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 8:
            result = _d.sent()
            return [3, 10]
          case 9:
            e_4 = _d.sent()
            this.logger.error(
              'ERRPR: Failed to approve spender to spend tokens : '.concat(
                e_4.message
              )
            )
            return [3, 10]
          case 10:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.sharesBalance = function (account, poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var result, token, balance, e_5
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            token = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            return [4, token.methods.balanceOf(account).call()]
          case 2:
            balance = _a.sent()
            result = this.web3.utils.fromWei(balance)
            return [3, 4]
          case 3:
            e_5 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get shares of pool : '.concat(e_5.message)
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.addToPool = function (account, poolAddress, tokens) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, token, _i, tokens_1, _a, _b, e_6
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            ;(_i = 0), (tokens_1 = tokens)
            _d.label = 1
          case 1:
            if (!(_i < tokens_1.length)) return [3, 8]
            token = tokens_1[_i]
            _d.label = 2
          case 2:
            _d.trys.push([2, 6, , 7])
            return [
              4,
              this.approve(
                account,
                token.address,
                poolAddress,
                this.web3.utils.toWei(''.concat(token.amount))
              )
            ]
          case 3:
            _d.sent()
            _b = (_a = pool.methods.bind(
              token.address,
              this.web3.utils.toWei(token.amount),
              this.web3.utils.toWei(token.weight)
            )).send
            _c = {
              from: account,
              gas: this.GASLIMIT_DEFAULT
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 4:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 5:
            _d.sent()
            return [3, 7]
          case 6:
            e_6 = _d.sent()
            this.logger.error(
              'ERROR: Failed to add tokens to pool: '.concat(e_6.message)
            )
            return [3, 7]
          case 7:
            _i++
            return [3, 1]
          case 8:
            return [2]
        }
      })
    })
  }
  Pool.prototype.setSwapFee = function (account, poolAddress, fee) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, _a, _b, e_7
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            _d.label = 1
          case 1:
            _d.trys.push([1, 4, , 5])
            _b = (_a = pool.methods.setSwapFee(this.web3.utils.toWei(fee))).send
            _c = {
              from: account,
              gas: this.GASLIMIT_DEFAULT
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 2:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 3:
            result = _d.sent()
            return [3, 5]
          case 4:
            e_7 = _d.sent()
            this.logger.error(
              'ERROR: Failed to set pool swap fee: '.concat(e_7.message)
            )
            return [3, 5]
          case 5:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.finalize = function (account, poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, _a, _b, e_8
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            _d.label = 1
          case 1:
            _d.trys.push([1, 4, , 5])
            _b = (_a = pool.methods.finalize()).send
            _c = {
              from: account,
              gas: this.GASLIMIT_DEFAULT
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 2:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 3:
            result = _d.sent()
            return [3, 5]
          case 4:
            e_8 = _d.sent()
            this.logger.error(
              'ERROR: Failed to finalize pool: '.concat(e_8.message)
            )
            return [3, 5]
          case 5:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getNumTokens = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_9
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getNumTokens().call()]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_9 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get number of tokens: '.concat(e_9.message)
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getPoolSharesTotalSupply = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_10
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.totalSupply().call()]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_10 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get total supply of pool shares: '.concat(
                e_10.message
              )
            )
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.getCurrentTokens = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_11
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getCurrentTokens().call()]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_11 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get tokens composing this pool: '.concat(
                e_11.message
              )
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getFinalTokens = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_12
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getFinalTokens().call()]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_12 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get the final tokens composing this pool'
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getController = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_13
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getController().call()]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_13 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get pool controller address: '.concat(
                e_13.message
              )
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.setController = function (
    account,
    poolAddress,
    controllerAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_14
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .setController(controllerAddress)
                .send({ from: account, gas: this.GASLIMIT_DEFAULT })
            ]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_14 = _a.sent()
            this.logger.error(
              'ERROR: Failed to set pool controller: '.concat(e_14.message)
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.isBound = function (poolAddress, token) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_15
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.isBound(token).call()]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_15 = _a.sent()
            this.logger.error(
              'ERROR: Failed to check whether a token       bounded to a pool. '.concat(
                e_15.message
              )
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getReserve = function (poolAddress, token) {
    return __awaiter(this, void 0, void 0, function () {
      var amount, pool, result, e_16
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            return [4, pool.methods.getBalance(token).call()]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_16 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get how many tokens       are in the pool: '.concat(
                e_16.message
              )
            )
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.isFinalized = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, e_17
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            result = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.isFinalized().call()]
          case 2:
            result = _a.sent()
            return [3, 4]
          case 3:
            e_17 = _a.sent()
            this.logger.error(
              'ERROR: Failed to check whether pool is finalized: '.concat(
                e_17.message
              )
            )
            return [3, 4]
          case 4:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getSwapFee = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, fee, result, e_18
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            fee = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getSwapFee().call()]
          case 2:
            result = _a.sent()
            fee = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_18 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get pool fee: '.concat(e_18.message)
            )
            return [3, 4]
          case 4:
            return [2, fee]
        }
      })
    })
  }
  Pool.prototype.getNormalizedWeight = function (poolAddress, token) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, weight, result, e_19
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            weight = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getNormalizedWeight(token).call()]
          case 2:
            result = _a.sent()
            weight = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_19 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get normalized weight of a token: '.concat(
                e_19.message
              )
            )
            return [3, 4]
          case 4:
            return [2, weight]
        }
      })
    })
  }
  Pool.prototype.getDenormalizedWeight = function (poolAddress, token) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, weight, result, e_20
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            weight = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getDenormalizedWeight(token).call()]
          case 2:
            result = _a.sent()
            weight = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_20 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get denormalized weight of a token in pool'
            )
            return [3, 4]
          case 4:
            return [2, weight]
        }
      })
    })
  }
  Pool.prototype.getTotalDenormalizedWeight = function (poolAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, weight, result, e_21
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            weight = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getTotalDenormalizedWeight().call()]
          case 2:
            result = _a.sent()
            weight = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_21 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get total denormalized weight in pool'
            )
            return [3, 4]
          case 4:
            return [2, weight]
        }
      })
    })
  }
  Pool.prototype.swapExactAmountIn = function (
    account,
    poolAddress,
    tokenIn,
    tokenAmountIn,
    tokenOut,
    minAmountOut,
    maxPrice
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, gasLimitDefault, estGas, e_22, _a, _b, e_23
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .swapExactAmountIn(
                  tokenIn,
                  this.web3.utils.toWei(tokenAmountIn),
                  tokenOut,
                  this.web3.utils.toWei(minAmountOut),
                  maxPrice ? this.web3.utils.toWei(maxPrice) : MaxUint256
                )
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_22 = _d.sent()
            this.logger.log('Error estimate gas swapExactAmountIn')
            this.logger.log(e_22)
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.swapExactAmountIn(
              tokenIn,
              this.web3.utils.toWei(tokenAmountIn),
              tokenOut,
              this.web3.utils.toWei(minAmountOut),
              maxPrice ? this.web3.utils.toWei(maxPrice) : MaxUint256
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_23 = _d.sent()
            this.logger.error(
              'ERROR: Failed to swap exact amount in : '.concat(e_23.message)
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.swapExactAmountOut = function (
    account,
    poolAddress,
    tokenIn,
    maxAmountIn,
    tokenOut,
    minAmountOut,
    maxPrice
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, gasLimitDefault, estGas, e_24, _a, _b, e_25
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .swapExactAmountOut(
                  tokenIn,
                  this.web3.utils.toWei(maxAmountIn),
                  tokenOut,
                  this.web3.utils.toWei(minAmountOut),
                  maxPrice ? this.web3.utils.toWei(maxPrice) : MaxUint256
                )
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_24 = _d.sent()
            estGas = gasLimitDefault
            this.logger.log('Error estimate gas swapExactAmountIn')
            this.logger.log(e_24)
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.swapExactAmountOut(
              tokenIn,
              this.web3.utils.toWei(maxAmountIn),
              tokenOut,
              this.web3.utils.toWei(minAmountOut),
              maxPrice ? this.web3.utils.toWei(maxPrice) : MaxUint256
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_25 = _d.sent()
            this.logger.error(
              'ERROR: Failed to swap exact amount out: '.concat(e_25.message)
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.joinPool = function (
    account,
    poolAddress,
    poolAmountOut,
    maxAmountsIn
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool,
        weiMaxAmountsIn,
        amount,
        _i,
        maxAmountsIn_1,
        result,
        gasLimitDefault,
        estGas,
        e_26,
        _a,
        _b,
        e_27
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            weiMaxAmountsIn = []
            for (
              _i = 0, maxAmountsIn_1 = maxAmountsIn;
              _i < maxAmountsIn_1.length;
              _i++
            ) {
              amount = maxAmountsIn_1[_i]
              weiMaxAmountsIn.push(this.web3.utils.toWei(amount))
            }
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .joinPool(this.web3.utils.toWei(poolAmountOut), weiMaxAmountsIn)
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_26 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.joinPool(
              this.web3.utils.toWei(poolAmountOut),
              weiMaxAmountsIn
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_27 = _d.sent()
            this.logger.error(
              'ERROR: Failed to join pool: '.concat(e_27.message)
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.exitPool = function (
    account,
    poolAddress,
    poolAmountIn,
    minAmountsOut
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool,
        weiMinAmountsOut,
        amount,
        _i,
        minAmountsOut_1,
        result,
        gasLimitDefault,
        estGas,
        e_28,
        _a,
        _b,
        e_29
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            weiMinAmountsOut = []
            for (
              _i = 0, minAmountsOut_1 = minAmountsOut;
              _i < minAmountsOut_1.length;
              _i++
            ) {
              amount = minAmountsOut_1[_i]
              weiMinAmountsOut.push(this.web3.utils.toWei(amount))
            }
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .exitPool(this.web3.utils.toWei(poolAmountIn), weiMinAmountsOut)
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_28 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.exitPool(
              this.web3.utils.toWei(poolAmountIn),
              weiMinAmountsOut
            )).send
            _c = {
              from: account,
              gas: estGas
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_29 = _d.sent()
            this.logger.error(
              'ERROR: Failed to exit pool: '.concat(e_29.message)
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.joinswapExternAmountIn = function (
    account,
    poolAddress,
    tokenIn,
    tokenAmountIn,
    minPoolAmountOut
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, gasLimitDefault, estGas, e_30, _a, _b, e_31
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .joinswapExternAmountIn(
                  tokenIn,
                  this.web3.utils.toWei(tokenAmountIn),
                  this.web3.utils.toWei(minPoolAmountOut)
                )
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_30 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.joinswapExternAmountIn(
              tokenIn,
              this.web3.utils.toWei(tokenAmountIn),
              this.web3.utils.toWei(minPoolAmountOut)
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_31 = _d.sent()
            this.logger.error(
              'ERROR: Failed to pay tokens in order to       join the pool: '.concat(
                e_31.message
              )
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.joinswapPoolAmountOut = function (
    account,
    poolAddress,
    tokenIn,
    poolAmountOut,
    maxAmountIn
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, gasLimitDefault, estGas, e_32, _a, _b, e_33
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .joinswapPoolAmountOut(
                  tokenIn,
                  this.web3.utils.toWei(poolAmountOut),
                  this.web3.utils.toWei(maxAmountIn)
                )
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_32 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.joinswapPoolAmountOut(
              tokenIn,
              this.web3.utils.toWei(poolAmountOut),
              this.web3.utils.toWei(maxAmountIn)
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_33 = _d.sent()
            this.logger.error('ERROR: Failed to join swap pool amount out')
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.exitswapPoolAmountIn = function (
    account,
    poolAddress,
    tokenOut,
    poolAmountIn,
    minTokenAmountOut
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, result, gasLimitDefault, estGas, e_34, _a, _b, e_35
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .exitswapPoolAmountIn(
                  tokenOut,
                  this.web3.utils.toWei(poolAmountIn),
                  this.web3.utils.toWei(minTokenAmountOut)
                )
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_34 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.exitswapPoolAmountIn(
              tokenOut,
              this.web3.utils.toWei(poolAmountIn),
              this.web3.utils.toWei(minTokenAmountOut)
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_35 = _d.sent()
            this.logger.error(
              'ERROR: Failed to pay pool shares into the pool: '.concat(
                e_35.message
              )
            )
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.exitswapExternAmountOut = function (
    account,
    poolAddress,
    tokenOut,
    tokenAmountOut,
    maxPoolAmountIn
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var gasLimitDefault, pool, result, estGas, e_36, _a, _b, e_37
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress, {
                from: account
              }),
              this.config
            )
            result = null
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .exitswapExternAmountOut(
                  tokenOut,
                  this.web3.utils.toWei(tokenAmountOut),
                  this.web3.utils.toWei(maxPoolAmountIn)
                )
                .estimateGas({ from: account }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _d.sent()
            return [3, 4]
          case 3:
            e_36 = _d.sent()
            estGas = gasLimitDefault
            return [3, 4]
          case 4:
            _d.trys.push([4, 7, , 8])
            _b = (_a = pool.methods.exitswapExternAmountOut(
              tokenOut,
              this.web3.utils.toWei(tokenAmountOut),
              this.web3.utils.toWei(maxPoolAmountIn)
            )).send
            _c = {
              from: account,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3, this.config)]
          case 5:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 6:
            result = _d.sent()
            return [3, 8]
          case 7:
            e_37 = _d.sent()
            this.logger.error('ERROR: Failed to exitswapExternAmountOut')
            return [3, 8]
          case 8:
            return [2, result]
        }
      })
    })
  }
  Pool.prototype.getSpotPrice = function (poolAddress, tokenIn, tokenOut) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, price, result, e_38
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            price = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, pool.methods.getSpotPrice(tokenIn, tokenOut).call()]
          case 2:
            result = _a.sent()
            price = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_38 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get spot price of swapping tokenIn to tokenOut'
            )
            return [3, 4]
          case 4:
            return [2, price]
        }
      })
    })
  }
  Pool.prototype.getSpotPriceSansFee = function (
    poolAddress,
    tokenIn,
    tokenOut
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, price, result, e_39
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            price = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods.getSpotPriceSansFee(tokenIn, tokenOut).call()
            ]
          case 2:
            result = _a.sent()
            price = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_39 = _a.sent()
            this.logger.error('ERROR: Failed to getSpotPriceSansFee')
            return [3, 4]
          case 4:
            return [2, price]
        }
      })
    })
  }
  Pool.prototype.calcSpotPrice = function (
    poolAddress,
    tokenBalanceIn,
    tokenWeightIn,
    tokenBalanceOut,
    tokenWeightOut,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_40
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = '0'
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcSpotPrice(
                  this.web3.utils.toWei(tokenBalanceIn),
                  this.web3.utils.toWei(tokenWeightIn),
                  this.web3.utils.toWei(tokenBalanceOut),
                  this.web3.utils.toWei(tokenWeightOut),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_40 = _a.sent()
            this.logger.error('ERROR: Failed to call calcSpotPrice')
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.calcInGivenOut = function (
    poolAddress,
    tokenBalanceIn,
    tokenWeightIn,
    tokenBalanceOut,
    tokenWeightOut,
    tokenAmountOut,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_41
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            if (new decimal_js_1.default(tokenAmountOut).gte(tokenBalanceOut))
              return [2, null]
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcInGivenOut(
                  this.web3.utils.toWei(tokenBalanceIn),
                  this.web3.utils.toWei(tokenWeightIn),
                  this.web3.utils.toWei(tokenBalanceOut),
                  this.web3.utils.toWei(tokenWeightOut),
                  this.web3.utils.toWei(tokenAmountOut),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_41 = _a.sent()
            this.logger.error('ERROR: Failed to calcInGivenOut')
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.calcOutGivenIn = function (
    poolAddress,
    tokenBalanceIn,
    tokenWeightIn,
    tokenBalanceOut,
    tokenWeightOut,
    tokenAmountIn,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_42
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcOutGivenIn(
                  this.web3.utils.toWei(tokenBalanceIn),
                  this.web3.utils.toWei(tokenWeightIn),
                  this.web3.utils.toWei(tokenBalanceOut),
                  this.web3.utils.toWei(tokenWeightOut),
                  this.web3.utils.toWei(tokenAmountIn),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_42 = _a.sent()
            this.logger.error('ERROR: Failed to calcOutGivenIn')
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.calcPoolOutGivenSingleIn = function (
    poolAddress,
    tokenBalanceIn,
    tokenWeightIn,
    poolSupply,
    totalWeight,
    tokenAmountIn,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_43
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcPoolOutGivenSingleIn(
                  this.web3.utils.toWei(tokenBalanceIn),
                  this.web3.utils.toWei(tokenWeightIn),
                  this.web3.utils.toWei(poolSupply),
                  this.web3.utils.toWei(totalWeight),
                  this.web3.utils.toWei(tokenAmountIn),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_43 = _a.sent()
            this.logger.error(
              'ERROR: Failed to calculate PoolOutGivenSingleIn : '.concat(
                e_43.message
              )
            )
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.calcSingleInGivenPoolOut = function (
    poolAddress,
    tokenBalanceIn,
    tokenWeightIn,
    poolSupply,
    totalWeight,
    poolAmountOut,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_44
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcSingleInGivenPoolOut(
                  this.web3.utils.toWei(tokenBalanceIn),
                  this.web3.utils.toWei(tokenWeightIn),
                  this.web3.utils.toWei(poolSupply),
                  this.web3.utils.toWei(totalWeight),
                  this.web3.utils.toWei(poolAmountOut),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_44 = _a.sent()
            this.logger.error(
              'ERROR: Failed to calculate SingleInGivenPoolOut : '.concat(
                e_44.message
              )
            )
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.calcSingleOutGivenPoolIn = function (
    poolAddress,
    tokenBalanceOut,
    tokenWeightOut,
    poolSupply,
    totalWeight,
    poolAmountIn,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_45
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcSingleOutGivenPoolIn(
                  this.web3.utils.toWei(tokenBalanceOut),
                  this.web3.utils.toWei(tokenWeightOut),
                  this.web3.utils.toWei(poolSupply),
                  this.web3.utils.toWei(totalWeight),
                  this.web3.utils.toWei(poolAmountIn),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_45 = _a.sent()
            this.logger.error(
              'ERROR: Failed to calculate SingleOutGivenPoolIn : '.concat(
                e_45.message
              )
            )
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.calcPoolInGivenSingleOut = function (
    poolAddress,
    tokenBalanceOut,
    tokenWeightOut,
    poolSupply,
    totalWeight,
    tokenAmountOut,
    swapFee
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var pool, amount, result, e_46
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            pool = (0, utils_1.setContractDefaults)(
              new this.web3.eth.Contract(this.poolABI, poolAddress),
              this.config
            )
            amount = null
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              pool.methods
                .calcPoolInGivenSingleOut(
                  this.web3.utils.toWei(tokenBalanceOut),
                  this.web3.utils.toWei(tokenWeightOut),
                  this.web3.utils.toWei(poolSupply),
                  this.web3.utils.toWei(totalWeight),
                  this.web3.utils.toWei(tokenAmountOut),
                  this.web3.utils.toWei(swapFee)
                )
                .call()
            ]
          case 2:
            result = _a.sent()
            amount = this.web3.utils.fromWei(result)
            return [3, 4]
          case 3:
            e_46 = _a.sent()
            this.logger.error(
              'ERROR: Failed to calculate PoolInGivenSingleOut : '.concat(
                e_46.message
              )
            )
            return [3, 4]
          case 4:
            return [2, amount]
        }
      })
    })
  }
  Pool.prototype.getSwapEventSignature = function () {
    var abi = this.poolABI
    var eventdata = abi.find(function (o) {
      if (o.name === 'LOG_SWAP' && o.type === 'event') return o
    })
    var topic = this.web3.eth.abi.encodeEventSignature(eventdata)
    return topic
  }
  Pool.prototype.getJoinEventSignature = function () {
    var abi = this.poolABI
    var eventdata = abi.find(function (o) {
      if (o.name === 'LOG_JOIN' && o.type === 'event') return o
    })
    var topic = this.web3.eth.abi.encodeEventSignature(eventdata)
    return topic
  }
  Pool.prototype.getExitEventSignature = function () {
    var abi = this.poolABI
    var eventdata = abi.find(function (o) {
      if (o.name === 'LOG_EXIT' && o.type === 'event') return o
    })
    var topic = this.web3.eth.abi.encodeEventSignature(eventdata)
    return topic
  }
  return Pool
})(PoolFactory_1.PoolFactory)
exports.Pool = Pool
//# sourceMappingURL=Pool.js.map
