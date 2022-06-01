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
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var decimal_js_1 = __importDefault(require('decimal.js'))
/**
 * Account information.
 */
var Account = /** @class */ (function (_super) {
  __extends(Account, _super)
  function Account(id, config) {
    if (id === void 0) {
      id = '0x0'
    }
    var _this = _super.call(this) || this
    _this.id = id
    if (config) {
      _this.setInstanceConfig(config)
    }
    return _this
  }
  Account.prototype.getId = function () {
    return this.id
  }
  Account.prototype.setId = function (id) {
    this.id = id
  }
  /**
   * Set account password.
   * @param {string} password Password for account.
   */
  Account.prototype.setPassword = function (password) {
    this.password = password
  }
  /**
   * Returns account password.
   * @return {string} Account password.
   */
  Account.prototype.getPassword = function () {
    return this.password
  }
  // TODO - Check with Samer if authentificate is still needed or we can use sign
  /**
       * Set account token.
       * @param {string} token Token for account.
       
      public setToken(token: string): void {
          this.token = token
      }
      */
  /**
       * Returns account token.
       * @return {Promise<string>} Account token.
       
      public async getToken(): Promise<string> {
          return this.token || this.ocean.auth.restore(this)
      }
      */
  /**
       * Returns if account token is stored.
       * @return {Promise<boolean>} Is stored.
       
      public isTokenStored(): Promise<boolean> {
          return this.ocean.auth.isStored(this)
      }
      */
  /**
       * Authenticate the account.
       
      public authenticate() {
          return this.ocean.auth.store(this)
      }
      */
  /**
   * Balance of Any Token (converted from wei).
   * @return {Promise<string>}
   */
  Account.prototype.getTokenBalance = function (TokenAdress) {
    return __awaiter(this, void 0, void 0, function () {
      var minABI, result, decimals, token, balance, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (TokenAdress === null) return [2 /*return*/, null]
            minABI = [
              {
                constant: true,
                inputs: [
                  {
                    name: '_owner',
                    type: 'address'
                  }
                ],
                name: 'balanceOf',
                outputs: [
                  {
                    name: 'balance',
                    type: 'uint256'
                  }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              }
            ]
            result = null
            return [4 /*yield*/, this.getTokenDecimals(TokenAdress)]
          case 1:
            decimals = _a.sent()
            _a.label = 2
          case 2:
            _a.trys.push([2, 4, , 5])
            token = new this.web3.eth.Contract(minABI, TokenAdress, {
              from: this.id
            })
            return [4 /*yield*/, token.methods.balanceOf(this.id).call()]
          case 3:
            balance = _a.sent()
            result = new decimal_js_1.default(balance)
              .div(Math.pow(10, decimals))
              .toString()
            return [3 /*break*/, 5]
          case 4:
            e_1 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get the balance: '.concat(e_1.message)
            )
            return [3 /*break*/, 5]
          case 5:
            return [2 /*return*/, result]
        }
      })
    })
  }
  /**
   * Decimals of Any Token
   * @return {Promise<number>}
   */
  Account.prototype.getTokenDecimals = function (TokenAdress) {
    return __awaiter(this, void 0, void 0, function () {
      var decimals, minABI, token, e_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            decimals = 18
            if (TokenAdress === null) return [2 /*return*/, decimals]
            minABI = [
              {
                constant: true,
                inputs: [],
                name: 'decimals',
                outputs: [{ name: '', type: 'uint8' }],
                type: 'function'
              }
            ]
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            token = new this.web3.eth.Contract(minABI, TokenAdress, {
              from: this.id
            })
            return [4 /*yield*/, token.methods.decimals().call()]
          case 2:
            decimals = _a.sent()
            return [3 /*break*/, 4]
          case 3:
            e_2 = _a.sent()
            this.logger.error(
              'ERROR: Failed to get decimals : '.concat(e_2.message)
            )
            return [3 /*break*/, 4]
          case 4:
            return [2 /*return*/, decimals]
        }
      })
    })
  }
  /**
   * Balance of Ocean Token. (converted from wei).
   * @return {Promise<string>}
   */
  Account.prototype.getOceanBalance = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          this.getTokenBalance(this.config.oceanTokenAddress)
        ]
      })
    })
  }
  /**
   * Symbol of a Token
   * @return {Promise<string>}
   */
  Account.prototype.getTokenSymbol = function (TokenAdress) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        // TO DO
        return [2 /*return*/, '']
      })
    })
  }
  /**
   * Balance of Ether.(converted from wei).
   * @return {Promise<string>}
   */
  Account.prototype.getEtherBalance = function () {
    return __awaiter(this, void 0, void 0, function () {
      var result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.web3.eth.getBalance(this.id, 'latest')]
          case 1:
            result = _a.sent()
            return [2 /*return*/, this.web3.utils.fromWei(result)]
        }
      })
    })
  }
  return Account
})(Instantiable_abstract_1.Instantiable)
exports.default = Account
//# sourceMappingURL=Account.js.map
