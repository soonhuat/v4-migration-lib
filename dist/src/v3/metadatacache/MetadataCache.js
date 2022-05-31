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
exports.MetadataCache = void 0
var DDO_1 = require('../ddo/DDO')
var DID_1 = __importDefault(require('../ocean/DID'))
var utils_1 = require('../utils')
var WebServiceConnector_1 = require('../ocean/utils/WebServiceConnector')
var cross_fetch_1 = require('cross-fetch')
var apiPath = '/api/v1/aquarius/assets/ddo'
var MetadataCache = (function () {
  function MetadataCache(metadataCacheUri, logger, requestTimeout) {
    this.fetch = new WebServiceConnector_1.WebServiceConnector(
      logger,
      requestTimeout
    )
    this.logger = logger
    this.metadataCacheUri = metadataCacheUri
  }
  Object.defineProperty(MetadataCache.prototype, 'url', {
    get: function () {
      return this.metadataCacheUri
    },
    enumerable: false,
    configurable: true
  })
  MetadataCache.prototype.getVersionInfo = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.fetch.get(this.url)]
          case 1:
            return [2, _a.sent().json()]
        }
      })
    })
  }
  MetadataCache.prototype.getAccessUrl = function (accessToken, payload) {
    return __awaiter(this, void 0, void 0, function () {
      var accessUrl
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              this.fetch
                .post(
                  ''
                    .concat(accessToken.service_endpoint, '/')
                    .concat(accessToken.resource_id),
                  payload
                )
                .then(function (response) {
                  if (response.ok) {
                    return response.text()
                  }
                  _this.logger.error(
                    'Failed: ',
                    response.status,
                    response.statusText
                  )
                  return null
                })
                .then(function (consumptionUrl) {
                  _this.logger.error(
                    'Success accessing consume endpoint: ',
                    consumptionUrl
                  )
                  return consumptionUrl
                })
                .catch(function (error) {
                  _this.logger.error(
                    'Error fetching the data asset consumption url: ',
                    error
                  )
                  return null
                })
            ]
          case 1:
            accessUrl = _a.sent()
            return [2, accessUrl]
        }
      })
    })
  }
  MetadataCache.prototype.queryMetadata = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      var result
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              this.fetch
                .post(
                  ''.concat(this.url, '/api/v1/aquarius/assets/query'),
                  JSON.stringify(query)
                )
                .then(function (response) {
                  if (response.ok) {
                    return response.json()
                  }
                  _this.logger.error(
                    'queryMetadata failed:',
                    response.status,
                    response.statusText
                  )
                  return null
                })
                .then(function (results) {
                  return results
                })
                .catch(function (error) {
                  _this.logger.error(
                    'Error fetching querying metadata: ',
                    error
                  )
                  return null
                })
            ]
          case 1:
            result = _a.sent()
            return [2, result]
        }
      })
    })
  }
  MetadataCache.prototype.encryptDDO = function (ddo) {
    return __awaiter(this, void 0, void 0, function () {
      var fullUrl, result
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            fullUrl = ''.concat(
              this.url,
              '/api/v1/aquarius/assets/ddo/encryptashex '
            )
            return [
              4,
              this.fetch
                .postWithOctet(fullUrl, ddo)
                .then(function (response) {
                  if (response.ok) {
                    return response.text()
                  }
                  _this.logger.error(
                    'encryptDDO failed:',
                    response.status,
                    response.statusText,
                    ddo
                  )
                  return null
                })
                .catch(function (error) {
                  _this.logger.error('Error encryptDDO: ', error)
                  return null
                })
            ]
          case 1:
            result = _a.sent()
            return [2, result]
        }
      })
    })
  }
  MetadataCache.prototype.validateMetadata = function (metadata) {
    return __awaiter(this, void 0, void 0, function () {
      var status, path, response, errors, error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            status = {
              valid: false
            }
            path = (0, utils_1.isDdo)(metadata)
              ? '/validate-remote'
              : '/validate'
            _a.label = 1
          case 1:
            _a.trys.push([1, 6, , 7])
            return [
              4,
              this.fetch.post(
                ''.concat(this.url).concat(apiPath).concat(path),
                JSON.stringify(metadata)
              )
            ]
          case 2:
            response = _a.sent()
            if (!response.ok) return [3, 4]
            return [4, response.json()]
          case 3:
            errors = _a.sent()
            if (errors === true) status.valid = true
            else status.errors = errors
            return [3, 5]
          case 4:
            this.logger.error(
              'validate Metadata failed:',
              response.status,
              response.statusText
            )
            _a.label = 5
          case 5:
            return [3, 7]
          case 6:
            error_1 = _a.sent()
            this.logger.error('Error validating metadata: ', error_1)
            return [3, 7]
          case 7:
            return [2, status]
        }
      })
    })
  }
  MetadataCache.prototype.retrieveDDO = function (
    did,
    metadataServiceEndpoint
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var fullUrl, result
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            did = did && DID_1.default.parse(did)
            fullUrl =
              metadataServiceEndpoint ||
              ''.concat(this.url).concat(apiPath, '/').concat(did.getDid())
            return [
              4,
              this.fetch
                .get(fullUrl)
                .then(function (response) {
                  if (response.ok) {
                    return response.json()
                  }
                  _this.logger.log(
                    'retrieveDDO failed:',
                    response.status,
                    response.statusText,
                    did
                  )
                  return null
                })
                .then(function (response) {
                  return new DDO_1.DDO(response)
                })
                .catch(function (error) {
                  _this.logger.error(
                    'Error fetching querying metadata: ',
                    error
                  )
                  return null
                })
            ]
          case 1:
            result = _a.sent()
            return [2, result]
        }
      })
    })
  }
  MetadataCache.prototype.retrieveDDOByUrl = function (
    metadataServiceEndpoint
  ) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2, this.retrieveDDO(undefined, metadataServiceEndpoint)]
      })
    })
  }
  MetadataCache.prototype.getServiceEndpoint = function (did) {
    return ''
      .concat(this.url, '/api/v1/aquarius/assets/ddo/did:op:')
      .concat(did.getId())
  }
  MetadataCache.prototype.getURI = function () {
    return ''.concat(this.url)
  }
  MetadataCache.prototype.sleep = function (ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms)
    })
  }
  MetadataCache.prototype.waitForAqua = function (did, txid) {
    return __awaiter(this, void 0, void 0, function () {
      var apiPath, tries, result, ddo, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            apiPath = '/api/v1/aquarius/assets/ddo'
            tries = 0
            _a.label = 1
          case 1:
            _a.trys.push([1, 6, , 7])
            return [
              4,
              (0, cross_fetch_1.fetch)(this.getURI() + apiPath + '/' + did)
            ]
          case 2:
            result = _a.sent()
            if (!result.ok) return [3, 5]
            if (!txid) return [3, 4]
            return [4, result.json()]
          case 3:
            ddo = _a.sent()
            if (ddo.event && ddo.event.txid === txid) return [3, 10]
            return [3, 5]
          case 4:
            return [3, 10]
          case 5:
            return [3, 7]
          case 6:
            e_1 = _a.sent()
            return [3, 7]
          case 7:
            return [4, this.sleep(1500)]
          case 8:
            _a.sent()
            tries++
            _a.label = 9
          case 9:
            if (tries < 100) return [3, 1]
            _a.label = 10
          case 10:
            return [2]
        }
      })
    })
  }
  return MetadataCache
})()
exports.MetadataCache = MetadataCache
//# sourceMappingURL=MetadataCache.js.map
