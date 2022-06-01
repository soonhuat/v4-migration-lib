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
exports.ContractBase = void 0
var ContractHandler_1 = __importDefault(require('../ContractHandler'))
var Instantiable_abstract_1 = require('../../Instantiable.abstract')
var ContractBase = /** @class */ (function (_super) {
  __extends(ContractBase, _super)
  function ContractBase(contractName, optional) {
    if (optional === void 0) {
      optional = false
    }
    var _this = _super.call(this) || this
    _this.optional = optional
    _this.contract = null
    _this.contractName = contractName
    return _this
  }
  Object.defineProperty(ContractBase.prototype, 'address', {
    get: function () {
      return this.contract.options.address
    },
    enumerable: false,
    configurable: true
  })
  ContractBase.prototype.getEventData = function (eventName, options) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (!this.contract.events[eventName]) {
          throw new Error(
            'Event "'
              .concat(eventName, '" not found on contract "')
              .concat(this.contractName, '"')
          )
        }
        return [2 /*return*/, this.contract.getPastEvents(eventName, options)]
      })
    })
  }
  ContractBase.prototype.getPastEvents = function (eventName, filter) {
    return this.getEventData(eventName, {
      filter: filter,
      fromBlock: 0,
      toBlock: 'latest'
    })
  }
  ContractBase.prototype.getAddress = function () {
    return this.contract.options.address
  }
  ContractBase.prototype.getSignatureOfMethod = function (methodName) {
    var foundMethod = this.searchMethod(methodName)
    return foundMethod.signature
  }
  ContractBase.prototype.getInputsOfMethod = function (methodName) {
    var foundMethod = this.searchMethod(methodName)
    return foundMethod.inputs
  }
  ContractBase.prototype.init = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      var contractHandler, _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            this.setInstanceConfig(config)
            contractHandler = new ContractHandler_1.default(config)
            _a = this
            return [
              4 /*yield*/,
              contractHandler.get(this.contractName, this.optional)
            ]
          case 1:
            _a.contract = _b.sent()
            return [2 /*return*/]
        }
      })
    })
  }
  ContractBase.prototype.getFromAddress = function (from) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!!from) return [3 /*break*/, 2]
            return [4 /*yield*/, this.web3.eth.getAccounts()]
          case 1:
            from = _a.sent()[0]
            _a.label = 2
          case 2:
            return [2 /*return*/, from]
        }
      })
    })
  }
  ContractBase.prototype.sendFrom = function (name, args, from) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.getFromAddress(from)]
          case 1:
            from = _a.sent()
            return [2 /*return*/, this.send(name, from, args)]
        }
      })
    })
  }
  ContractBase.prototype.send = function (name, from, args) {
    return __awaiter(this, void 0, void 0, function () {
      var method, methodInstance, estimatedGas, tx, err_1, mappedArgs
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.contract.methods[name]) {
              throw new Error(
                'Method "'
                  .concat(name, '" is not part of contract "')
                  .concat(this.contractName, '"')
              )
            }
            method = this.contract.methods[name]
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            methodInstance = method.apply(void 0, args)
            return [
              4 /*yield*/,
              methodInstance.estimateGas(args, {
                from: from
              })
            ]
          case 2:
            estimatedGas = _a.sent()
            tx = methodInstance.send({
              from: from,
              gas: estimatedGas
            })
            return [2 /*return*/, tx]
          case 3:
            err_1 = _a.sent()
            mappedArgs = this.searchMethod(name, args).inputs.map(function (
              input,
              i
            ) {
              return {
                name: input.name,
                value: args[i]
              }
            })
            this.logger.error('-'.repeat(40))
            this.logger.error(
              'Sending transaction "'
                .concat(name, '" on contract "')
                .concat(this.contractName, '" failed.')
            )
            this.logger.error('Error: '.concat(err_1.message))
            this.logger.error('From: '.concat(from))
            this.logger.error(
              'Parameters: '.concat(JSON.stringify(mappedArgs, null, 2))
            )
            this.logger.error('-'.repeat(40))
            throw err_1
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  ContractBase.prototype.call = function (name, args, from) {
    return __awaiter(this, void 0, void 0, function () {
      var method
      var _a
      return __generator(this, function (_b) {
        if (!this.contract.methods[name]) {
          throw new Error(
            'Method '
              .concat(name, ' is not part of contract ')
              .concat(this.contractName)
          )
        }
        // Logger.log(name)
        try {
          method = (_a = this.contract.methods)[name].apply(_a, args)
          return [2 /*return*/, method.call(from ? { from: from } : null)]
        } catch (err) {
          this.logger.error(
            'Calling method "'
              .concat(name, '" on contract "')
              .concat(this.contractName, '" failed. Args: ')
              .concat(args),
            err
          )
          throw err
        }
        return [2 /*return*/]
      })
    })
  }
  // protected getEvent(eventName: string, filter: { [key: string]: any }) {
  //     if (!this.contract.events[eventName]) {
  //         throw new Error(
  //             `Event ${eventName} is not part of contract ${this.contractName}`
  //         )
  //     }
  //     return this.ocean.keeper.utils.eventHandler.getEvent(this, eventName, filter)
  // }
  ContractBase.prototype.searchMethod = function (methodName, args) {
    if (args === void 0) {
      args = []
    }
    var methods = this.contract.options.jsonInterface
      .map(function (method) {
        return __assign(__assign({}, method), { signature: method.signature })
      })
      .filter(function (method) {
        return method.name === methodName
      })
    var foundMethod =
      methods.find(function (_a) {
        var inputs = _a.inputs
        return inputs.length === args.length
      }) || methods[0]
    if (!foundMethod) {
      throw new Error(
        'Method "'
          .concat(methodName, '" is not part of contract "')
          .concat(this.contractName, '"')
      )
    }
    return foundMethod
  }
  ContractBase.instance = null
  return ContractBase
})(Instantiable_abstract_1.Instantiable)
exports.ContractBase = ContractBase
exports.default = ContractBase
//# sourceMappingURL=ContractBase.js.map
