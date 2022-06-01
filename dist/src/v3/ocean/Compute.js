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
/**
 * Compute submodule of Ocean Protocol.
 */
var Compute = /** @class */ (function (_super) {
  __extends(Compute, _super)
  function Compute() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  /**
   * Returns the instance of Compute.
   * @return {Promise<Assets>}
   */
  Compute.getInstance = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      var instance
      return __generator(this, function (_a) {
        instance = new Compute()
        instance.setInstanceConfig(config)
        return [2 /*return*/, instance]
      })
    })
  }
  /**
   * Gets the compute address for ordering compute assets
   * @param  {string} did Decentralized identifer of the primary asset (this will determine where compute happens)
   * @param  {number} serviceIndex If asset has multiple compute services
   * @return {Promise<String>} Returns compute address
   */
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
            if (!(serviceIndex === -1)) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              this.ocean.assets.getServiceByType(did, serviceType)
            ]
          case 1:
            service = _a.sent()
            serviceIndex = service.index
            return [3 /*break*/, 4]
          case 2:
            return [
              4 /*yield*/,
              this.ocean.assets.getServiceByIndex(did, serviceIndex)
            ]
          case 3:
            service = _a.sent()
            serviceType = service.type
            _a.label = 4
          case 4:
            serviceEndpoint = service.serviceEndpoint
            return [
              4 /*yield*/,
              Provider_1.Provider.getInstance(this.instanceConfig)
            ]
          case 5:
            provider = _a.sent()
            return [4 /*yield*/, provider.setBaseUrl(serviceEndpoint)]
          case 6:
            _a.sent()
            return [2 /*return*/, provider.computeAddress]
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
  /**
   * Creates a compute service
   * @param {Account} consumerAccount
   * @param {String} cost  number of datatokens needed for this service, expressed in wei
   * @param {String} datePublished
   * @param {Object} providerAttributes
   * @param {Object} computePrivacy
   * @param {Number} timeout
   * @return {Promise<string>} service
   */
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
  /**
   * Check the output object and add default properties if needed
   * @param  {Account} consumerAccount The account of the consumer ordering the service.
   * @param  {Output} output Output section used for publishing the result.
   * @return {Promise<Output>} Returns output object
   */
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
  /**
   * Checks if an asset is orderable with a specific algorithm
   * @param  {DDO|string} dataset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier of the asset (of type `dataset`) to run the algorithm on.
   * @param  {string} serviceIndex The Service index
   * @param  {ComputeAlgorithm} algorithm
   * @param  {DDO} algorithmDDO Algorithm DDO object. If undefined then the ddo will be fetched by did
   * @return {Promise<boolean>} True is you can order this
   *
   * Note:  algorithmDid and algorithmMeta are optional, but if they are not passed,
   * you can end up in the situation that you are ordering and paying for your compute job,
   * but provider will not allow the compute, due to privacy settings of the ddo
   */
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
            return [4 /*yield*/, (0, utils_1.assetResolve)(dataset, this.ocean)]
          case 1:
            datasetResolved = _b.sent()
            service = datasetResolved.ddo.findServiceById(serviceIndex)
            if (!service) return [2 /*return*/, false]
            if (!(service.type === 'compute')) return [3 /*break*/, 14]
            if (algorithm.meta) {
              // check if raw algo is allowed
              if (service.attributes.main.privacy)
                if (service.attributes.main.privacy.allowRawAlgorithm)
                  return [2 /*return*/, true]
              this.logger.error(
                'ERROR: This service does not allow raw algorithm'
              )
              return [2 /*return*/, false]
            }
            if (!algorithm.did) return [3 /*break*/, 14]
            if (!algorithm.serviceIndex) return [3 /*break*/, 8]
            if (!!algorithmDDO) return [3 /*break*/, 3]
            return [4 /*yield*/, this.ocean.assets.resolve(algorithm.did)]
          case 2:
            algorithmDDO = _b.sent()
            if (!algorithmDDO)
              throw new Error("Couldn't resolve the did ".concat(algorithm.did))
            _b.label = 3
          case 3:
            algoService = algorithmDDO.findServiceById(algorithm.serviceIndex)
            if (!(algoService && algoService.type === 'compute'))
              return [3 /*break*/, 8]
            return [
              4 /*yield*/,
              Provider_1.Provider.getInstance(this.instanceConfig)
            ]
          case 4:
            algoProvider = _b.sent()
            return [
              4 /*yield*/,
              algoProvider.setBaseUrl(algoService.serviceEndpoint)
            ]
          case 5:
            _b.sent()
            return [
              4 /*yield*/,
              Provider_1.Provider.getInstance(this.instanceConfig)
            ]
          case 6:
            datasetProvider = _b.sent()
            return [
              4 /*yield*/,
              datasetProvider.setBaseUrl(service.serviceEndpoint)
            ]
          case 7:
            _b.sent()
            if (
              algoProvider.providerAddress !== datasetProvider.providerAddress
            ) {
              this.logger.error(
                'ERROR: Both assets with compute service are not served by the same provider'
              )
              return [2 /*return*/, false]
            }
            _b.label = 8
          case 8:
            if (!service.attributes.main.privacy) return [3 /*break*/, 13]
            if (service.attributes.main.privacy.allowAllPublishedAlgorithms)
              return [2 /*return*/, true]
            if (!service.attributes.main.privacy.publisherTrustedAlgorithms)
              return [2 /*return*/, false]
            algo = void 0
            ;(_i = 0),
              (_a = service.attributes.main.privacy.publisherTrustedAlgorithms)
            _b.label = 9
          case 9:
            if (!(_i < _a.length)) return [3 /*break*/, 12]
            algo = _a[_i]
            if (!(algo.did === algorithm.did)) return [3 /*break*/, 11]
            return [
              4 /*yield*/,
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
              return [2 /*return*/, false]
            }
            if (
              algo.filesChecksum &&
              algo.filesChecksum !== trustedAlgorithm.filesChecksum
            ) {
              this.logger.error(
                'ERROR: Algorithm files section was altered since it was added as trusted by ' +
                  datasetResolved.ddo
              )
              return [2 /*return*/, false]
            }
            // all conditions are meet
            return [2 /*return*/, true]
          case 11:
            _i++
            return [3 /*break*/, 9]
          case 12:
            // algorithmDid was not found
            this.logger.error(
              'ERROR: Algorithm ' +
                algorithm.did +
                ' is not allowed by ' +
                datasetResolved.did
            )
            return [2 /*return*/, false]
          case 13:
            console.error('Algo Index:' + algorithm.serviceIndex)
            _b.label = 14
          case 14:
            return [2 /*return*/, true] // not a compute asset
        }
      })
    })
  }
  /**
   * Starts an order of a compute or access service for a compute job
   * @param  {String} consumerAccount The account of the consumer ordering the service.
   * @param  {DDO|string} dataset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier of the asset (of type `dataset`) to run the algorithm on.
   * @param  {string} serviceIndex The Service index
   * @param  {string} algorithmDid The DID of the algorithm asset (of type `algorithm`) to run on the asset.
   * @param  {string} algorithmServiceIndex The index of the service in the algorithm
   * @param  {MetaData} algorithmMeta Metadata about the algorithm being run if `algorithm` is being used. This is ignored when `algorithmDid` is specified.
   * @return {SubscribablePromise<OrderProgressStep, string>} Returns the transaction details
   *
   * Note:  algorithmDid and algorithmMeta are optional, but if they are not passed,
   * you can end up in the situation that you are ordering and paying for your compute job,
   * but provider will not allow the compute, due to privacy settings of the ddo
   */
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
              return [
                4 /*yield*/,
                (0, utils_1.assetResolve)(dataset, this.ocean)
                // first check if we can order this
              ]
            case 1:
              ddo = _a.sent().ddo
              return [
                4 /*yield*/,
                this.isOrderable(ddo, serviceIndex, algorithm)
              ]
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
                4 /*yield*/,
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
              return [2 /*return*/, order]
            case 5:
              error_1 = _a.sent()
              this.logger.error(
                'ERROR: Failed to order: '.concat(error_1.message)
              )
              throw new Error(
                'Failed to order dataset: '.concat(error_1.message)
              )
            case 6:
              return [2 /*return*/]
          }
        })
      })
    })
  }
  /**
   * Orders & pays for a algorithm
   * @param  {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} payerAddress
   * @param {Number} serviceIndex
   * @param {String} mpAddress Marketplace fee collector address
   * @param {String} consumerAddress Optionally, if the consumer is another address than payer
   * @return {Promise<String>} transactionHash of the payment
   */
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
              4 /*yield*/,
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
            return [2 /*return*/, _a.sent()]
          case 2:
            error_2 = _a.sent()
            this.logger.error(
              'ERROR: Failed to orderAlgorithm: '.concat(error_2.message)
            )
            throw new Error(
              'Failed to order algorithm: '.concat(error_2.message)
            )
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * Edit Compute Privacy
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {ServiceComputePrivacy} computePrivacy ComputePrivacy fields & new values.
   * @param  {Account} account Ethereum account of owner to sign and prove the ownership.
   * @return {Promise<DDO>}
   */
  Compute.prototype.editComputePrivacy = function (
    ddo,
    serviceIndex,
    computePrivacy
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        if (!ddo) return [2 /*return*/, null]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2 /*return*/, null]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined')
          return [2 /*return*/, null]
        if (ddo.service[serviceIndex].type !== 'compute')
          return [2 /*return*/, null]
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
        return [2 /*return*/, ddo]
      })
    })
  }
  /**
   * Toogle allowAllPublishedAlgorithms
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {boolean} newState
   * @return {Promise<DDDO>} Returns the new DDO
   */
  Compute.prototype.toggleAllowAllPublishedAlgorithms = function (
    ddo,
    serviceIndex,
    newState
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        if (!ddo) return [2 /*return*/, null]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2 /*return*/, null]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined')
          return [2 /*return*/, null]
        if (ddo.service[serviceIndex].type !== 'compute')
          return [2 /*return*/, null]
        ddo.service[
          serviceIndex
        ].attributes.main.privacy.allowAllPublishedAlgorithms = newState
        return [2 /*return*/, ddo]
      })
    })
  }
  /**
   * Generates a publisherTrustedAlgorithm object from a algorithm did
   * @param  {did} string DID. You can leave this empty if you already have the DDO
   * @param  {ddo} DDO if empty, will trigger a retrieve
   * @return {Promise<publisherTrustedAlgorithm>}
   */
  Compute.prototype.createPublisherTrustedAlgorithmfromDID = function (
    did,
    ddo
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!!ddo) return [3 /*break*/, 2]
            return [4 /*yield*/, this.ocean.assets.resolve(did)]
          case 1:
            ddo = _a.sent()
            if (!ddo) return [2 /*return*/, null]
            _a.label = 2
          case 2:
            service = ddo.findServiceByType('metadata')
            if (!service) return [2 /*return*/, null]
            if (!service.attributes.main.algorithm) return [2 /*return*/, null]
            if (!service.attributes.encryptedFiles) return [2 /*return*/, null]
            if (!service.attributes.main.files) return [2 /*return*/, null]
            return [
              2 /*return*/,
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
  /**
   * Adds a trusted algorithm to an asset
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {algoDid} string Algorithm DID to be added
   * @return {Promise<DDDO>} Returns the new DDO
   */
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
            if (!ddo) return [2 /*return*/, null]
            if (serviceIndex === -1) {
              service = ddo.findServiceByType('compute')
              if (!service) return [2 /*return*/, null]
              serviceIndex = service.index
            }
            if (typeof ddo.service[serviceIndex] === 'undefined')
              return [2 /*return*/, null]
            if (ddo.service[serviceIndex].type !== 'compute')
              return [2 /*return*/, null]
            if (
              !ddo.service[serviceIndex].attributes.main.privacy
                .publisherTrustedAlgorithms
            )
              ddo.service[
                serviceIndex
              ].attributes.main.privacy.publisherTrustedAlgorithms = []
            return [
              4 /*yield*/,
              this.createPublisherTrustedAlgorithmfromDID(algoDid)
            ]
          case 1:
            trustedAlgorithm = _a.sent()
            if (trustedAlgorithm)
              ddo.service[
                serviceIndex
              ].attributes.main.privacy.publisherTrustedAlgorithms.push(
                trustedAlgorithm
              )
            return [2 /*return*/, ddo]
        }
      })
    })
  }
  /**
   * Check is an algo is trusted
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {algoDid} string Algorithm DID to be added
   * @return {Promise<DDDO>} Returns the new DDO
   */
  Compute.prototype.isAlgorithmTrusted = function (ddo, serviceIndex, algoDid) {
    return __awaiter(this, void 0, void 0, function () {
      var service, algo, _i, _a
      return __generator(this, function (_b) {
        if (!ddo) return [2 /*return*/, false]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2 /*return*/, false]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined')
          return [2 /*return*/, false]
        if (ddo.service[serviceIndex].type !== 'compute')
          return [2 /*return*/, false]
        if (
          ddo.service[serviceIndex].attributes.main.privacy
            .allowAllPublishedAlgorithms
        )
          return [2 /*return*/, true]
        for (
          _i = 0,
            _a =
              ddo.service[serviceIndex].attributes.main.privacy
                .publisherTrustedAlgorithms;
          _i < _a.length;
          _i++
        ) {
          algo = _a[_i]
          if (algo.did === algoDid) return [2 /*return*/, true]
        }
        return [2 /*return*/, false]
      })
    })
  }
  /**
   * Removes a trusted algorithm from an asset
   * @param  {ddo} DDO
   * @param  {number} serviceIndex Index of the compute service in the DDO. If -1, will try to find it
   * @param  {algoDid} string Algorithm DID to be removed
   * @return {Promise<DDDO>} Returns the new DDO
   */
  Compute.prototype.removeTrustedAlgorithmFromAsset = function (
    ddo,
    serviceIndex,
    algoDid
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        if (!ddo) return [2 /*return*/, null]
        if (serviceIndex === -1) {
          service = ddo.findServiceByType('compute')
          if (!service) return [2 /*return*/, ddo]
          serviceIndex = service.index
        }
        if (typeof ddo.service[serviceIndex] === 'undefined')
          return [2 /*return*/, ddo]
        if (ddo.service[serviceIndex].type !== 'compute')
          return [2 /*return*/, ddo]
        if (
          !ddo.service[serviceIndex].attributes.main.privacy
            .publisherTrustedAlgorithms
        )
          return [2 /*return*/, ddo]
        ddo.service[
          serviceIndex
        ].attributes.main.privacy.publisherTrustedAlgorithms = ddo.service[
          serviceIndex
        ].attributes.main.privacy.publisherTrustedAlgorithms.filter(function (
          el
        ) {
          return el.did !== algoDid
        })
        return [2 /*return*/, ddo]
      })
    })
  }
  return Compute
})(Instantiable_abstract_1.Instantiable)
exports.Compute = Compute
//# sourceMappingURL=Compute.js.map
