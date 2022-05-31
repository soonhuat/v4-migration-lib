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
Object.defineProperty(exports, '__esModule', { value: true })
exports.Compute = exports.ComputeJobStatus = exports.OrderProgressStep = void 0
var utils_1 = require('../utils')
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var Provider_1 = require('../provider/Provider')
var crypto_js_1 = require('crypto-js')
var OrderProgressStep
;(function (OrderProgressStep) {
  OrderProgressStep[(OrderProgressStep['TransferDataToken'] = 0)] =
    'TransferDataToken'
})(
  (OrderProgressStep =
    exports.OrderProgressStep || (exports.OrderProgressStep = {}))
)
exports.ComputeJobStatus = Object.freeze({
  WarmingUp: 1,
  Started: 10,
  ConfiguringVolumes: 20,
  ProvisioningSuccess: 30,
  DataProvisioningFailed: 31,
  AlgorithmProvisioningFailed: 32,
  RunningAlgorithm: 40,
  FilteringResults: 50,
  PublishingResult: 60,
  Completed: 70,
  Stopped: 80,
  Deleted: 90
})
var Compute = (function (_super) {
  __extends(Compute, _super)
  function Compute() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  Compute.getInstance = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      var instance
      return __generator(this, function (_a) {
        instance = new Compute()
        instance.setInstanceConfig(config)
        return [2, instance]
      })
    })
  }
  Compute.prototype.getComputeAddress = function (did, serviceIndex) {
    if (serviceIndex === void 0) {
      serviceIndex = -1
    }
    return __awaiter(this, void 0, void 0, function () {
      var service, serviceType, serviceEndpoint, provider
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            serviceType = 'compute'
            if (!(serviceIndex === -1)) return [3, 2]
            return [4, this.ocean.assets.getServiceByType(did, serviceType)]
          case 1:
            service = _a.sent()
            serviceIndex = service.index
            return [3, 4]
          case 2:
            return [4, this.ocean.assets.getServiceByIndex(did, serviceIndex)]
          case 3:
            service = _a.sent()
            serviceType = service.type
            _a.label = 4
          case 4:
            serviceEndpoint = service.serviceEndpoint
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 5:
            provider = _a.sent()
            return [4, provider.setBaseUrl(serviceEndpoint)]
          case 6:
            _a.sent()
            return [2, provider.computeAddress]
        }
      })
    })
  }
  Compute.prototype.start = function (
    asset,
    txId,
    tokenAddress,
    consumerAccount,
    algorithm,
    output,
    serviceIndex,
    serviceType,
    additionalInputs,
    userCustomParameters
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var _a,
        did,
        ddo,
        service,
        serviceEndpoint,
        ddo_1,
        algoService,
        provider,
        computeJobsList
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            output = this.checkOutput(consumerAccount, output)
            return [4, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ;(_a = _b.sent()), (did = _a.did), (ddo = _a.ddo)
            service = ddo.findServiceByType('compute')
            serviceEndpoint = service.serviceEndpoint
            if (!algorithm.serviceIndex) return [3, 4]
            return [4, (0, utils_1.assetResolve)(algorithm.did, this.ocean)]
          case 2:
            ddo_1 = _b.sent().ddo
            algoService = ddo_1.findServiceById(algorithm.serviceIndex)
            return [
              4,
              this.ocean.assets.isUserCustomParametersValid(
                algoService.attributes.algoCustomParameters,
                algorithm.algoCustomParameters
              )
            ]
          case 3:
            if (!_b.sent()) {
              return [2, null]
            }
            _b.label = 4
          case 4:
            if (!(did && txId)) return [3, 8]
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 5:
            provider = _b.sent()
            return [4, provider.setBaseUrl(serviceEndpoint)]
          case 6:
            _b.sent()
            return [
              4,
              provider.computeStart(
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
              )
            ]
          case 7:
            computeJobsList = _b.sent()
            if (computeJobsList) return [2, computeJobsList[0]]
            else return [2, null]
            _b.label = 8
          case 8:
            return [2, null]
        }
      })
    })
  }
  Compute.prototype.stop = function (consumerAccount, asset, jobId) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, did, ddo, service, serviceEndpoint, provider, computeJobsList
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ;(_a = _b.sent()), (did = _a.did), (ddo = _a.ddo)
            service = ddo.findServiceByType('compute')
            serviceEndpoint = service.serviceEndpoint
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 2:
            provider = _b.sent()
            return [4, provider.setBaseUrl(serviceEndpoint)]
          case 3:
            _b.sent()
            return [4, provider.computeStop(did, consumerAccount, jobId)]
          case 4:
            computeJobsList = _b.sent()
            if (computeJobsList) return [2, computeJobsList[0]]
            return [2, null]
        }
      })
    })
  }
  Compute.prototype.delete = function (consumerAccount, asset, jobId) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, did, ddo, service, serviceEndpoint, provider, computeJobsList
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ;(_a = _b.sent()), (did = _a.did), (ddo = _a.ddo)
            service = ddo.findServiceByType('compute')
            serviceEndpoint = service.serviceEndpoint
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 2:
            provider = _b.sent()
            return [4, provider.setBaseUrl(serviceEndpoint)]
          case 3:
            _b.sent()
            return [4, provider.computeDelete(did, consumerAccount, jobId)]
          case 4:
            computeJobsList = _b.sent()
            if (computeJobsList) return [2, computeJobsList[0]]
            return [2, null]
        }
      })
    })
  }
  Compute.prototype.status = function (
    consumerAccount,
    did,
    ddo,
    service,
    jobId,
    txId
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var provider, serviceEndpoint, computeJobsList
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(did || service || ddo)) return [3, 6]
            if (!!service) return [3, 3]
            if (!!ddo) return [3, 2]
            return [4, this.ocean.assets.resolve(did)]
          case 1:
            ddo = _a.sent()
            if (!ddo) throw new Error("Couldn't resolve the did ".concat(did))
            _a.label = 2
          case 2:
            service = ddo.findServiceByType('compute')
            if (!service)
              throw new Error(
                "Couldn't find a compute service on the asset with did ".concat(
                  did
                )
              )
            _a.label = 3
          case 3:
            serviceEndpoint = service.serviceEndpoint
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 4:
            provider = _a.sent()
            return [4, provider.setBaseUrl(serviceEndpoint)]
          case 5:
            _a.sent()
            return [3, 7]
          case 6:
            provider = this.ocean.provider
            _a.label = 7
          case 7:
            return [
              4,
              provider.computeStatus(did, consumerAccount, jobId, txId)
            ]
          case 8:
            computeJobsList = _a.sent()
            return [2, computeJobsList]
        }
      })
    })
  }
  Compute.prototype.getResult = function (
    consumerAccount,
    jobId,
    index,
    destination,
    did,
    ddo,
    service
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var provider, serviceEndpoint, result
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(did || service || ddo)) return [3, 6]
            if (!!service) return [3, 3]
            if (!!ddo) return [3, 2]
            return [4, this.ocean.assets.resolve(did)]
          case 1:
            ddo = _a.sent()
            if (!ddo) throw new Error("Couldn't resolve the did ".concat(did))
            _a.label = 2
          case 2:
            service = ddo.findServiceByType('compute')
            if (!service)
              throw new Error(
                "Couldn't find a compute service on the asset with did ".concat(
                  did
                )
              )
            _a.label = 3
          case 3:
            serviceEndpoint = service.serviceEndpoint
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 4:
            provider = _a.sent()
            return [4, provider.setBaseUrl(serviceEndpoint)]
          case 5:
            _a.sent()
            return [3, 7]
          case 6:
            provider = this.ocean.provider
            _a.label = 7
          case 7:
            return [
              4,
              provider.computeResult(jobId, index, destination, consumerAccount)
            ]
          case 8:
            result = _a.sent()
            return [2, result]
        }
      })
    })
  }
  Compute.prototype.createServerAttributes = function (
    serverId,
    serverType,
    cost,
    cpu,
    gpu,
    memory,
    disk,
    maxExecutionTime
  ) {
    return {
      serverId: serverId,
      serverType: serverType,
      cost: cost,
      cpu: cpu,
      gpu: gpu,
      memory: memory,
      disk: disk,
      maxExecutionTime: maxExecutionTime
    }
  }
  Compute.prototype.createContainerAttributes = function (
    image,
    tag,
    checksum
  ) {
    return { image: image, tag: tag, checksum: checksum }
  }
  Compute.prototype.createClusterAttributes = function (type, url) {
    return { type: type, url: url }
  }
  Compute.prototype.createProviderAttributes = function (
    type,
    description,
    cluster,
    containers,
    servers
  ) {
    return {
      type: type,
      description: description,
      environment: {
        cluster: cluster,
        supportedServers: servers,
        supportedContainers: containers
      }
    }
  }
  Compute.prototype.createComputeService = function (
    consumerAccount,
    cost,
    datePublished,
    providerAttributes,
    computePrivacy,
    timeout,
    providerUri,
    requiredCustomParameters
  ) {
    var name = 'dataAssetComputingService'
    if (!timeout) timeout = 3600
    var service = {
      type: 'compute',
      index: 3,
      serviceEndpoint: providerUri || this.ocean.provider.url,
      attributes: {
        main: {
          name: name,
          creator: consumerAccount.getId(),
          datePublished: datePublished,
          cost: cost,
          timeout: timeout,
          provider: providerAttributes,
          privacy: {}
        }
      }
    }
    if (computePrivacy) service.attributes.main.privacy = computePrivacy
    if (
      requiredCustomParameters === null || requiredCustomParameters === void 0
        ? void 0
        : requiredCustomParameters.userCustomParameters
    )
      service.attributes.userCustomParameters =
        requiredCustomParameters.userCustomParameters
    if (
      requiredCustomParameters === null || requiredCustomParameters === void 0
        ? void 0
        : requiredCustomParameters.algoCustomParameters
    )
      service.attributes.algoCustomParameters =
        requiredCustomParameters.algoCustomParameters
    return service
  }
  Compute.prototype.checkOutput = function (consumerAccount, output) {
    var isDefault =
      !output || (!output.publishAlgorithmLog && !output.publishOutput)
    if (isDefault) {
      return {
        publishAlgorithmLog: false,
        publishOutput: false
      }
    }
    return {
      publishAlgorithmLog: output.publishAlgorithmLog,
      publishOutput: output.publishOutput,
      providerAddress: output.providerAddress || this.config.providerAddress,
      providerUri: output.providerUri || this.config.providerUri,
      metadataUri: output.metadataUri || this.config.metadataCacheUri,
      nodeUri: output.nodeUri || this.config.nodeUri,
      owner: output.owner || consumerAccount.getId()
    }
  }
  Compute.prototype.isOrderable = function (
    dataset,
    serviceIndex,
    algorithm,
    algorithmDDO
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var datasetResolved,
        service,
        algoService,
        algoProvider,
        datasetProvider,
        algo,
        _i,
        _a,
        trustedAlgorithm
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, (0, utils_1.assetResolve)(dataset, this.ocean)]
          case 1:
            datasetResolved = _b.sent()
            service = datasetResolved.ddo.findServiceById(serviceIndex)
            if (!service) return [2, false]
            if (!(service.type === 'compute')) return [3, 14]
            if (algorithm.meta) {
              if (service.attributes.main.privacy)
                if (service.attributes.main.privacy.allowRawAlgorithm)
                  return [2, true]
              this.logger.error(
                'ERROR: This service does not allow raw algorithm'
              )
              return [2, false]
            }
            if (!algorithm.did) return [3, 14]
            if (!algorithm.serviceIndex) return [3, 8]
            if (!!algorithmDDO) return [3, 3]
            return [4, this.ocean.assets.resolve(algorithm.did)]
          case 2:
            algorithmDDO = _b.sent()
            if (!algorithmDDO)
              throw new Error("Couldn't resolve the did ".concat(algorithm.did))
            _b.label = 3
          case 3:
            algoService = algorithmDDO.findServiceById(algorithm.serviceIndex)
            if (!(algoService && algoService.type === 'compute')) return [3, 8]
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 4:
            algoProvider = _b.sent()
            return [4, algoProvider.setBaseUrl(algoService.serviceEndpoint)]
          case 5:
            _b.sent()
            return [4, Provider_1.Provider.getInstance(this.instanceConfig)]
          case 6:
            datasetProvider = _b.sent()
            return [4, datasetProvider.setBaseUrl(service.serviceEndpoint)]
          case 7:
            _b.sent()
            if (
              algoProvider.providerAddress !== datasetProvider.providerAddress
            ) {
              this.logger.error(
                'ERROR: Both assets with compute service are not served by the same provider'
              )
              return [2, false]
            }
            _b.label = 8
          case 8:
            if (!service.attributes.main.privacy) return [3, 13]
            if (service.attributes.main.privacy.allowAllPublishedAlgorithms)
              return [2, true]
            if (!service.attributes.main.privacy.publisherTrustedAlgorithms)
              return [2, false]
            algo = void 0
            ;(_i = 0),
              (_a = service.attributes.main.privacy.publisherTrustedAlgorithms)
            _b.label = 9
          case 9:
            if (!(_i < _a.length)) return [3, 12]
            algo = _a[_i]
            if (!(algo.did === algorithm.did)) return [3, 11]
            return [
              4,
              this.createPublisherTrustedAlgorithmfromDID(algorithm.did)
            ]
          case 10:
            trustedAlgorithm = _b.sent()
            if (
              algo.containerSectionChecksum &&
              algo.containerSectionChecksum !==
                trustedAlgorithm.containerSectionChecksum
            ) {
              this.logger.error(
                'ERROR: Algorithm container section was altered since it was added as trusted by ' +
                  datasetResolved.did
              )
              return [2, false]
            }
            if (
              algo.filesChecksum &&
              algo.filesChecksum !== trustedAlgorithm.filesChecksum
            ) {
              this.logger.error(
                'ERROR: Algorithm files section was altered since it was added as trusted by ' +
                  datasetResolved.ddo
              )
              return [2, false]
            }
            return [2, true]
          case 11:
            _i++
            return [3, 9]
          case 12:
            this.logger.error(
              'ERROR: Algorithm ' +
                algorithm.did +
                ' is not allowed by ' +
                datasetResolved.did
            )
            return [2, false]
          case 13:
            console.error('Algo Index:' + algorithm.serviceIndex)
            _b.label = 14
          case 14:
            return [2, true]
        }
      })
    })
  }
  Compute.prototype.orderAsset = function (
    consumerAccount,
    dataset,
    serviceIndex,
    algorithm,
    mpAddress,
    computeAddress,
    userCustomParameters,
    authService,
    searchPreviousOrders
  ) {
    var _this = this
    if (authService === void 0) {
      authService = 'json'
    }
    if (searchPreviousOrders === void 0) {
      searchPreviousOrders = true
    }
    return new utils_1.SubscribablePromise(function (observer) {
      return __awaiter(_this, void 0, void 0, function () {
        var ddo, allowed, service, order, error_1
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, (0, utils_1.assetResolve)(dataset, this.ocean)]
            case 1:
              ddo = _a.sent().ddo
              return [4, this.isOrderable(ddo, serviceIndex, algorithm)]
            case 2:
              allowed = _a.sent()
              if (!allowed)
                throw new Error(
                  'Dataset order failed, dataset is not orderable with the specified algorithm'
                )
              service = ddo.findServiceById(serviceIndex)
              if (!service)
                throw new Error(
                  'Dataset order failed, Could not find service for the DDO'
                )
              _a.label = 3
            case 3:
              _a.trys.push([3, 5, , 6])
              return [
                4,
                this.ocean.assets.order(
                  ddo,
                  service.type,
                  consumerAccount,
                  -1,
                  mpAddress,
                  computeAddress,
                  userCustomParameters,
                  authService,
                  searchPreviousOrders
                )
              ]
            case 4:
              order = _a.sent()
              return [2, order]
            case 5:
              error_1 = _a.sent()
              this.logger.error(
                'ERROR: Failed to order: '.concat(error_1.message)
              )
              throw new Error(
                'Failed to order dataset: '.concat(error_1.message)
              )
            case 6:
              return [2]
          }
        })
      })
    })
  }
  Compute.prototype.orderAlgorithm = function (
    asset,
    serviceType,
    payerAddress,
    serviceIndex,
    mpAddress,
    consumerAddress,
    userCustomParameters,
    authService,
    searchPreviousOrders
  ) {
    if (serviceIndex === void 0) {
      serviceIndex = -1
    }
    if (authService === void 0) {
      authService = 'json'
    }
    if (searchPreviousOrders === void 0) {
      searchPreviousOrders = true
    }
    return __awaiter(this, void 0, void 0, function () {
      var error_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [
              4,
              this.ocean.assets.order(
                asset,
                serviceType,
                payerAddress,
                serviceIndex,
                mpAddress,
                consumerAddress,
                userCustomParameters,
                authService,
                searchPreviousOrders
              )
            ]
          case 1:
            return [2, _a.sent()]
          case 2:
            error_2 = _a.sent()
            this.logger.error(
              'ERROR: Failed to orderAlgorithm: '.concat(error_2.message)
            )
            throw new Error(
              'Failed to order algorithm: '.concat(error_2.message)
            )
          case 3:
            return [2]
        }
      })
    })
  }
  Compute.prototype.editComputePrivacy = function (
    ddo,
    serviceIndex,
    computePrivacy
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        if (!ddo) return [2, null]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2, null]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined') return [2, null]
        if (ddo.service[serviceIndex].type !== 'compute') return [2, null]
        ddo.service[serviceIndex].attributes.main.privacy.allowRawAlgorithm =
          computePrivacy.allowRawAlgorithm
        ddo.service[
          serviceIndex
        ].attributes.main.privacy.allowAllPublishedAlgorithms =
          computePrivacy.allowAllPublishedAlgorithms
        ddo.service[serviceIndex].attributes.main.privacy.allowNetworkAccess =
          computePrivacy.allowNetworkAccess
        ddo.service[
          serviceIndex
        ].attributes.main.privacy.publisherTrustedAlgorithms =
          computePrivacy.publisherTrustedAlgorithms
        return [2, ddo]
      })
    })
  }
  Compute.prototype.toggleAllowAllPublishedAlgorithms = function (
    ddo,
    serviceIndex,
    newState
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        if (!ddo) return [2, null]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2, null]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined') return [2, null]
        if (ddo.service[serviceIndex].type !== 'compute') return [2, null]
        ddo.service[
          serviceIndex
        ].attributes.main.privacy.allowAllPublishedAlgorithms = newState
        return [2, ddo]
      })
    })
  }
  Compute.prototype.createPublisherTrustedAlgorithmfromDID = function (
    did,
    ddo
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!!ddo) return [3, 2]
            return [4, this.ocean.assets.resolve(did)]
          case 1:
            ddo = _a.sent()
            if (!ddo) return [2, null]
            _a.label = 2
          case 2:
            service = ddo.findServiceByType('metadata')
            if (!service) return [2, null]
            if (!service.attributes.main.algorithm) return [2, null]
            if (!service.attributes.encryptedFiles) return [2, null]
            if (!service.attributes.main.files) return [2, null]
            return [
              2,
              {
                did: did,
                containerSectionChecksum: (0, crypto_js_1.SHA256)(
                  JSON.stringify(service.attributes.main.algorithm.container)
                ).toString(),
                filesChecksum: (0, crypto_js_1.SHA256)(
                  service.attributes.encryptedFiles +
                    JSON.stringify(service.attributes.main.files)
                ).toString()
              }
            ]
        }
      })
    })
  }
  Compute.prototype.addTrustedAlgorithmtoAsset = function (
    ddo,
    serviceIndex,
    algoDid
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service, trustedAlgorithm
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!ddo) return [2, null]
            if (serviceIndex === -1) {
              service = ddo.findServiceByType('compute')
              if (!service) return [2, null]
              serviceIndex = service.index
            }
            if (typeof ddo.service[serviceIndex] === 'undefined')
              return [2, null]
            if (ddo.service[serviceIndex].type !== 'compute') return [2, null]
            if (
              !ddo.service[serviceIndex].attributes.main.privacy
                .publisherTrustedAlgorithms
            )
              ddo.service[
                serviceIndex
              ].attributes.main.privacy.publisherTrustedAlgorithms = []
            return [4, this.createPublisherTrustedAlgorithmfromDID(algoDid)]
          case 1:
            trustedAlgorithm = _a.sent()
            if (trustedAlgorithm)
              ddo.service[
                serviceIndex
              ].attributes.main.privacy.publisherTrustedAlgorithms.push(
                trustedAlgorithm
              )
            return [2, ddo]
        }
      })
    })
  }
  Compute.prototype.isAlgorithmTrusted = function (ddo, serviceIndex, algoDid) {
    return __awaiter(this, void 0, void 0, function () {
      var service, algo, _i, _a
      return __generator(this, function (_b) {
        if (!ddo) return [2, false]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2, false]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined') return [2, false]
        if (ddo.service[serviceIndex].type !== 'compute') return [2, false]
        if (
          ddo.service[serviceIndex].attributes.main.privacy
            .allowAllPublishedAlgorithms
        )
          return [2, true]
        for (
          _i = 0,
            _a =
              ddo.service[serviceIndex].attributes.main.privacy
                .publisherTrustedAlgorithms;
          _i < _a.length;
          _i++
        ) {
          algo = _a[_i]
          if (algo.did === algoDid) return [2, true]
        }
        return [2, false]
      })
    })
  }
  Compute.prototype.removeTrustedAlgorithmFromAsset = function (
    ddo,
    serviceIndex,
    algoDid
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        if (!ddo) return [2, null]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2, ddo]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined') return [2, ddo]
        if (ddo.service[serviceIndex].type !== 'compute') return [2, ddo]
        if (
          !ddo.service[serviceIndex].attributes.main.privacy
            .publisherTrustedAlgorithms
        )
          return [2, ddo]
        ddo.service[
          serviceIndex
        ].attributes.main.privacy.publisherTrustedAlgorithms = ddo.service[
          serviceIndex
        ].attributes.main.privacy.publisherTrustedAlgorithms.filter(function (
          el
        ) {
          return el.did !== algoDid
        })
        return [2, ddo]
      })
    })
  }
  return Compute
})(Instantiable_abstract_1.Instantiable)
exports.Compute = Compute
//# sourceMappingURL=Compute.js.map
