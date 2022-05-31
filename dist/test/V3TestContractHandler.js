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
exports.TestContractHandler = void 0
var communityCollector = '0xeE9300b7961e0a01d9f0adb863C7A227A07AaD75'
var TestContractHandler = (function () {
  function TestContractHandler(
    factoryABI,
    datatokensABI,
    templateBytecode,
    factoryBytecode,
    web3
  ) {
    this.web3 = web3
    this.factory = new this.web3.eth.Contract(factoryABI)
    this.template = new this.web3.eth.Contract(datatokensABI)
    this.templateBytecode = templateBytecode
    this.factoryBytecode = factoryBytecode
  }
  TestContractHandler.prototype.getAccounts = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this
            return [4, this.web3.eth.getAccounts()]
          case 1:
            _a.accounts = _b.sent()
            return [2, this.accounts]
        }
      })
    })
  }
  TestContractHandler.prototype.deployContracts = function (minter) {
    return __awaiter(this, void 0, void 0, function () {
      var estGas, blob, cap, _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            blob = 'https://example.com/dataset-1'
            cap = 1400000000
            return [
              4,
              this.template
                .deploy({
                  data: this.templateBytecode,
                  arguments: [
                    'Template Contract',
                    'TEMPLATE',
                    minter,
                    cap,
                    blob,
                    communityCollector
                  ]
                })
                .estimateGas(function (err, estGas) {
                  if (err) console.log('DeployContracts: ' + err)
                  return estGas
                })
            ]
          case 1:
            estGas = _c.sent()
            _a = this
            return [
              4,
              this.template
                .deploy({
                  data: this.templateBytecode,
                  arguments: [
                    'Template Contract',
                    'TEMPLATE',
                    minter,
                    cap,
                    blob,
                    communityCollector
                  ]
                })
                .send({
                  from: minter,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 2:
            _a.templateAddress = _c.sent()
            return [
              4,
              this.factory
                .deploy({
                  data: this.factoryBytecode,
                  arguments: [this.templateAddress, communityCollector]
                })
                .estimateGas(function (err, estGas) {
                  if (err) console.log('DeployContracts: ' + err)
                  return estGas
                })
            ]
          case 3:
            estGas = _c.sent()
            _b = this
            return [
              4,
              this.factory
                .deploy({
                  data: this.factoryBytecode,
                  arguments: [this.templateAddress, communityCollector]
                })
                .send({
                  from: minter,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 4:
            _b.factoryAddress = _c.sent()
            return [2]
        }
      })
    })
  }
  return TestContractHandler
})()
exports.TestContractHandler = TestContractHandler
//# sourceMappingURL=V3TestContractHandler.js.map
