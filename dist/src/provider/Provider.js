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
exports.V4ProviderInstance = exports.Provider = void 0
var utils_1 = require('./utils')
var cross_fetch_1 = __importDefault(require('cross-fetch'))
var Provider = /** @class */ (function () {
  function Provider() {}
  /**
   * Returns the provider endpoints
   * @return {Promise<ServiceEndpoint[]>}
   */
  Provider.prototype.getEndpoints = function (providerUri) {
    return __awaiter(this, void 0, void 0, function () {
      var endpoints, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4])
            return [4 /*yield*/, (0, utils_1.getData)(providerUri)]
          case 1:
            endpoints = _a.sent()
            return [4 /*yield*/, endpoints.json()]
          case 2:
            return [2 /*return*/, _a.sent()]
          case 3:
            e_1 = _a.sent()
            utils_1.LoggerInstance.error(
              'Finding the service endpoints failed:',
              e_1
            )
            return [2 /*return*/, null]
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  Provider.prototype.getEndpointURL = function (
    servicesEndpoints,
    serviceName
  ) {
    if (!servicesEndpoints) return null
    return servicesEndpoints.find(function (s) {
      return s.serviceName === serviceName
    })
  }
  /**
   * Returns the service endpoints that exist in provider.
   * @param {any} endpoints
   * @return {Promise<ServiceEndpoint[]>}
   */
  Provider.prototype.getServiceEndpoints = function (
    providerEndpoint,
    endpoints
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var serviceEndpoints, i, endpoint
      return __generator(this, function (_a) {
        serviceEndpoints = []
        for (i in endpoints.serviceEndpoints) {
          endpoint = {
            serviceName: i,
            method: endpoints.serviceEndpoints[i][0],
            urlPath: providerEndpoint + endpoints.serviceEndpoints[i][1]
          }
          serviceEndpoints.push(endpoint)
        }
        return [2 /*return*/, serviceEndpoints]
      })
    })
  }
  /** Encrypt DDO using the Provider's own symmetric key
   * @param {string} providerUri provider uri address
   * @param {string} consumerAddress Publisher address
   * @param {AbortSignal} signal abort signal
   * @param {string} providerEndpoints Identifier of the asset to be registered in ocean
   * @param {string} serviceEndpoints document description object (DDO)=
   * @return {Promise<string>} urlDetails
   */
  Provider.prototype.getNonce = function (
    providerUri,
    consumerAddress,
    signal,
    providerEndpoints,
    serviceEndpoints
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var path, response, _a, e_2
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!!providerEndpoints) return [3 /*break*/, 2]
            return [4 /*yield*/, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _b.sent()
            _b.label = 2
          case 2:
            if (!!serviceEndpoints) return [3 /*break*/, 4]
            return [
              4 /*yield*/,
              this.getServiceEndpoints(providerUri, providerEndpoints)
            ]
          case 3:
            serviceEndpoints = _b.sent()
            _b.label = 4
          case 4:
            path = this.getEndpointURL(serviceEndpoints, 'nonce')
              ? this.getEndpointURL(serviceEndpoints, 'nonce').urlPath
              : null
            if (!path) return [2 /*return*/, null]
            _b.label = 5
          case 5:
            _b.trys.push([5, 8, , 9])
            return [
              4 /*yield*/,
              (0, cross_fetch_1.default)(
                path + '?userAddress='.concat(consumerAddress),
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  signal: signal
                }
              )
            ]
          case 6:
            response = _b.sent()
            _a = String
            return [4 /*yield*/, response.json()]
          case 7:
            return [2 /*return*/, _a.apply(void 0, [_b.sent().nonce])]
          case 8:
            e_2 = _b.sent()
            utils_1.LoggerInstance.error(e_2)
            throw new Error('HTTP request failed')
          case 9:
            return [2 /*return*/]
        }
      })
    })
  }
  /** Encrypt data using the Provider's own symmetric key
   * @param {string} data data in json format that needs to be sent , it can either be a DDO or a File array
   * @param {string} providerUri provider uri address
   * @param {AbortSignal} signal abort signal
   * @return {Promise<string>} urlDetails
   */
  Provider.prototype.encrypt = function (data, providerUri, signal) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints, serviceEndpoints, path, response, e_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [
              4 /*yield*/,
              this.getServiceEndpoints(providerUri, providerEndpoints)
            ]
          case 2:
            serviceEndpoints = _a.sent()
            path = this.getEndpointURL(serviceEndpoints, 'encrypt')
              ? this.getEndpointURL(serviceEndpoints, 'encrypt').urlPath
              : null
            if (!path) return [2 /*return*/, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 6, , 7])
            return [
              4 /*yield*/,
              (0, cross_fetch_1.default)(path, {
                method: 'POST',
                body: decodeURI(JSON.stringify(data)),
                headers: {
                  'Content-Type': 'application/octet-stream'
                },
                signal: signal
              })
            ]
          case 4:
            response = _a.sent()
            return [4 /*yield*/, response.text()]
          case 5:
            return [2 /*return*/, _a.sent()]
          case 6:
            e_3 = _a.sent()
            utils_1.LoggerInstance.error(e_3)
            throw new Error('HTTP request failed')
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  return Provider
})()
exports.Provider = Provider
exports.V4ProviderInstance = new Provider()
exports.default = exports.V4ProviderInstance
//# sourceMappingURL=Provider.js.map
