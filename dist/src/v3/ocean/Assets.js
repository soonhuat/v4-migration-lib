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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Assets = exports.OrderProgressStep = exports.CreateProgressStep = void 0
var DDO_1 = require('../ddo/DDO')
var DID_1 = __importDefault(require('./DID'))
var utils_1 = require('../utils')
var Instantiable_abstract_1 = require('../Instantiable.abstract')
var bignumber_js_1 = __importDefault(require('bignumber.js'))
var Provider_1 = require('../provider/Provider')
var web3_utils_1 = require('web3-utils')
var AssetsCredential_1 = require('./AssetsCredential')
var EventAccessControl_1 = require('./EventAccessControl')
var CreateProgressStep
;(function (CreateProgressStep) {
  CreateProgressStep[(CreateProgressStep['CreatingDataToken'] = 0)] =
    'CreatingDataToken'
  CreateProgressStep[(CreateProgressStep['DataTokenCreated'] = 1)] =
    'DataTokenCreated'
  CreateProgressStep[(CreateProgressStep['EncryptingFiles'] = 2)] =
    'EncryptingFiles'
  CreateProgressStep[(CreateProgressStep['FilesEncrypted'] = 3)] =
    'FilesEncrypted'
  CreateProgressStep[(CreateProgressStep['StoringDdo'] = 4)] = 'StoringDdo'
  CreateProgressStep[(CreateProgressStep['DdoStored'] = 5)] = 'DdoStored'
})(
  (CreateProgressStep =
    exports.CreateProgressStep || (exports.CreateProgressStep = {}))
)
var OrderProgressStep
;(function (OrderProgressStep) {
  OrderProgressStep[(OrderProgressStep['TransferDataToken'] = 0)] =
    'TransferDataToken'
})(
  (OrderProgressStep =
    exports.OrderProgressStep || (exports.OrderProgressStep = {}))
)
/**
 * Assets submodule of Ocean Protocol.
 */
var Assets = /** @class */ (function (_super) {
  __extends(Assets, _super)
  function Assets() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  /**
   * Returns the instance of Assets.
   * @return {Promise<Assets>}
   */
  Assets.getInstance = function (config) {
    return __awaiter(this, void 0, void 0, function () {
      var instance
      return __generator(this, function (_a) {
        instance = new Assets()
        instance.setInstanceConfig(config)
        return [2 /*return*/, instance]
      })
    })
  }
  /**
   * Creates a new DDO. After this, Call ocean.onChainMetadata.to publish
   * @param  {Metadata} metadata DDO metadata.
   * @param  {Account}  publisher Publisher account.
   * @param  {list} services list of Service description documents
   * @param {String} dtAddress existing Data Token Address
   * @param {String} cap Maximum cap (Number) - will be converted to wei
   * @param {String} name Token name
   * @param {String} symbol Token symbol
   * @param {String} providerUri
   * @return {SubscribablePromise<CreateProgressStep, DDO>}
   */
  Assets.prototype.create = function (
    metadata,
    publisher,
    services,
    dtAddress,
    cap,
    name,
    symbol,
    providerUri
  ) {
    var _this = this
    if (services === void 0) {
      services = []
    }
    if (dtAddress && !(0, web3_utils_1.isAddress)(dtAddress)) {
      this.logger.error(
        'Passed Data Token address '.concat(
          dtAddress,
          ' is not valid. Aborting publishing.'
        )
      )
      return null
    }
    this.logger.log('Creating asset')
    return new utils_1.SubscribablePromise(function (observer) {
      return __awaiter(_this, void 0, void 0, function () {
        var datatokens, did, provider, encryptedFiles, indexCount, ddo
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (services.length === 0) {
                this.logger.log(
                  'You have no services. Are you sure about this?'
                )
              }
              datatokens = this.ocean.datatokens
              if (!!dtAddress) return [3 /*break*/, 2]
              this.logger.log('Creating datatoken')
              observer.next(CreateProgressStep.CreatingDataToken)
              return [
                4 /*yield*/,
                datatokens.create('', publisher.getId(), cap, name, symbol)
              ]
            case 1:
              // const metadataCacheUri = this.ocean.metadataCache.getURI()
              // const jsonBlob = { t: 1, url: metadataCacheUri }
              dtAddress = _a.sent()
              if (!(0, web3_utils_1.isAddress)(dtAddress)) {
                this.logger.error(
                  'Created Data Token address '.concat(
                    dtAddress,
                    ' is not valid. Aborting publishing.'
                  )
                )
                return [2 /*return*/, null]
              }
              this.logger.log('DataToken '.concat(dtAddress, ' created'))
              observer.next(CreateProgressStep.DataTokenCreated)
              _a.label = 2
            case 2:
              did = DID_1.default.generate(dtAddress)
              this.logger.log('Encrypting files')
              observer.next(CreateProgressStep.EncryptingFiles)
              if (!providerUri) return [3 /*break*/, 5]
              return [
                4 /*yield*/,
                Provider_1.Provider.getInstance(this.instanceConfig)
              ]
            case 3:
              provider = _a.sent()
              return [4 /*yield*/, provider.setBaseUrl(providerUri)]
            case 4:
              _a.sent()
              return [3 /*break*/, 6]
            case 5:
              provider = this.ocean.provider
              _a.label = 6
            case 6:
              return [
                4 /*yield*/,
                provider.encrypt(did.getDid(), metadata.main.files, publisher)
              ]
            case 7:
              encryptedFiles = _a.sent()
              this.logger.log('Files encrypted')
              observer.next(CreateProgressStep.FilesEncrypted)
              indexCount = 0
              ddo = new DDO_1.DDO({
                id: did.getDid(),
                dataToken: dtAddress,
                authentication: [
                  {
                    type: 'RsaSignatureAuthentication2018',
                    publicKey: did.getDid()
                  }
                ],
                publicKey: [
                  {
                    id: did.getDid(),
                    type: 'EthereumECDSAKey',
                    owner: publisher.getId()
                  }
                ],
                service: __spreadArray(
                  [
                    {
                      type: 'metadata',
                      attributes: __assign(
                        __assign(
                          {
                            // Default values
                            status: {
                              isListed: true,
                              isRetired: false,
                              isOrderDisabled: false
                            }
                          },
                          metadata
                        ),
                        {
                          encryptedFiles: encryptedFiles,
                          // Cleaning not needed information
                          main: __assign(__assign({}, metadata.main), {
                            files: metadata.main.files.map(function (
                              file,
                              index
                            ) {
                              return __assign(__assign({}, file), {
                                index: index,
                                url: undefined
                              })
                            })
                          })
                        }
                      )
                    }
                  ],
                  services,
                  true
                )
                  .reverse()
                  .filter(function (_a, i, list) {
                    var type = _a.type
                    return (
                      list.findIndex(function (_a) {
                        var t = _a.type
                        return t === type
                      }) === i
                    )
                  })
                  .reverse()
                  // Adding index
                  .map(function (_) {
                    return __assign(__assign({}, _), { index: indexCount++ })
                  })
              })
              return [4 /*yield*/, ddo.addProof(this.ocean, publisher.getId())]
            case 8:
              _a.sent()
              ddo.dataTokenInfo = {
                name: name,
                symbol: symbol,
                address: dtAddress,
                cap: parseFloat(cap)
              }
              return [
                2 /*return*/,
                ddo
                /* Remeber to call ocean.onChainMetadata.publish after creating the DDO.
                            
                            this.logger.log('Storing DDO')
                            observer.next(CreateProgressStep.StoringDdo)
                            const storeTx = await this.ocean.onChainMetadata.publish(
                              ddo.id,
                              ddo,
                              publisher.getId()
                            )
                            this.logger.log('DDO stored ' + ddo.id)
                            observer.next(CreateProgressStep.DdoStored)
                            if (storeTx) return ddo
                            else return null
                            */
              ]
          }
        })
      })
    })
  }
  /**
   * Returns a DDO by DID.
   * @param  {string} did Decentralized ID.
   * @return {Promise<DDO>}
   */
  Assets.prototype.resolve = function (did) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.ocean.metadataCache.retrieveDDO(did)]
      })
    })
  }
  /**    Metadata updates
   *  Don't forget to call ocean.OnChainmetadataCache.update after using this functions
   * ie:  ocean.OnChainmetadataCache.update(ddo.id,ddo,account.getId())
   */
  /**
   * Edit Metadata for a DID.
   * @param  {ddo} DDO
   * @param  {newMetadata}  EditableMetadata Metadata fields & new values.
   * @return {Promise<DDO>} the new DDO
   */
  Assets.prototype.editMetadata = function (ddo, newMetadata) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var i
      return __generator(this, function (_b) {
        if (!ddo) return [2 /*return*/, null]
        for (i = 0; i < ddo.service.length; i++) {
          if (ddo.service[i].type !== 'metadata') continue
          if (newMetadata.title)
            ddo.service[i].attributes.main.name = newMetadata.title
          if (newMetadata.author)
            ddo.service[i].attributes.main.author = newMetadata.author
          if (!ddo.service[i].attributes.additionalInformation)
            ddo.service[i].attributes.additionalInformation = Object()
          if (newMetadata.description)
            ddo.service[i].attributes.additionalInformation.description =
              newMetadata.description
          if (newMetadata.links) {
            ddo.service[i].attributes.additionalInformation.links =
              newMetadata.links
          } else {
            ddo.service[i].attributes.additionalInformation.links = []
          }
          if (
            ((_a = newMetadata.status) === null || _a === void 0
              ? void 0
              : _a.isOrderDisabled) !== undefined
          ) {
            !ddo.service[i].attributes.status
              ? (ddo.service[i].attributes.status = {
                  isOrderDisabled: newMetadata.status.isOrderDisabled
                })
              : (ddo.service[i].attributes.status.isOrderDisabled =
                  newMetadata.status.isOrderDisabled)
          }
        }
        return [2 /*return*/, ddo]
      })
    })
  }
  /**
   * Update Credentials attribute in DDO
   * @param  {ddo} DDO
   * @param {credentialType} string e.g. address / credentail3Box
   * @param {allowList} string[] List of allow credential
   * @param {denyList} string[] List of deny credential
   * @return {Promise<DDO>} Updated DDO
   */
  Assets.prototype.updateCredentials = function (
    ddo,
    credentialType,
    allowList,
    denyList
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var newDDo
      return __generator(this, function (_a) {
        if (allowList && allowList.length > 0) {
          newDDo = (0, AssetsCredential_1.updateCredentialDetail)(
            ddo,
            credentialType,
            allowList,
            'allow'
          )
        } else {
          newDDo = (0, AssetsCredential_1.removeCredentialDetail)(
            ddo,
            credentialType,
            'allow'
          )
        }
        if (denyList && denyList.length > 0) {
          newDDo = (0, AssetsCredential_1.updateCredentialDetail)(
            ddo,
            credentialType,
            denyList,
            'deny'
          )
        } else {
          newDDo = (0, AssetsCredential_1.removeCredentialDetail)(
            ddo,
            credentialType,
            'deny'
          )
        }
        return [2 /*return*/, newDDo]
      })
    })
  }
  /**
   * check if a credential can consume a dataset
   * @param  {ddo} DDO
   * @param {credentialType} string e.g. address / credentail3Box
   * @param {value} string credential
   * @return {Consumable} allowed  0 = OK , 2 - Credential not in allow list, 3 - Credential in deny list
   */
  Assets.prototype.checkCredential = function (ddo, credentialType, value) {
    var status = 0
    var message = 'All good'
    var result = true
    if (ddo.credentials) {
      if (ddo.credentials.allow && ddo.credentials.allow.length > 0) {
        var allowList = ddo.credentials.allow.find(function (credentail) {
          return credentail.type === credentialType
        })
        if (allowList && !allowList.values.includes(value)) {
          status = 2
          message =
            'Access is denied, your wallet address is not found on allow list'
          result = false
        }
      }
      if (ddo.credentials.deny && ddo.credentials.deny.length > 0) {
        var denyList = ddo.credentials.deny.find(function (credentail) {
          return credentail.type === credentialType
        })
        if (denyList && denyList.values.includes(value)) {
          status = 3
          message =
            'Access is denied, your wallet address is found on deny list'
          result = false
        }
      }
    }
    return { status: status, message: message, result: result }
  }
  /**
   * Publish DDO on chain.
   * @param  {ddo} DDO
   * @param {String} consumerAccount
   * @param {boolean} encrypt
   * @return {Promise<TransactionReceipt>} transaction
   */
  Assets.prototype.publishDdo = function (ddo, consumerAccount, encrypt) {
    if (encrypt === void 0) {
      encrypt = false
    }
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.ocean.onChainMetadata.publish(
                ddo.id,
                ddo,
                consumerAccount,
                encrypt
              )
            ]
          case 1:
            return [2 /*return*/, _a.sent()]
        }
      })
    })
  }
  /**
   * Update Metadata on chain.
   * @param  {ddo} DDO
   * @param {String} consumerAccount
   * @return {Promise<TransactionReceipt>} transaction
   */
  Assets.prototype.updateMetadata = function (ddo, consumerAccount) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.ocean.onChainMetadata.update(ddo.id, ddo, consumerAccount)
            ]
          case 1:
            return [2 /*return*/, _a.sent()]
        }
      })
    })
  }
  /**
   * Edit Service Timeouts
   * @param  {ddo} DDO if empty, will trigger a retrieve
   * @param  {number} serviceIndex Index of the compute service in the DDO.
   * @param  {number} timeout New timeout setting
   * @return {Promise<DDO>}
   */
  Assets.prototype.editServiceTimeout = function (ddo, serviceIndex, timeout) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (!ddo) return [2 /*return*/, null]
        if (typeof ddo.service[serviceIndex] === 'undefined')
          return [2 /*return*/, null]
        if (timeout < 0) return [2 /*return*/, null]
        ddo.service[serviceIndex].attributes.main.timeout = parseInt(
          timeout.toFixed()
        )
        return [2 /*return*/, ddo]
      })
    })
  }
  /**    End metadata updates   */
  /**
   * Returns the creator of a asset.
   * @param  {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @return {Promise<string>} Returns eth address
   */
  Assets.prototype.creator = function (asset) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, did, ddo, checksum, _b, creator, signatureValue, signer
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4 /*yield*/, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ;(_a = _c.sent()), (did = _a.did), (ddo = _a.ddo)
            checksum = ddo.getChecksum()
            ;(_b = ddo.proof),
              (creator = _b.creator),
              (signatureValue = _b.signatureValue)
            return [
              4 /*yield*/,
              this.ocean.utils.signature.verifyText(checksum, signatureValue)
            ]
          case 2:
            signer = _c.sent()
            if (signer.toLowerCase() !== creator.toLowerCase()) {
              this.logger.warn(
                'Owner of '
                  .concat(did, " doesn't match. Expected ")
                  .concat(creator, ' instead of ')
                  .concat(signer, '.')
              )
            }
            return [2 /*return*/, creator]
        }
      })
    })
  }
  Assets.prototype.getServiceByType = function (asset, serviceType) {
    return __awaiter(this, void 0, void 0, function () {
      var ddo, service, services
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ddo = _a.sent().ddo
            services = ddo.service
            services.forEach(function (serv) {
              if (serv.type.toString() === serviceType) {
                service = serv
              }
            })
            return [2 /*return*/, service]
        }
      })
    })
  }
  Assets.prototype.getServiceByIndex = function (asset, serviceIndex) {
    return __awaiter(this, void 0, void 0, function () {
      var ddo, service, services
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ddo = _a.sent().ddo
            services = ddo.service
            services.forEach(function (serv) {
              if (serv.index === serviceIndex) {
                service = serv
              }
            })
            return [2 /*return*/, service]
        }
      })
    })
  }
  /**
   * Search over the assets using a query.
   * @param  {SearchQuery} query Query to filter the assets.
   * @return {Promise<QueryResult>}
   */
  Assets.prototype.query = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.ocean.metadataCache.queryMetadata(query)]
      })
    })
  }
  /**
   * Creates an access service
   * @param {Account} creator
   * @param {String} cost  number of datatokens needed for this service
   * @param {String} datePublished
   * @param {Number} timeout
   * @param {String} providerUri
   * @param {ServiceCustomParametersRequired} requiredParameters
   * @return {Promise<ServiceAccess>} service
   */
  Assets.prototype.createAccessServiceAttributes = function (
    creator,
    cost,
    datePublished,
    timeout,
    providerUri,
    requiredParameters
  ) {
    if (timeout === void 0) {
      timeout = 0
    }
    return __awaiter(this, void 0, void 0, function () {
      var service
      return __generator(this, function (_a) {
        service = {
          type: 'access',
          index: 2,
          serviceEndpoint: providerUri || this.ocean.provider.url,
          attributes: {
            main: {
              creator: creator.getId(),
              datePublished: datePublished,
              cost: cost,
              timeout: timeout,
              name: 'dataAssetAccess'
            }
          }
        }
        if (
          requiredParameters === null || requiredParameters === void 0
            ? void 0
            : requiredParameters.userCustomParameters
        )
          service.attributes.userCustomParameters =
            requiredParameters.userCustomParameters
        if (
          requiredParameters === null || requiredParameters === void 0
            ? void 0
            : requiredParameters.algoCustomParameters
        )
          service.attributes.algoCustomParameters =
            requiredParameters.algoCustomParameters
        return [2 /*return*/, service]
      })
    })
  }
  /**
   * Initialize a service
   * Can be used to compute totalCost for ordering a service
   * @param {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} consumerAddress
   * @param {Number} serviceIndex
   * @param {String} serviceEndpoint
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<any>} Order details
   */
  Assets.prototype.initialize = function (
    asset,
    serviceType,
    consumerAddress,
    serviceIndex,
    serviceEndpoint,
    userCustomParameters
  ) {
    if (serviceIndex === void 0) {
      serviceIndex = -1
    }
    return __awaiter(this, void 0, void 0, function () {
      var provider, res, providerData
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              Provider_1.Provider.getInstance(this.instanceConfig)
            ]
          case 1:
            provider = _a.sent()
            return [4 /*yield*/, provider.setBaseUrl(serviceEndpoint)]
          case 2:
            _a.sent()
            return [
              4 /*yield*/,
              provider.initialize(
                asset,
                serviceIndex,
                serviceType,
                consumerAddress,
                userCustomParameters
              )
            ]
          case 3:
            res = _a.sent()
            if (res === null) return [2 /*return*/, null]
            providerData = JSON.parse(res)
            return [2 /*return*/, providerData]
        }
      })
    })
  }
  /**
   * Orders & pays for a service
   * @param {DDO|string} asset DID Descriptor Object containing all the data related to an asset or a Decentralized identifier.
   * @param {String} serviceType
   * @param {String} payerAddress
   * @param {Number} serviceIndex
   * @param {String} mpAddress Marketplace fee collector address
   * @param {String} consumerAddress Optionally, if the consumer is another address than payer
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<String>} transactionHash of the payment
   */
  Assets.prototype.order = function (
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
      var service,
        ddo,
        consumable,
        providerData,
        previousOrder,
        balance,
        _a,
        totalCost,
        txid,
        e_1
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4 /*yield*/, (0, utils_1.assetResolve)(asset, this.ocean)]
          case 1:
            ddo = _b.sent().ddo
            return [
              4 /*yield*/,
              this.isConsumable(ddo, payerAddress, 'address', authService)
            ]
          case 2:
            consumable = _b.sent()
            if (!consumable.result) {
              throw new Error('Order asset failed, ' + consumable.message)
            }
            if (!consumerAddress) consumerAddress = payerAddress
            if (!(serviceIndex === -1)) return [3 /*break*/, 4]
            return [4 /*yield*/, this.getServiceByType(ddo, serviceType)]
          case 3:
            service = _b.sent()
            serviceIndex = service.index
            return [3 /*break*/, 6]
          case 4:
            return [4 /*yield*/, this.getServiceByIndex(ddo, serviceIndex)]
          case 5:
            service = _b.sent()
            serviceType = service.type
            _b.label = 6
          case 6:
            return [
              4 /*yield*/,
              this.isUserCustomParametersValid(
                service.attributes.userCustomParameters,
                userCustomParameters
              )
            ]
          case 7:
            // TODO validate userCustomParameters
            if (!_b.sent()) {
              throw new Error(
                'Order asset failed, Missing required fiels in userCustomParameters'
              )
            }
            _b.label = 8
          case 8:
            _b.trys.push([8, 14, , 15])
            return [
              4 /*yield*/,
              this.initialize(
                ddo,
                serviceType,
                payerAddress,
                serviceIndex,
                service.serviceEndpoint,
                userCustomParameters
              )
            ]
          case 9:
            providerData = _b.sent()
            if (!providerData)
              throw new Error(
                'Order asset failed, Failed to initialize service to compute totalCost for ordering'
              )
            if (!searchPreviousOrders) return [3 /*break*/, 11]
            return [
              4 /*yield*/,
              this.ocean.datatokens.getPreviousValidOrders(
                providerData.dataToken,
                providerData.numTokens,
                serviceIndex,
                service.attributes.main.timeout,
                consumerAddress
              )
            ]
          case 10:
            previousOrder = _b.sent()
            if (previousOrder) return [2 /*return*/, previousOrder]
            _b.label = 11
          case 11:
            _a = bignumber_js_1.default.bind
            return [
              4 /*yield*/,
              this.ocean.datatokens.balance(
                providerData.dataToken,
                payerAddress
              )
            ]
          case 12:
            balance = new (_a.apply(bignumber_js_1.default, [
              void 0,
              _b.sent()
            ]))()
            totalCost = new bignumber_js_1.default(
              String(providerData.numTokens)
            )
            if (balance.isLessThan(totalCost)) {
              this.logger.error(
                'ERROR: Not enough funds Needed ' +
                  totalCost.toString() +
                  ' but balance is ' +
                  balance.toString()
              )
              throw new Error(
                'ERROR: Not enough funds Needed ' +
                  totalCost.toString() +
                  ' but balance is ' +
                  balance.toString()
              )
            }
            return [
              4 /*yield*/,
              this.ocean.datatokens.startOrder(
                providerData.dataToken,
                consumerAddress,
                String(providerData.numTokens),
                serviceIndex,
                mpAddress,
                payerAddress
              )
            ]
          case 13:
            txid = _b.sent()
            if (txid) return [2 /*return*/, txid.transactionHash]
            return [3 /*break*/, 15]
          case 14:
            e_1 = _b.sent()
            this.logger.error(
              'ERROR: Failed to order a service : '.concat(e_1.message)
            )
            throw new Error(''.concat(e_1.message))
          case 15:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * get Order History
   * @param {Account} account
   * @param {string} serviceType Optional, filter by
   * @param {number} fromBlock Optional, start at block
   * @return {Promise<OrderHistory[]>} transactionHash of the payment
   */
  Assets.prototype.getOrderHistory = function (
    account,
    serviceType,
    fromBlock
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var results,
        address,
        datatokens,
        topic1,
        topic0,
        events,
        i,
        order,
        params,
        service,
        e_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            results = []
            address = account.getId().toLowerCase()
            datatokens = this.ocean.datatokens
            topic1 = '0x000000000000000000000000' + address.substring(2)
            topic0 = datatokens.getStartOrderEventSignature()
            return [
              4 /*yield*/,
              this.web3.eth.getPastLogs({
                topics: [topic0, null, topic1],
                fromBlock: fromBlock || 0,
                toBlock: 'latest'
              })
            ]
          case 1:
            events = _a.sent()
            i = 0
            _a.label = 2
          case 2:
            if (!(i < events.length)) return [3 /*break*/, 7]
            order = {
              dtAddress: events[i].address,
              timestamp: 0,
              transactionHash: events[i].transactionHash,
              amount: null,
              consumer:
                '0x' +
                events[i].topics[1].substring(events[i].topics[1].length - 40),
              payer:
                '0x' +
                events[i].topics[2].substring(events[i].topics[2].length - 40)
            }
            _a.label = 3
          case 3:
            _a.trys.push([3, 5, , 6])
            params = this.web3.eth.abi.decodeParameters(
              ['uint256', 'uint256', 'uint256', 'uint256'],
              events[i].data
            )
            order.serviceId = parseInt(params[1])
            order.timestamp = parseInt(params[2])
            order.amount = this.web3.utils.fromWei(params[0])
            order.did = (0, utils_1.didPrefixed)(
              (0, utils_1.didNoZeroX)(order.dtAddress)
            )
            return [
              4 /*yield*/,
              this.getServiceByIndex(order.did, order.serviceId)
            ]
          case 4:
            service = _a.sent()
            order.serviceType = service.type
            if (!serviceType || (serviceType && serviceType === service.type))
              results.push(order)
            return [3 /*break*/, 6]
          case 5:
            e_2 = _a.sent()
            console.error(e_2)
            return [3 /*break*/, 6]
          case 6:
            i++
            return [3 /*break*/, 2]
          case 7:
            return [2 /*return*/, results]
        }
      })
    })
  }
  /**
   *
   * @param {DDO} ddo
   * @param {consumer} string
   * @return {Promise<Consumable>}
   */
  Assets.prototype.isConsumable = function (
    ddo,
    consumer,
    credentialsType,
    authService
  ) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var allowedConsume,
        orderDisabled,
        denyConsume,
        metadata,
        config,
        eventAccessControl,
        isPermit
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!ddo) throw new Error('ERROR: DDO does not exist')
            allowedConsume = { status: 0, message: 'All good', result: true }
            orderDisabled = {
              status: 1,
              message:
                'Ordering this asset has been temporarily disabled by the publisher.',
              result: false
            }
            denyConsume = {
              status: 2,
              message: 'Consume access is denied.',
              result: false
            }
            metadata = ddo.findServiceByType('metadata')
            if (
              (_a = metadata.attributes.status) === null || _a === void 0
                ? void 0
                : _a.isOrderDisabled
            )
              return [2 /*return*/, orderDisabled]
            config = this.instanceConfig
            if (
              !(
                consumer &&
                ((_b =
                  config === null || config === void 0
                    ? void 0
                    : config.config) === null || _b === void 0
                  ? void 0
                  : _b.rbacUri)
              )
            )
              return [3 /*break*/, 3]
            return [
              4 /*yield*/,
              EventAccessControl_1.EventAccessControl.getInstance(
                this.instanceConfig
              )
            ]
          case 1:
            eventAccessControl = _c.sent()
            return [
              4 /*yield*/,
              eventAccessControl.isPermit(
                'market',
                'consume',
                authService,
                consumer,
                credentialsType,
                ddo.id
              )
            ]
          case 2:
            isPermit = _c.sent()
            if (!isPermit) return [2 /*return*/, denyConsume]
            _c.label = 3
          case 3:
            return [2 /*return*/, allowedConsume]
        }
      })
    })
  }
  /**
   * Validate custom user parameters (user & algorithms)
   * @param {ServiceCustomParameter[]} serviceCustomParameters
   * @param {UserCustomParameters} userCustomParameters
   * @return {Promise<Boolean>}
   */
  Assets.prototype.isUserCustomParametersValid = function (
    serviceCustomParameters,
    userCustomParameters
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var _i, serviceCustomParameters_1, data, keyname
      return __generator(this, function (_a) {
        if (serviceCustomParameters)
          for (
            _i = 0, serviceCustomParameters_1 = serviceCustomParameters;
            _i < serviceCustomParameters_1.length;
            _i++
          ) {
            data = serviceCustomParameters_1[_i]
            keyname = data.name
            if (
              data.required &&
              (!userCustomParameters || !userCustomParameters[keyname])
            ) {
              this.logger.error('Missing key: ' + keyname + ' from customData')
              return [2 /*return*/, false]
            }
          }
        return [2 /*return*/, true]
      })
    })
  }
  return Assets
})(Instantiable_abstract_1.Instantiable)
exports.Assets = Assets
//# sourceMappingURL=Assets.js.map
