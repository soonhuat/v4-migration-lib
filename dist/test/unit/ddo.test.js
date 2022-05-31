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
var console_1 = require('console')
var importDDO_1 = require('../../src/DDO/importDDO')
var convertDDO_1 = require('../../src/DDO/convertDDO')
var did1 = 'did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38'
var did2 = 'did:op:a2B8b3aC4207CFCCbDe4Ac7fa40214fd00A2BA71'
var did3 = 'did:op:50C48d3eE0Ed47479d3e2599FAe0076965cBD39c'
var nftAddress = ''
var erc20Address = ''
var metadataCacheUri = 'https://aquarius.oceanprotocol.com'
describe('Imports V3 DDO', function () {
  it('Imports 1st DDO', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var ddo1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, importDDO_1.getDDO)(did1, metadataCacheUri)]
          case 1:
            ddo1 = _a.sent()
            ;(0,
            console_1.assert)(ddo1.service[0].attributes.main.name === '🖼  DataUnion.app - Image & Annotation Vault  📸')
            ;(0, console_1.assert)(ddo1.service[1].type === 'access')
            return [2]
        }
      })
    })
  })
  it('Imports 2nd DDO', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var ddo2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, importDDO_1.getDDO)(did2, metadataCacheUri)]
          case 1:
            ddo2 = _a.sent()
            ;(0,
            console_1.assert)(ddo2.service[0].attributes.main.name === 'Product Pages of 1’044’709 Products on Amazon.com (processed data)')
            ;(0, console_1.assert)(ddo2.service[1].type === 'access')
            return [2]
        }
      })
    })
  })
  it('Imports 3rd DDO', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var ddo3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, importDDO_1.getDDO)(did3, metadataCacheUri)]
          case 1:
            ddo3 = _a.sent()
            ;(0,
            console_1.assert)(ddo3.service[0].attributes.main.name === 'Posthuman: DistilBERT QA inference Algo v2')
            ;(0, console_1.assert)(ddo3.service[1].type === 'access')
            return [2]
        }
      })
    })
  })
})
describe('Converts V3 DDO to V4 DDO', function () {
  it('Converts 1st DDO', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var ddo1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              (0, convertDDO_1.getAndConvertDDO)(
                did1,
                '1234567890',
                nftAddress,
                erc20Address,
                metadataCacheUri,
                'XNOIDOIJFDIJOFDMKLPLLKDAS'
              )
            ]
          case 1:
            ddo1 = _a.sent()
            ;(0,
            console_1.assert)(ddo1.metadata.name === '🖼  DataUnion.app - Image & Annotation Vault  📸')
            ;(0, console_1.assert)(ddo1.metadata.type === 'dataset')
            return [2]
        }
      })
    })
  })
  it('Converts 2nd DDO', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var ddo2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              (0, convertDDO_1.getAndConvertDDO)(
                did2,
                '1234567890',
                nftAddress,
                erc20Address,
                metadataCacheUri,
                'XNOIDOIJFDIJOFDMKLPLLKDAS'
              )
            ]
          case 1:
            ddo2 = _a.sent()
            ;(0,
            console_1.assert)(ddo2.metadata.name === 'Product Pages of 1’044’709 Products on Amazon.com (processed data)')
            ;(0, console_1.assert)(ddo2.metadata.type === 'dataset')
            return [2]
        }
      })
    })
  })
  it('Converts 3rd DDO', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var ddo3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              (0, convertDDO_1.getAndConvertDDO)(
                did3,
                '1234567890',
                nftAddress,
                erc20Address,
                metadataCacheUri,
                'XNOIDOIJFDIJOFDMKLPLLKDAS'
              )
            ]
          case 1:
            ddo3 = _a.sent()
            ;(0,
            console_1.assert)(ddo3.metadata.name === 'Posthuman: DistilBERT QA inference Algo v2')
            ;(0, console_1.assert)(ddo3.metadata.type === 'algorithm')
            return [2]
        }
      })
    })
  })
})
//# sourceMappingURL=ddo.test.js.map
