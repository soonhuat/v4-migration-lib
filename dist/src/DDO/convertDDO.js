'use strict'
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
Object.defineProperty(exports, '__esModule', { value: true })
exports.getAndConvertDDO = exports.convertDDO = void 0
var importDDO_1 = require('./importDDO')
function convertDDO(v4Did, v3DDO, nftAddress, erc20Address, encryptedFiles) {
  return __awaiter(this, void 0, void 0, function () {
    var publishedDate, computeOptions, newMetadata, newService, v4DDO
    return __generator(this, function (_a) {
      publishedDate = new Date(Date.now()).toISOString().split('.')[0] + 'Z'
      computeOptions = {
        namespace: '',
        allowRawAlgorithm: false,
        allowNetworkAccess: true,
        publisherTrustedAlgorithmPublishers: null,
        publisherTrustedAlgorithms: null
      }
      newMetadata = {
        created: publishedDate,
        updated: publishedDate,
        type: v3DDO.service[0].attributes.main.type,
        name: v3DDO.service[0].attributes.main.name,
        description:
          v3DDO.service[0].attributes.additionalInformation.description,
        tags: v3DDO.service[0].attributes.additionalInformation.tags,
        author: v3DDO.service[0].attributes.main.author,
        license: v3DDO.service[0].attributes.main.license,
        links: v3DDO.service[0].attributes.additionalInformation.links.url,
        additionalInformation: {
          termsAndConditions:
            v3DDO.service[0].attributes.additionalInformation.termsAndConditions
        }
      }
      newService = __assign(
        {
          id: v4Did,
          type: v3DDO.service[1].type,
          files: encryptedFiles || '',
          datatokenAddress: erc20Address,
          serviceEndpoint: v3DDO.service[1].serviceEndpoint,
          timeout: v3DDO.service[1].attributes.main.timeout
        },
        v3DDO.service[1].type === 'compute' && {
          compute: computeOptions
        }
      )
      v4DDO = {
        '@context': ['https://w3id.org/did/v1'],
        id: v4Did,
        version: '4.0.0',
        chainId: v3DDO.chainId,
        nftAddress: nftAddress,
        metadata: newMetadata,
        services: [newService]
      }
      return [2, v4DDO]
    })
  })
}
exports.convertDDO = convertDDO
function getAndConvertDDO(
  v3Did,
  v4Did,
  nftAddress,
  erc20Address,
  metadataCacheUri,
  encryptedFiles
) {
  return __awaiter(this, void 0, void 0, function () {
    var v3DDO, v4DDO
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4, (0, importDDO_1.getDDO)(v3Did, metadataCacheUri)]
        case 1:
          v3DDO = _a.sent()
          return [
            4,
            convertDDO(v4Did, v3DDO, nftAddress, erc20Address, encryptedFiles)
          ]
        case 2:
          v4DDO = _a.sent()
          return [2, v4DDO]
      }
    })
  })
}
exports.getAndConvertDDO = getAndConvertDDO
//# sourceMappingURL=convertDDO.js.map
