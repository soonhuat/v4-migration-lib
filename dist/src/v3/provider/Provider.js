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
exports.Provider = void 0
var utils_1 = require('../utils')
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var cross_fetch_1 = __importDefault(require('cross-fetch'))
var Provider = (function (_super) {
  __extends(Provider, _super)
  function Provider() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  Provider.getInstance = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      var instance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            instance = new Provider()
            instance.setInstanceConfig(config)
            instance.nonce = '0'
            return [4, instance.setBaseUrl(config.config.providerUri)]
          case 1:
            _a.sent()
            return [2, instance]
        }
      })
    })
  }
  Provider.prototype.setBaseUrl = function (url) {
    return __awaiter(this, void 0, void 0, function () {
      var _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            this.baseUrl = url
            _a = this
            return [4, this.getServiceEndpoints()]
          case 1:
            _a.servicesEndpoints = _b.sent()
            return [2, true]
        }
      })
    })
  }
  Object.defineProperty(Provider.prototype, 'url', {
    get: function () {
      return this.baseUrl
    },
    enumerable: false,
    configurable: true
  })
  Provider.prototype.getServiceEndpoints = function () {
    return __awaiter(this, void 0, void 0, function () {
      var serviceEndpoints, result, i, endpoint, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            serviceEndpoints = []
            _a.label = 1
          case 1:
            _a.trys.push([1, 4, , 5])
            return [4, this.ocean.utils.fetch.get(this.url)]
          case 2:
            return [4, _a.sent().json()]
          case 3:
            result = _a.sent()
            this.providerAddress = result.providerAddress
            if ('computeAddress' in result)
              this.computeAddress = result.computeAddress
            if ('version' in result) this.providerVersion = result.version
            if ('computeLimits' in result)
              this.computeLimits = result.computeLimits
            for (i in result.serviceEndpoints) {
              endpoint = {
                serviceName: i,
                method: result.serviceEndpoints[i][0],
                urlPath: this.url + result.serviceEndpoints[i][1]
              }
              serviceEndpoints.push(endpoint)
            }
            return [2, serviceEndpoints]
          case 4:
            e_1 = _a.sent()
            this.logger.error('Finding the service endpoints failed:', e_1)
            return [2, null]
          case 5:
            return [2]
        }
      })
    })
  }
  Provider.prototype.getEndpointURL = function (serviceName) {
    if (!this.servicesEndpoints) return null
    return this.servicesEndpoints.find(function (s) {
      return s.serviceName === serviceName
    })
  }
  Provider.prototype.createSignature = function (account, agreementId) {
    return __awaiter(this, void 0, void 0, function () {
      var signature
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              this.ocean.utils.signature.signText(
                (0, utils_1.noZeroX)(agreementId),
                account.getId()
              )
            ]
          case 1:
            signature = _a.sent()
            return [2, signature]
        }
      })
    })
  }
  Provider.prototype.createHashSignature = function (account, message) {
    return __awaiter(this, void 0, void 0, function () {
      var signature
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              this.ocean.utils.signature.signWithHash(message, account.getId())
            ]
          case 1:
            signature = _a.sent()
            return [2, signature]
        }
      })
    })
  }
  Provider.prototype.encrypt = function (did, document, account) {
    return __awaiter(this, void 0, void 0, function () {
      var args, path, response, e_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getNonce(account.getId())]
          case 1:
            _a.sent()
            args = {
              documentId: did,
              document: JSON.stringify(document),
              publisherAddress: account.getId()
            }
            path = this.getEncryptEndpoint()
              ? this.getEncryptEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _a.label = 2
          case 2:
            _a.trys.push([2, 5, , 6])
            return [
              4,
              this.ocean.utils.fetch.post(path, decodeURI(JSON.stringify(args)))
            ]
          case 3:
            response = _a.sent()
            return [4, response.json()]
          case 4:
            return [2, _a.sent().encryptedDocument]
          case 5:
            e_2 = _a.sent()
            this.logger.error(e_2)
            throw new Error('HTTP request failed')
          case 6:
            return [2]
        }
      })
    })
  }
  Provider.prototype.fileinfo = function (url) {
    return __awaiter(this, void 0, void 0, function () {
      var args, files, path, response, results, _i, results_1, result, e_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            args = { url: url }
            files = []
            path = this.getFileinfoEndpoint()
              ? this.getFileinfoEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _a.label = 1
          case 1:
            _a.trys.push([1, 4, , 5])
            return [4, this.ocean.utils.fetch.post(path, JSON.stringify(args))]
          case 2:
            response = _a.sent()
            return [4, response.json()]
          case 3:
            results = _a.sent()
            for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
              result = results_1[_i]
              files.push(result)
            }
            return [2, files]
          case 4:
            e_3 = _a.sent()
            return [2, null]
          case 5:
            return [2]
        }
      })
    })
  }
  Provider.prototype.isFileConsumable = function (did, serviceIndex) {
    return __awaiter(this, void 0, void 0, function () {
      var args, ddo, service, path, response, results, e_4
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            args = { did: did.getDid() }
            return [4, this.ocean.metadataCache.retrieveDDO(did)]
          case 1:
            ddo = _a.sent()
            if (!ddo) return [2, false]
            service = ddo.findServiceById(serviceIndex)
            if (!service) return [2, false]
            path = service.serviceEndpoint + '/api/v1/services/fileinfo'
            _a.label = 2
          case 2:
            _a.trys.push([2, 5, , 6])
            return [4, this.ocean.utils.fetch.post(path, JSON.stringify(args))]
          case 3:
            response = _a.sent()
            return [4, response.json()]
          case 4:
            results = _a.sent()
            return [2, results[0].valid]
          case 5:
            e_4 = _a.sent()
            return [2, false]
          case 6:
            return [2]
        }
      })
    })
  }
  Provider.prototype.getNonce = function (consumerAddress) {
    return __awaiter(this, void 0, void 0, function () {
      var path, response, _a, _b, e_5
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            path = this.getNonceEndpoint()
              ? this.getNonceEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _c.label = 1
          case 1:
            _c.trys.push([1, 4, , 5])
            return [
              4,
              this.ocean.utils.fetch.get(
                path + '?userAddress='.concat(consumerAddress)
              )
            ]
          case 2:
            response = _c.sent()
            _a = this
            _b = String
            return [4, response.json()]
          case 3:
            _a.nonce = _b.apply(void 0, [_c.sent().nonce])
            return [2, this.nonce]
          case 4:
            e_5 = _c.sent()
            this.logger.error(e_5)
            throw new Error('HTTP request failed')
          case 5:
            return [2]
        }
      })
    })
  }
  Provider.prototype.initialize = function (
    asset,
    serviceIndex,
    serviceType,
    consumerAddress,
    userCustomParameters
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, did, ddo, initializeUrl, response, e_6
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ;(_a = _b.sent()), (did = _a.did), (ddo = _a.ddo)
            initializeUrl = this.getInitializeEndpoint()
              ? this.getInitializeEndpoint().urlPath
              : null
            if (!initializeUrl) return [2, null]
            initializeUrl += '?documentId='.concat(did)
            initializeUrl += '&serviceId='.concat(serviceIndex)
            initializeUrl += '&serviceType='.concat(serviceType)
            initializeUrl += '&dataToken='.concat(ddo.dataToken)
            initializeUrl += '&consumerAddress='.concat(consumerAddress)
            if (userCustomParameters)
              initializeUrl +=
                '&userdata=' + encodeURI(JSON.stringify(userCustomParameters))
            _b.label = 2
          case 2:
            _b.trys.push([2, 5, , 6])
            return [4, this.ocean.utils.fetch.get(initializeUrl)]
          case 3:
            response = _b.sent()
            return [4, response.text()]
          case 4:
            return [2, _b.sent()]
          case 5:
            e_6 = _b.sent()
            this.logger.error(e_6)
            throw new Error('Asset URL not found or not available.')
          case 6:
            return [2]
        }
      })
    })
  }
  Provider.prototype.download = function (
    did,
    txId,
    tokenAddress,
    serviceType,
    serviceIndex,
    destination,
    account,
    files,
    index,
    userCustomParameters
  ) {
    if (index === void 0) {
      index = -1
    }
    return __awaiter(this, void 0, void 0, function () {
      var signature, path, filesPromises
      var _this = this
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getNonce(account.getId())]
          case 1:
            _a.sent()
            return [4, this.createSignature(account, did + this.nonce)]
          case 2:
            signature = _a.sent()
            path = this.getDownloadEndpoint()
              ? this.getDownloadEndpoint().urlPath
              : null
            if (!path) return [2, null]
            filesPromises = files
              .filter(function (_, i) {
                return index === -1 || i === index
              })
              .map(function (_a) {
                var i = _a.index
                return __awaiter(_this, void 0, void 0, function () {
                  var consumeUrl, _b, e_7
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        consumeUrl = path
                        consumeUrl += '?fileIndex='.concat(i)
                        consumeUrl += '&documentId='.concat(did)
                        consumeUrl += '&serviceId='.concat(serviceIndex)
                        consumeUrl += '&serviceType='.concat(serviceType)
                        consumeUrl += '&dataToken='.concat(tokenAddress)
                        consumeUrl += '&transferTxId='.concat(txId)
                        consumeUrl += '&consumerAddress='.concat(
                          account.getId()
                        )
                        consumeUrl += '&signature='.concat(signature)
                        if (userCustomParameters)
                          consumeUrl +=
                            '&userdata=' +
                            encodeURI(JSON.stringify(userCustomParameters))
                        _c.label = 1
                      case 1:
                        _c.trys.push([1, 6, , 7])
                        if (!!destination) return [3, 3]
                        return [
                          4,
                          this.ocean.utils.fetch.downloadFileBrowser(consumeUrl)
                        ]
                      case 2:
                        _b = _c.sent()
                        return [3, 5]
                      case 3:
                        return [
                          4,
                          this.ocean.utils.fetch.downloadFile(
                            consumeUrl,
                            destination,
                            i
                          )
                        ]
                      case 4:
                        _b = _c.sent()
                        _c.label = 5
                      case 5:
                        _b
                        return [3, 7]
                      case 6:
                        e_7 = _c.sent()
                        this.logger.error('Error consuming assets')
                        this.logger.error(e_7)
                        throw e_7
                      case 7:
                        return [2]
                    }
                  })
                })
              })
            return [4, Promise.all(filesPromises)]
          case 3:
            _a.sent()
            return [2, destination]
        }
      })
    })
  }
  Provider.prototype.computeStart = function (
    did,
    consumerAccount,
    algorithm,
    output,
    txId,
    serviceIndex,
    serviceType,
    tokenAddress,
    additionalInputs,
    userCustomParameters
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var address,
        payload,
        signatureMessage,
        signature,
        path,
        response,
        params,
        e_8
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            address = consumerAccount.getId()
            return [4, this.getNonce(consumerAccount.getId())]
          case 1:
            _a.sent()
            payload = Object()
            payload.documentId = (0, utils_1.noZeroX)(did)
            signatureMessage = address
            signatureMessage +=
              (did && ''.concat((0, utils_1.noZeroX)(did))) || ''
            signatureMessage += this.nonce
            return [
              4,
              this.createHashSignature(consumerAccount, signatureMessage)
            ]
          case 2:
            signature = _a.sent()
            payload.signature = signature
            if (output) payload.output = output
            if (algorithm.did) payload.algorithmDid = algorithm.did
            if (algorithm.meta) payload.algorithmMeta = algorithm.meta
            payload.consumerAddress = address
            if (txId) payload.transferTxId = txId
            if (algorithm.transferTxId)
              payload.algorithmTransferTxId = algorithm.transferTxId
            if (algorithm.dataToken)
              payload.algorithmDataToken = algorithm.dataToken
            if (serviceIndex) payload.serviceId = serviceIndex
            if (serviceType) payload.serviceType = serviceType
            if (tokenAddress) payload.dataToken = tokenAddress
            if (additionalInputs) payload.additionalInputs = additionalInputs
            if (userCustomParameters) payload.userdata = userCustomParameters
            if (algorithm.algoCustomParameters)
              payload.algocustomdata = algorithm.algoCustomParameters
            if (algorithm.userCustomParameters)
              payload.algouserdata = algorithm.userCustomParameters
            path = this.getComputeStartEndpoint()
              ? this.getComputeStartEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 7, , 8])
            return [
              4,
              this.ocean.utils.fetch.post(path, JSON.stringify(payload))
            ]
          case 4:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 6]
            return [4, response.json()]
          case 5:
            params = _a.sent()
            return [2, params]
          case 6:
            console.error(
              'Compute start failed:',
              response.status,
              response.statusText
            )
            this.logger.error('Payload was:', payload)
            return [2, null]
          case 7:
            e_8 = _a.sent()
            this.logger.error('Compute start failed:')
            this.logger.error(e_8)
            this.logger.error('Payload was:', payload)
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeStop = function (did, consumerAccount, jobId) {
    return __awaiter(this, void 0, void 0, function () {
      var address,
        payload,
        signatureMessage,
        signature,
        path,
        response,
        params,
        e_9
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            address = consumerAccount.getId()
            return [4, this.getNonce(consumerAccount.getId())]
          case 1:
            _a.sent()
            payload = Object()
            payload.documentId = (0, utils_1.noZeroX)(did)
            signatureMessage = address
            signatureMessage += jobId || ''
            signatureMessage +=
              (did && ''.concat((0, utils_1.noZeroX)(did))) || ''
            signatureMessage += this.nonce
            return [
              4,
              this.createHashSignature(consumerAccount, signatureMessage)
            ]
          case 2:
            signature = _a.sent()
            payload.signature = signature
            payload.jobId = jobId
            payload.consumerAddress = address
            path = this.getComputeStopEndpoint()
              ? this.getComputeStopEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 7, , 8])
            return [
              4,
              this.ocean.utils.fetch.put(path, JSON.stringify(payload))
            ]
          case 4:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 6]
            return [4, response.json()]
          case 5:
            params = _a.sent()
            return [2, params]
          case 6:
            this.logger.error(
              'Compute stop failed:',
              response.status,
              response.statusText
            )
            this.logger.error('Payload was:', payload)
            return [2, null]
          case 7:
            e_9 = _a.sent()
            this.logger.error('Compute stop failed:')
            this.logger.error(e_9)
            this.logger.error('Payload was:', payload)
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeDelete = function (did, consumerAccount, jobId) {
    return __awaiter(this, void 0, void 0, function () {
      var address,
        payload,
        signatureMessage,
        signature,
        path,
        response,
        params,
        e_10
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            address = consumerAccount.getId()
            return [4, this.getNonce(consumerAccount.getId())]
          case 1:
            _a.sent()
            payload = Object()
            payload.documentId = (0, utils_1.noZeroX)(did)
            signatureMessage = address
            signatureMessage += jobId || ''
            signatureMessage +=
              (did && ''.concat((0, utils_1.noZeroX)(did))) || ''
            signatureMessage += this.nonce
            return [
              4,
              this.createHashSignature(consumerAccount, signatureMessage)
            ]
          case 2:
            signature = _a.sent()
            payload.signature = signature
            payload.jobId = jobId
            payload.consumerAddress = address
            path = this.getComputeDeleteEndpoint()
              ? this.getComputeDeleteEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 7, , 8])
            return [
              4,
              this.ocean.utils.fetch.delete(path, JSON.stringify(payload))
            ]
          case 4:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 6]
            return [4, response.json()]
          case 5:
            params = _a.sent()
            return [2, params]
          case 6:
            this.logger.error(
              'Delete compute job failed:',
              response.status,
              response.statusText
            )
            this.logger.error('Payload was:', payload)
            return [2, null]
          case 7:
            e_10 = _a.sent()
            this.logger.error('Delete compute job failed:')
            this.logger.error(e_10)
            this.logger.error('Payload was:', payload)
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeStatus = function (
    did,
    consumerAccount,
    jobId,
    txId
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var address, url, path, response, params, e_11
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            address = consumerAccount.getId()
            return [4, this.getNonce(consumerAccount.getId())]
          case 1:
            _a.sent()
            url = '?documentId=' + (0, utils_1.noZeroX)(did)
            url += (jobId && '&jobId='.concat(jobId)) || ''
            url += '&consumerAddress='.concat(address)
            url += (txId && '&transferTxId='.concat(txId)) || ''
            path = this.getComputeStatusEndpoint()
              ? this.getComputeStatusEndpoint().urlPath
              : null
            if (!path) return [2, null]
            _a.label = 2
          case 2:
            _a.trys.push([2, 6, , 7])
            return [4, this.ocean.utils.fetch.get(path + url)]
          case 3:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 5]
            return [4, response.json()]
          case 4:
            params = _a.sent()
            return [2, params]
          case 5:
            this.logger.error(
              'Get compute status failed:',
              response.status,
              response.statusText
            )
            return [2, null]
          case 6:
            e_11 = _a.sent()
            this.logger.error('Get compute status failed')
            this.logger.error(e_11)
            return [2, null]
          case 7:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeResult = function (
    jobId,
    index,
    destination,
    account
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var signatureMessage, signature, path, consumeUrl, _a, e_12
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, this.getNonce(account.getId())]
          case 1:
            _b.sent()
            signatureMessage = account.getId()
            signatureMessage += jobId
            signatureMessage += String(index)
            signatureMessage += this.nonce
            return [4, this.createHashSignature(account, signatureMessage)]
          case 2:
            signature = _b.sent()
            path = this.getComputeResultEndpoint()
              ? this.getComputeResultEndpoint().urlPath
              : null
            if (!path) return [2, null]
            consumeUrl = path
            consumeUrl += '?jobId='.concat(jobId)
            consumeUrl += '&index='.concat(String(index))
            consumeUrl += '&signature='.concat(signature)
            consumeUrl += '&consumerAddress='.concat(account.getId())
            _b.label = 3
          case 3:
            _b.trys.push([3, 8, , 9])
            if (!!destination) return [3, 5]
            return [4, this.ocean.utils.fetch.downloadFileBrowser(consumeUrl)]
          case 4:
            _a = _b.sent()
            return [3, 7]
          case 5:
            return [
              4,
              this.ocean.utils.fetch.downloadFile(
                consumeUrl,
                destination,
                index
              )
            ]
          case 6:
            _a = _b.sent()
            _b.label = 7
          case 7:
            _a
            return [3, 9]
          case 8:
            e_12 = _b.sent()
            this.logger.error('Error getting job result')
            this.logger.error(e_12)
            throw e_12
          case 9:
            return [2, destination]
        }
      })
    })
  }
  Provider.prototype.getInitializeEndpoint = function () {
    return this.getEndpointURL('initialize')
  }
  Provider.prototype.getNonceEndpoint = function () {
    return this.getEndpointURL('nonce')
  }
  Provider.prototype.getEncryptEndpoint = function () {
    return this.getEndpointURL('encrypt')
  }
  Provider.prototype.getFileinfoEndpoint = function () {
    return this.getEndpointURL('fileinfo')
  }
  Provider.prototype.getComputeStartEndpoint = function () {
    return this.getEndpointURL('computeStart')
  }
  Provider.prototype.getComputeStopEndpoint = function () {
    return this.getEndpointURL('computeStop')
  }
  Provider.prototype.getComputeStatusEndpoint = function () {
    return this.getEndpointURL('computeStatus')
  }
  Provider.prototype.getComputeDeleteEndpoint = function () {
    return this.getEndpointURL('computeDelete')
  }
  Provider.prototype.getComputeResultEndpoint = function () {
    return this.getEndpointURL('computeResult')
  }
  Provider.prototype.getDownloadEndpoint = function () {
    return this.getEndpointURL('download')
  }
  Provider.prototype.isValidProvider = function (url) {
    return __awaiter(this, void 0, void 0, function () {
      var response, params, error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5])
            return [4, this.ocean.utils.fetch.get(url)]
          case 1:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 3]
            return [4, response.json()]
          case 2:
            params = _a.sent()
            if (params && params.providerAddress) return [2, true]
            _a.label = 3
          case 3:
            return [2, false]
          case 4:
            error_1 = _a.sent()
            this.logger.error(
              'Error validating provider: '.concat(error_1.message)
            )
            return [2, false]
          case 5:
            return [2]
        }
      })
    })
  }
  Provider.prototype.getAssetURL = function (account, did, serviceId) {
    return __awaiter(this, void 0, void 0, function () {
      var accountId,
        nonce,
        signature,
        error_2,
        path,
        initializeUrl,
        response,
        responseURL,
        _a,
        _b,
        e_13
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            accountId = account.getId()
            return [4, this.getNonce(accountId)]
          case 1:
            nonce = _c.sent()
            _c.label = 2
          case 2:
            _c.trys.push([2, 4, , 5])
            return [4, this.createSignature(account, did + nonce)]
          case 3:
            signature = _c.sent()
            return [3, 5]
          case 4:
            error_2 = _c.sent()
            console.log('error', error_2)
            return [3, 5]
          case 5:
            path = this.getEndpointURL('assetUrls')
              ? this.getEndpointURL('encrypt').urlPath
              : null
            if (path === null)
              path = 'http://localhost:8030/api/v1/services/assetUrls'
            initializeUrl = path
            initializeUrl += '?documentId='.concat(did)
            initializeUrl += '&signature='.concat(signature)
            initializeUrl += '&serviceId='.concat(serviceId)
            initializeUrl += '&nonce='.concat(nonce)
            initializeUrl += '&publisherAddress='.concat(accountId)
            _c.label = 6
          case 6:
            _c.trys.push([6, 9, , 10])
            return [
              4,
              (0, cross_fetch_1.default)(initializeUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            ]
          case 7:
            response = _c.sent()
            _b = (_a = JSON).parse
            return [4, response.text()]
          case 8:
            responseURL = _b.apply(_a, [_c.sent()])[0]
            return [2, responseURL]
          case 9:
            e_13 = _c.sent()
            console.error(e_13)
            throw new Error('HTTP request failed')
          case 10:
            return [2]
        }
      })
    })
  }
  return Provider
})(Instantiable_abstract_1.Instantiable)
exports.Provider = Provider
//# sourceMappingURL=Provider.js.map
