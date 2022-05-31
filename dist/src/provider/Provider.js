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
var ConversionTypeHelper_1 = require('./utils/ConversionTypeHelper')
var SignatureUtils_1 = require('./utils/SignatureUtils')
var cross_fetch_1 = __importDefault(require('cross-fetch'))
var Provider = (function () {
  function Provider() {}
  Provider.prototype.getEndpoints = function (providerUri) {
    return __awaiter(this, void 0, void 0, function () {
      var endpoints, e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4])
            return [4, (0, utils_1.getData)(providerUri)]
          case 1:
            endpoints = _a.sent()
            return [4, endpoints.json()]
          case 2:
            return [2, _a.sent()]
          case 3:
            e_1 = _a.sent()
            utils_1.LoggerInstance.error(
              'Finding the service endpoints failed:',
              e_1
            )
            return [2, null]
          case 4:
            return [2]
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
        return [2, serviceEndpoints]
      })
    })
  }
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
            if (!!providerEndpoints) return [3, 2]
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _b.sent()
            _b.label = 2
          case 2:
            if (!!serviceEndpoints) return [3, 4]
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 3:
            serviceEndpoints = _b.sent()
            _b.label = 4
          case 4:
            path = this.getEndpointURL(serviceEndpoints, 'nonce')
              ? this.getEndpointURL(serviceEndpoints, 'nonce').urlPath
              : null
            if (!path) return [2, null]
            _b.label = 5
          case 5:
            _b.trys.push([5, 8, , 9])
            return [
              4,
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
            return [4, response.json()]
          case 7:
            return [2, _a.apply(void 0, [_b.sent().nonce])]
          case 8:
            e_2 = _b.sent()
            utils_1.LoggerInstance.error(e_2)
            throw new Error('HTTP request failed')
          case 9:
            return [2]
        }
      })
    })
  }
  Provider.prototype.createSignature = function (web3, accountId, agreementId) {
    return __awaiter(this, void 0, void 0, function () {
      var signature
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              (0, SignatureUtils_1.signText)(
                web3,
                (0, ConversionTypeHelper_1.noZeroX)(agreementId),
                accountId
              )
            ]
          case 1:
            signature = _a.sent()
            return [2, signature]
        }
      })
    })
  }
  Provider.prototype.createHashSignature = function (web3, accountId, message) {
    return __awaiter(this, void 0, void 0, function () {
      var signature
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4,
              (0, SignatureUtils_1.signWithHash)(web3, message, accountId)
            ]
          case 1:
            signature = _a.sent()
            return [2, signature]
        }
      })
    })
  }
  Provider.prototype.encrypt = function (data, providerUri, signal) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints, serviceEndpoints, path, response, e_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            path = this.getEndpointURL(serviceEndpoints, 'encrypt')
              ? this.getEndpointURL(serviceEndpoints, 'encrypt').urlPath
              : null
            if (!path) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 6, , 7])
            return [
              4,
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
            return [4, response.text()]
          case 5:
            return [2, _a.sent()]
          case 6:
            e_3 = _a.sent()
            utils_1.LoggerInstance.error(e_3)
            throw new Error('HTTP request failed')
          case 7:
            return [2]
        }
      })
    })
  }
  Provider.prototype.checkDidFiles = function (
    did,
    serviceId,
    providerUri,
    signal
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        args,
        files,
        path,
        response,
        results,
        _i,
        results_1,
        result,
        e_4
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            args = { did: did, serviceId: serviceId }
            files = []
            path = this.getEndpointURL(serviceEndpoints, 'fileinfo')
              ? this.getEndpointURL(serviceEndpoints, 'fileinfo').urlPath
              : null
            if (!path) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 6, , 7])
            return [
              4,
              (0, cross_fetch_1.default)(path, {
                method: 'POST',
                body: JSON.stringify(args),
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 4:
            response = _a.sent()
            return [4, response.json()]
          case 5:
            results = _a.sent()
            for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
              result = results_1[_i]
              files.push(result)
            }
            return [2, files]
          case 6:
            e_4 = _a.sent()
            return [2, null]
          case 7:
            return [2]
        }
      })
    })
  }
  Provider.prototype.checkFileUrl = function (url, providerUri, signal) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        args,
        files,
        path,
        response,
        results,
        _i,
        results_2,
        result,
        e_5
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            args = { url: url, type: 'url' }
            files = []
            path = this.getEndpointURL(serviceEndpoints, 'fileinfo')
              ? this.getEndpointURL(serviceEndpoints, 'fileinfo').urlPath
              : null
            if (!path) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 6, , 7])
            return [
              4,
              (0, cross_fetch_1.default)(path, {
                method: 'POST',
                body: JSON.stringify(args),
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 4:
            response = _a.sent()
            return [4, response.json()]
          case 5:
            results = _a.sent()
            for (_i = 0, results_2 = results; _i < results_2.length; _i++) {
              result = results_2[_i]
              files.push(result)
            }
            return [2, files]
          case 6:
            e_5 = _a.sent()
            return [2, null]
          case 7:
            return [2]
        }
      })
    })
  }
  Provider.prototype.getComputeEnvironments = function (providerUri, signal) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints, serviceEndpoints, path, response, envs, e_6
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _b.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _b.sent()
            path =
              (_a = this.getEndpointURL(
                serviceEndpoints,
                'computeEnvironments'
              )) === null || _a === void 0
                ? void 0
                : _a.urlPath
            if (!path) return [2, null]
            _b.label = 3
          case 3:
            _b.trys.push([3, 6, , 7])
            return [
              4,
              (0, cross_fetch_1.default)(path, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 4:
            response = _b.sent()
            return [4, response.json()]
          case 5:
            envs = _b.sent()
            return [2, envs]
          case 6:
            e_6 = _b.sent()
            utils_1.LoggerInstance.error(e_6.message)
            return [2, null]
          case 7:
            return [2]
        }
      })
    })
  }
  Provider.prototype.initialize = function (
    did,
    serviceId,
    fileIndex,
    consumerAddress,
    providerUri,
    signal,
    userCustomParameters,
    computeEnv,
    validUntil
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        initializeUrl,
        response,
        results,
        e_7
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            initializeUrl = this.getEndpointURL(serviceEndpoints, 'initialize')
              ? this.getEndpointURL(serviceEndpoints, 'initialize').urlPath
              : null
            if (!initializeUrl) return [2, null]
            initializeUrl += '?documentId='.concat(did)
            initializeUrl += '&serviceId='.concat(serviceId)
            initializeUrl += '&fileIndex='.concat(fileIndex)
            initializeUrl += '&consumerAddress='.concat(consumerAddress)
            if (userCustomParameters)
              initializeUrl +=
                '&userdata=' + encodeURI(JSON.stringify(userCustomParameters))
            if (computeEnv)
              initializeUrl += '&environment=' + encodeURI(computeEnv)
            if (validUntil) initializeUrl += '&validUntil=' + validUntil
            _a.label = 3
          case 3:
            _a.trys.push([3, 6, , 7])
            return [
              4,
              (0, cross_fetch_1.default)(initializeUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 4:
            response = _a.sent()
            return [4, response.json()]
          case 5:
            results = _a.sent()
            return [2, results]
          case 6:
            e_7 = _a.sent()
            utils_1.LoggerInstance.error(e_7)
            throw new Error('Asset URL not found or not available.')
          case 7:
            return [2]
        }
      })
    })
  }
  Provider.prototype.getDownloadUrl = function (
    did,
    accountId,
    serviceId,
    fileIndex,
    transferTxId,
    providerUri,
    web3,
    userCustomParameters
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        downloadUrl,
        nonce,
        signature,
        consumeUrl
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            downloadUrl = this.getEndpointURL(serviceEndpoints, 'download')
              ? this.getEndpointURL(serviceEndpoints, 'download').urlPath
              : null
            if (!downloadUrl) return [2, null]
            nonce = Date.now()
            return [4, this.createSignature(web3, accountId, did + nonce)]
          case 3:
            signature = _a.sent()
            consumeUrl = downloadUrl
            consumeUrl += '?fileIndex='.concat(fileIndex)
            consumeUrl += '&documentId='.concat(did)
            consumeUrl += '&transferTxId='.concat(transferTxId)
            consumeUrl += '&serviceId='.concat(serviceId)
            consumeUrl += '&consumerAddress='.concat(accountId)
            consumeUrl += '&nonce='.concat(nonce)
            consumeUrl += '&signature='.concat(signature)
            if (userCustomParameters)
              consumeUrl +=
                '&userdata=' + encodeURI(JSON.stringify(userCustomParameters))
            return [2, consumeUrl]
        }
      })
    })
  }
  Provider.prototype.computeStart = function (
    providerUri,
    web3,
    consumerAddress,
    computeEnv,
    dataset,
    algorithm,
    signal,
    additionalDatasets,
    output
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        computeStartUrl,
        nonce,
        signatureMessage,
        signature,
        payload,
        response,
        params,
        e_8
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            computeStartUrl = this.getEndpointURL(
              serviceEndpoints,
              'computeStart'
            )
              ? this.getEndpointURL(serviceEndpoints, 'computeStart').urlPath
              : null
            nonce = Date.now()
            signatureMessage = consumerAddress
            signatureMessage += dataset.documentId
            signatureMessage += nonce
            return [
              4,
              this.createHashSignature(web3, consumerAddress, signatureMessage)
            ]
          case 3:
            signature = _a.sent()
            payload = Object()
            payload.consumerAddress = consumerAddress
            payload.signature = signature
            payload.nonce = nonce
            payload.environment = computeEnv
            payload.dataset = dataset
            payload.algorithm = algorithm
            if (payload.additionalDatasets)
              payload.additionalDatasets = additionalDatasets
            if (output) payload.output = output
            if (!computeStartUrl) return [2, null]
            _a.label = 4
          case 4:
            _a.trys.push([4, 8, , 9])
            return [
              4,
              (0, cross_fetch_1.default)(computeStartUrl, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 5:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 7]
            return [4, response.json()]
          case 6:
            params = _a.sent()
            return [2, params]
          case 7:
            console.error(
              'Compute start failed:',
              response.status,
              response.statusText
            )
            utils_1.LoggerInstance.error('Payload was:', payload)
            return [2, null]
          case 8:
            e_8 = _a.sent()
            utils_1.LoggerInstance.error('Compute start failed:')
            utils_1.LoggerInstance.error(e_8)
            utils_1.LoggerInstance.error('Payload was:', payload)
            return [2, null]
          case 9:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeStop = function (
    did,
    consumerAddress,
    jobId,
    providerUri,
    web3,
    signal
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        computeStopUrl,
        nonce,
        signatureMessage,
        signature,
        payload,
        response,
        params,
        e_9
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            computeStopUrl = this.getEndpointURL(
              serviceEndpoints,
              'computeStop'
            )
              ? this.getEndpointURL(serviceEndpoints, 'computeStop').urlPath
              : null
            return [
              4,
              this.getNonce(
                providerUri,
                consumerAddress,
                signal,
                providerEndpoints,
                serviceEndpoints
              )
            ]
          case 3:
            nonce = _a.sent()
            signatureMessage = consumerAddress
            signatureMessage += jobId || ''
            signatureMessage +=
              (did && ''.concat((0, ConversionTypeHelper_1.noZeroX)(did))) || ''
            signatureMessage += nonce
            return [
              4,
              this.createHashSignature(web3, consumerAddress, signatureMessage)
            ]
          case 4:
            signature = _a.sent()
            payload = Object()
            payload.signature = signature
            payload.documentId = (0, ConversionTypeHelper_1.noZeroX)(did)
            payload.consumerAddress = consumerAddress
            if (jobId) payload.jobId = jobId
            if (!computeStopUrl) return [2, null]
            _a.label = 5
          case 5:
            _a.trys.push([5, 9, , 10])
            return [
              4,
              (0, cross_fetch_1.default)(computeStopUrl, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 6:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 8]
            return [4, response.json()]
          case 7:
            params = _a.sent()
            return [2, params]
          case 8:
            utils_1.LoggerInstance.error(
              'Compute stop failed:',
              response.status,
              response.statusText
            )
            utils_1.LoggerInstance.error('Payload was:', payload)
            return [2, null]
          case 9:
            e_9 = _a.sent()
            utils_1.LoggerInstance.error('Compute stop failed:')
            utils_1.LoggerInstance.error(e_9)
            utils_1.LoggerInstance.error('Payload was:', payload)
            return [2, null]
          case 10:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeStatus = function (
    providerUri,
    signal,
    jobId,
    did,
    consumerAddress
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        computeStatusUrl,
        url,
        response,
        params,
        e_10
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!jobId && !did && !consumerAddress) {
              throw new Error(
                'You need at least one of jobId, did, consumerAddress'
              )
            }
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            computeStatusUrl = this.getEndpointURL(
              serviceEndpoints,
              'computeStatus'
            )
              ? this.getEndpointURL(serviceEndpoints, 'computeStatus').urlPath
              : null
            url = '?documentId=' + (0, ConversionTypeHelper_1.noZeroX)(did)
            url +=
              (consumerAddress &&
                '&consumerAddress='.concat(consumerAddress)) ||
              ''
            url += (jobId && '&jobId='.concat(jobId)) || ''
            if (!computeStatusUrl) return [2, null]
            _a.label = 3
          case 3:
            _a.trys.push([3, 7, , 8])
            return [
              4,
              (0, cross_fetch_1.default)(computeStatusUrl + url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
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
            utils_1.LoggerInstance.error(
              'Get compute status failed:',
              response.status,
              response.statusText
            )
            return [2, null]
          case 7:
            e_10 = _a.sent()
            utils_1.LoggerInstance.error('Get compute status failed')
            utils_1.LoggerInstance.error(e_10)
            return [2, null]
          case 8:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeResult = function (
    jobId,
    index,
    accountId,
    providerUri,
    web3,
    signal
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        computeResultUrl,
        nonce,
        signatureMessage,
        signature,
        consumeUrl,
        e_11
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            computeResultUrl = this.getEndpointURL(
              serviceEndpoints,
              'computeResult'
            )
              ? this.getEndpointURL(serviceEndpoints, 'computeResult').urlPath
              : null
            return [
              4,
              this.getNonce(
                providerUri,
                accountId,
                signal,
                providerEndpoints,
                serviceEndpoints
              )
            ]
          case 3:
            nonce = _a.sent()
            signatureMessage = accountId
            signatureMessage += jobId
            signatureMessage += String(index)
            signatureMessage += nonce
            return [
              4,
              this.createHashSignature(web3, accountId, signatureMessage)
            ]
          case 4:
            signature = _a.sent()
            consumeUrl = computeResultUrl
            consumeUrl += '?consumerAddress='.concat(accountId)
            consumeUrl += '&jobId='.concat(jobId)
            consumeUrl += '&index='.concat(String(index))
            consumeUrl += (signature && '&signature='.concat(signature)) || ''
            if (!computeResultUrl) return [2, null]
            _a.label = 5
          case 5:
            _a.trys.push([5, 10, , 11])
            if (!document) return [3, 7]
            return [4, (0, utils_1.downloadFileBrowser)(consumeUrl)]
          case 6:
            _a.sent()
            return [3, 9]
          case 7:
            return [4, (0, utils_1.downloadFile)(consumeUrl, index)]
          case 8:
            return [2, _a.sent()]
          case 9:
            return [3, 11]
          case 10:
            e_11 = _a.sent()
            utils_1.LoggerInstance.error('Error getting job result')
            utils_1.LoggerInstance.error(e_11)
            throw e_11
          case 11:
            return [2]
        }
      })
    })
  }
  Provider.prototype.computeDelete = function (
    did,
    consumerAddress,
    jobId,
    providerUri,
    web3,
    signal
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var providerEndpoints,
        serviceEndpoints,
        computeDeleteUrl,
        nonce,
        signatureMessage,
        signature,
        payload,
        response,
        params,
        e_12
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getEndpoints(providerUri)]
          case 1:
            providerEndpoints = _a.sent()
            return [4, this.getServiceEndpoints(providerUri, providerEndpoints)]
          case 2:
            serviceEndpoints = _a.sent()
            computeDeleteUrl = this.getEndpointURL(
              serviceEndpoints,
              'computeDelete'
            )
              ? this.getEndpointURL(serviceEndpoints, 'computeDelete').urlPath
              : null
            return [
              4,
              this.getNonce(
                providerUri,
                consumerAddress,
                signal,
                providerEndpoints,
                serviceEndpoints
              )
            ]
          case 3:
            nonce = _a.sent()
            signatureMessage = consumerAddress
            signatureMessage += jobId || ''
            signatureMessage +=
              (did && ''.concat((0, ConversionTypeHelper_1.noZeroX)(did))) || ''
            signatureMessage += nonce
            return [
              4,
              this.createHashSignature(web3, consumerAddress, signatureMessage)
            ]
          case 4:
            signature = _a.sent()
            payload = Object()
            payload.documentId = (0, ConversionTypeHelper_1.noZeroX)(did)
            payload.consumerAddress = consumerAddress
            payload.jobId = jobId
            if (signature) payload.signature = signature
            if (!computeDeleteUrl) return [2, null]
            _a.label = 5
          case 5:
            _a.trys.push([5, 9, , 10])
            return [
              4,
              (0, cross_fetch_1.default)(computeDeleteUrl, {
                method: 'DELETE',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
          case 6:
            response = _a.sent()
            if (
              !(response === null || response === void 0 ? void 0 : response.ok)
            )
              return [3, 8]
            return [4, response.json()]
          case 7:
            params = _a.sent()
            return [2, params]
          case 8:
            utils_1.LoggerInstance.error(
              'Delete compute job failed:',
              response.status,
              response.statusText
            )
            utils_1.LoggerInstance.error('Payload was:', payload)
            return [2, null]
          case 9:
            e_12 = _a.sent()
            utils_1.LoggerInstance.error('Delete compute job failed:')
            utils_1.LoggerInstance.error(e_12)
            utils_1.LoggerInstance.error('Payload was:', payload)
            return [2, null]
          case 10:
            return [2]
        }
      })
    })
  }
  Provider.prototype.isValidProvider = function (url, signal) {
    return __awaiter(this, void 0, void 0, function () {
      var response, params, error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5])
            return [
              4,
              (0, cross_fetch_1.default)(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
                signal: signal
              })
            ]
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
            utils_1.LoggerInstance.error(
              'Error validating provider: '.concat(error_1.message)
            )
            return [2, false]
          case 5:
            return [2]
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
