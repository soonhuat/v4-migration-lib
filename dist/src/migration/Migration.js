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
exports.Migration = void 0
var ERC721Factory_json_1 = __importDefault(
  require('../artifacts/ERC721Factory.json')
)
var ERC721Template_json_1 = __importDefault(
  require('../artifacts/ERC721Template.json')
)
var utils_1 = require('../utils')
var convertDDO_1 = require('../DDO/convertDDO')
var importDDO_1 = require('../DDO/importDDO')
var Provider_1 = __importDefault(require('../provider/Provider'))
var sha256_1 = __importDefault(require('crypto-js/sha256'))
var crypto_js_1 = require('crypto-js')
var Ocean_1 = require('../v3/ocean/Ocean')
var ConfigHelper_1 = require('../v3/utils/ConfigHelper')
var axios_1 = __importDefault(require('axios'))
var Migration = (function () {
  function Migration(web3, startBlock) {
    this.GASLIMIT_DEFAULT = 1000000
    this.web3 = web3
    this.startBlock = startBlock || 0
  }
  Migration.prototype.generateDidv4 = function (erc721Address) {
    return __awaiter(this, void 0, void 0, function () {
      var chainId, checksum
      return __generator(this, function (_a) {
        chainId = 1
        checksum = (0, crypto_js_1.SHA256)(erc721Address + chainId.toString(10))
        return [2, 'did:op:'.concat(checksum.toString())]
      })
    })
  }
  Migration.prototype.getHash = function (message) {
    return __awaiter(this, void 0, void 0, function () {
      var hex, i, hexMessage
      return __generator(this, function (_a) {
        hex = ''
        for (i = 0; i < message.length; i++) {
          hex += '' + message.charCodeAt(i).toString(16)
        }
        hexMessage = '0x' + hex
        return [2, hexMessage]
      })
    })
  }
  Migration.prototype.validateAssetAquariusV4 = function (
    asset,
    v4MetadataCacheUri
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var metadataCacheUri, data, response, _a, validatorAddress, r, s, v
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            metadataCacheUri =
              v4MetadataCacheUri || 'https://v4.aquarius.oceanprotocol.com'
            data = JSON.stringify(asset)
            return [
              4,
              axios_1.default.post(
                ''.concat(
                  metadataCacheUri,
                  '/api/aquarius/assets/ddo/validate'
                ),
                data,
                { headers: { 'Content-Type': 'application/octet-stream' } }
              )
            ]
          case 1:
            response = _b.sent()
            if (!response || response.status !== 200 || !response.data)
              return [2, { response: null, validation: {} }]
            ;(_a = response.data),
              (validatorAddress = _a.publicKey),
              (r = _a.r),
              (s = _a.s),
              (v = _a.v)
            return [
              2,
              {
                response: response.data,
                validation: {
                  validatorAddress: validatorAddress,
                  r: r[0],
                  s: s[0],
                  v: v
                }
              }
            ]
        }
      })
    })
  }
  Migration.prototype.getAssetURL = function (
    account,
    did,
    network,
    infuraProjectId
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var urlResponse, config, ocean, error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (network === 'v4-testing')
              return [2, 'http://oceanprotocol.com/test']
            _a.label = 1
          case 1:
            _a.trys.push([1, 4, , 5])
            config = new ConfigHelper_1.ConfigHelper().getConfig(
              network,
              infuraProjectId
            )
            config.web3Provider = this.web3
            return [4, Ocean_1.Ocean.getInstance(config)]
          case 2:
            ocean = _a.sent()
            return [4, ocean.provider.getAssetURL(account, did, 1)]
          case 3:
            urlResponse = _a.sent()
            return [3, 5]
          case 4:
            error_1 = _a.sent()
            console.log('error', error_1)
            return [3, 5]
          case 5:
            return [2, urlResponse]
        }
      })
    })
  }
  Migration.prototype.getEncryptedFiles = function (
    v4ProviderUrl,
    account,
    did,
    network
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var assetURL, file, response, error_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.getAssetURL(account, did, network)]
          case 1:
            assetURL = _a.sent()
            file = [
              {
                type: 'url',
                url: assetURL,
                method: 'GET'
              }
            ]
            _a.label = 2
          case 2:
            _a.trys.push([2, 4, , 5])
            return [4, Provider_1.default.encrypt(file, v4ProviderUrl)]
          case 3:
            response = _a.sent()
            return [2, response]
          case 4:
            error_2 = _a.sent()
            console.error('Error parsing json: ' + error_2.message)
            return [3, 5]
          case 5:
            return [2]
        }
      })
    })
  }
  Migration.prototype.estGasPublishFixedRateAsset = function (
    did,
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    rate,
    marketFee,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    fixedRateExchangeAddress,
    baseTokenAddress,
    templateIndex,
    dtName,
    dtSymbol
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var ERC721FactoryContract,
        gasLimitDefault,
        estGas,
        encodedMetadata,
        error_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ERC721FactoryContract = new this.web3.eth.Contract(
              ERC721Factory_json_1.default.abi,
              ERC721FactoryAddress
            )
            gasLimitDefault = this.GASLIMIT_DEFAULT
            encodedMetadata = Buffer.from(
              JSON.stringify({
                name: nftName,
                symbol: nftSymbol,
                description: description
              })
            ).toString('base64')
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              ERC721FactoryContract.methods
                .createNftWithErc20WithFixedRate(
                  {
                    name: nftName,
                    symbol: nftSymbol,
                    templateIndex: templateIndex,
                    tokenURI: 'data:application/json;base64,'.concat(
                      encodedMetadata
                    )
                  },
                  {
                    strings: [dtName, dtSymbol],
                    templateIndex: templateIndex,
                    addresses: [
                      ownerAddress,
                      ownerAddress,
                      publishingMarketFeeAddress,
                      publishingMarketTokenAddress
                    ],
                    uints: [cap, 0],
                    bytess: []
                  },
                  {
                    fixedPriceAddress: fixedRateExchangeAddress,
                    addresses: [
                      baseTokenAddress,
                      ownerAddress,
                      ownerAddress,
                      publishingMarketFeeAddress
                    ],
                    uints: [18, 18, rate, marketFee, 0]
                  }
                )
                .estimateGas({ from: ownerAddress }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _a.sent()
            return [3, 4]
          case 3:
            error_3 = _a.sent()
            console.log('error', error_3)
            return [3, 4]
          case 4:
            return [2, estGas]
        }
      })
    })
  }
  Migration.prototype.publishFixedRateAsset = function (
    did,
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    rate,
    marketFee,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    fixedRateExchangeAddress,
    baseTokenAddress,
    templateIndex,
    dtName,
    dtSymbol
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var ERC721FactoryContract, estGas, tx, encodedMetadata, _a, _b, error_4
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            ERC721FactoryContract = new this.web3.eth.Contract(
              ERC721Factory_json_1.default.abi,
              ERC721FactoryAddress
            )
            return [
              4,
              this.estGasPublishFixedRateAsset(
                did,
                description,
                ERC721FactoryAddress,
                nftName,
                nftSymbol,
                ownerAddress,
                cap,
                rate,
                marketFee,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                fixedRateExchangeAddress,
                baseTokenAddress,
                templateIndex,
                dtName,
                dtSymbol
              )
            ]
          case 1:
            estGas = _d.sent()
            encodedMetadata = Buffer.from(
              JSON.stringify({
                name: nftName,
                symbol: nftSymbol,
                description: description
              })
            ).toString('base64')
            _d.label = 2
          case 2:
            _d.trys.push([2, 5, , 6])
            _b = (_a =
              ERC721FactoryContract.methods.createNftWithErc20WithFixedRate(
                {
                  name: nftName,
                  symbol: nftSymbol,
                  templateIndex: templateIndex,
                  tokenURI: 'data:application/json;base64,'.concat(
                    encodedMetadata
                  )
                },
                {
                  strings: [dtName, dtSymbol],
                  templateIndex: templateIndex,
                  addresses: [
                    ownerAddress,
                    ownerAddress,
                    publishingMarketFeeAddress,
                    publishingMarketTokenAddress
                  ],
                  uints: [cap, 0],
                  bytess: []
                },
                {
                  fixedPriceAddress: fixedRateExchangeAddress,
                  addresses: [
                    baseTokenAddress,
                    ownerAddress,
                    ownerAddress,
                    publishingMarketFeeAddress
                  ],
                  uints: [18, 18, rate, marketFee, 0]
                }
              )).send
            _c = {
              from: ownerAddress,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3)]
          case 3:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 4:
            tx = _d.sent()
            return [3, 6]
          case 5:
            error_4 = _d.sent()
            console.log('error', error_4)
            return [3, 6]
          case 6:
            return [2, tx]
        }
      })
    })
  }
  Migration.prototype.estGaspublishFreeAsset = function (
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    templateIndex,
    dtName,
    dtSymbol,
    dispenserData
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var ERC721FactoryContract,
        encodedMetadata,
        gasLimitDefault,
        estGas,
        error_5
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ERC721FactoryContract = new this.web3.eth.Contract(
              ERC721Factory_json_1.default.abi,
              ERC721FactoryAddress
            )
            encodedMetadata = Buffer.from(
              JSON.stringify({
                name: nftName,
                symbol: nftSymbol,
                description: description
              })
            ).toString('base64')
            gasLimitDefault = this.GASLIMIT_DEFAULT
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              ERC721FactoryContract.methods
                .createNftWithErc20WithDispenser(
                  {
                    name: nftName,
                    symbol: nftSymbol,
                    templateIndex: templateIndex,
                    tokenURI: 'data:application/json;base64,'.concat(
                      encodedMetadata
                    )
                  },
                  {
                    strings: [dtName, dtSymbol],
                    templateIndex: templateIndex,
                    addresses: [
                      ownerAddress,
                      ownerAddress,
                      publishingMarketFeeAddress,
                      publishingMarketTokenAddress
                    ],
                    uints: [cap, 0],
                    bytess: []
                  },
                  dispenserData
                )
                .estimateGas({ from: ownerAddress }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _a.sent()
            return [3, 4]
          case 3:
            error_5 = _a.sent()
            console.log('error', error_5)
            return [3, 4]
          case 4:
            return [2, estGas]
        }
      })
    })
  }
  Migration.prototype.publishFreeAsset = function (
    description,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    cap,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    templateIndex,
    dtName,
    dtSymbol,
    dispenserData
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var ERC721FactoryContract, estGas, tx, encodedMetadata, _a, _b, error_6
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            ERC721FactoryContract = new this.web3.eth.Contract(
              ERC721Factory_json_1.default.abi,
              ERC721FactoryAddress
            )
            return [
              4,
              this.estGaspublishFreeAsset(
                description,
                ERC721FactoryAddress,
                nftName,
                nftSymbol,
                ownerAddress,
                cap,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                templateIndex,
                dtName,
                dtSymbol,
                dispenserData
              )
            ]
          case 1:
            estGas = _d.sent()
            encodedMetadata = Buffer.from(
              JSON.stringify({
                name: nftName,
                symbol: nftSymbol,
                description: description
              })
            ).toString('base64')
            _d.label = 2
          case 2:
            _d.trys.push([2, 5, , 6])
            _b = (_a =
              ERC721FactoryContract.methods.createNftWithErc20WithDispenser(
                {
                  name: nftName,
                  symbol: nftSymbol,
                  templateIndex: templateIndex,
                  tokenURI: 'data:application/json;base64,'.concat(
                    encodedMetadata
                  )
                },
                {
                  strings: [dtName, dtSymbol],
                  templateIndex: templateIndex,
                  addresses: [
                    ownerAddress,
                    ownerAddress,
                    publishingMarketFeeAddress,
                    publishingMarketTokenAddress
                  ],
                  uints: [cap, 0],
                  bytess: []
                },
                dispenserData
              )).send
            _c = {
              from: ownerAddress,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3)]
          case 3:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 4:
            tx = _d.sent()
            return [3, 6]
          case 5:
            error_6 = _d.sent()
            console.log('error', error_6)
            return [3, 6]
          case 6:
            return [2, tx]
        }
      })
    })
  }
  Migration.prototype.estGasUpdateMetadata = function (
    ownerAddress,
    txReceipt,
    metaDataState,
    metaDataDecryptorUrl,
    metaDataDecryptorAddress,
    flags,
    data,
    dataHash,
    metadataProofs
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var gasLimitDefault, estGas, event, tokenAddress, tokenERC721, error_7
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            gasLimitDefault = this.GASLIMIT_DEFAULT
            event = txReceipt.events.NFTCreated
            tokenAddress = event.returnValues.newTokenAddress
            if (!metadataProofs) metadataProofs = []
            tokenERC721 = new this.web3.eth.Contract(
              ERC721Template_json_1.default.abi,
              tokenAddress
            )
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              tokenERC721.methods
                .setMetaData(
                  metaDataState,
                  metaDataDecryptorUrl,
                  metaDataDecryptorAddress,
                  flags,
                  data,
                  dataHash,
                  metadataProofs
                )
                .estimateGas({ from: ownerAddress }, function (err, estGas) {
                  return err ? gasLimitDefault : estGas
                })
            ]
          case 2:
            estGas = _a.sent()
            return [3, 4]
          case 3:
            error_7 = _a.sent()
            console.log('error', error_7)
            return [3, 4]
          case 4:
            return [2, estGas]
        }
      })
    })
  }
  Migration.prototype.updateMetadata = function (
    ownerAddress,
    txReceipt,
    metaDataState,
    metaDataDecryptorUrl,
    metaDataDecryptorAddress,
    flags,
    data,
    dataHash,
    metadataProofs
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var event, tokenAddress, tokenERC721, estGas, tx, _a, _b, error_8
      var _c
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            event = txReceipt.events.NFTCreated
            tokenAddress = event.returnValues.newTokenAddress
            if (!metadataProofs) metadataProofs = []
            tokenERC721 = new this.web3.eth.Contract(
              ERC721Template_json_1.default.abi,
              tokenAddress
            )
            return [
              4,
              this.estGasUpdateMetadata(
                ownerAddress,
                txReceipt,
                metaDataState,
                metaDataDecryptorUrl,
                metaDataDecryptorAddress,
                flags,
                data,
                dataHash,
                metadataProofs
              )
            ]
          case 1:
            estGas = _d.sent()
            _d.label = 2
          case 2:
            _d.trys.push([2, 5, , 6])
            _b = (_a = tokenERC721.methods.setMetaData(
              metaDataState,
              metaDataDecryptorUrl,
              metaDataDecryptorAddress,
              flags,
              data,
              dataHash,
              metadataProofs
            )).send
            _c = {
              from: ownerAddress,
              gas: estGas + 1
            }
            return [4, (0, utils_1.getFairGasPrice)(this.web3)]
          case 3:
            return [4, _b.apply(_a, [((_c.gasPrice = _d.sent()), _c)])]
          case 4:
            tx = _d.sent()
            return [3, 6]
          case 5:
            error_8 = _d.sent()
            console.log('setMetaDataAndTokenURI ERROR', error_8)
            return [3, 6]
          case 6:
            return [2, tx]
        }
      })
    })
  }
  Migration.prototype.migrateFixedRateAsset = function (
    v3Did,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    ownerAccount,
    cap,
    rate,
    flags,
    marketFee,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    fixedRateExchangeAddress,
    baseTokenAddress,
    metaDataState,
    metaDataDecryptorAddress,
    v4ProviderUrl,
    v3MetadataCacheUri,
    templateIndex,
    dtName,
    dtSymbol,
    network,
    v4MetadataCacheUri,
    v4EncryptProviderUri
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var txReceipt,
        v3DDO,
        description,
        e_1,
        nftAddress,
        erc20Address,
        encryptedFiles,
        v4Did,
        ddo,
        v4Provider,
        encryptedDdo,
        dataHash,
        _a,
        validation,
        response,
        isValid,
        txReceipt2,
        e_2
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, (0, importDDO_1.getDDO)(v3Did, v3MetadataCacheUri)]
          case 1:
            v3DDO = _b.sent()
            description =
              v3DDO.service[0].attributes.additionalInformation.description
            _b.label = 2
          case 2:
            _b.trys.push([2, 4, , 5])
            return [
              4,
              this.publishFixedRateAsset(
                v3Did,
                description,
                ERC721FactoryAddress,
                nftName,
                nftSymbol,
                ownerAddress,
                cap,
                rate,
                marketFee,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                fixedRateExchangeAddress,
                baseTokenAddress,
                templateIndex,
                dtName,
                dtSymbol
              )
            ]
          case 3:
            txReceipt = _b.sent()
            return [3, 5]
          case 4:
            e_1 = _b.sent()
            console.log('publishFixedRateAsset Error', e_1)
            return [3, 5]
          case 5:
            nftAddress =
              txReceipt.events.NFTCreated.returnValues.newTokenAddress
            erc20Address =
              txReceipt.events.TokenCreated.returnValues.newTokenAddress
            return [
              4,
              this.getEncryptedFiles(
                v4ProviderUrl,
                ownerAccount,
                v3Did,
                network
              )
            ]
          case 6:
            encryptedFiles = _b.sent()
            return [4, this.generateDidv4(nftAddress)]
          case 7:
            v4Did = _b.sent()
            return [
              4,
              (0, convertDDO_1.getAndConvertDDO)(
                v3Did,
                v4Did,
                nftAddress,
                erc20Address,
                v3MetadataCacheUri,
                encryptedFiles
              )
            ]
          case 8:
            ddo = _b.sent()
            return [4, Provider_1.default]
          case 9:
            v4Provider = _b.sent()
            return [
              4,
              v4Provider.encrypt(ddo, v4EncryptProviderUri || v4ProviderUrl)
            ]
          case 10:
            encryptedDdo = _b.sent()
            dataHash =
              '0x' + (0, sha256_1.default)(JSON.stringify(ddo)).toString()
            return [4, this.validateAssetAquariusV4(ddo, v4MetadataCacheUri)]
          case 11:
            ;(_a = _b.sent()),
              (validation = _a.validation),
              (response = _a.response)
            isValid = response.hash === dataHash
            if (isValid === false) {
              console.log('Asset is not valid')
              return [2, new Error('Invalid DDO hash')]
            }
            _b.label = 12
          case 12:
            _b.trys.push([12, 14, , 15])
            return [
              4,
              this.updateMetadata(
                ownerAddress,
                txReceipt,
                metaDataState,
                v4EncryptProviderUri || v4ProviderUrl,
                metaDataDecryptorAddress,
                flags,
                encryptedDdo,
                dataHash,
                [validation]
              )
            ]
          case 13:
            txReceipt2 = _b.sent()
            return [3, 15]
          case 14:
            e_2 = _b.sent()
            console.log('Error', e_2)
            return [3, 15]
          case 15:
            return [2, { txReceipt: txReceipt, txReceipt2: txReceipt2 }]
        }
      })
    })
  }
  Migration.prototype.migrateFreeAsset = function (
    v3Did,
    ERC721FactoryAddress,
    nftName,
    nftSymbol,
    ownerAddress,
    ownerAccount,
    cap,
    flags,
    publishingMarketFeeAddress,
    publishingMarketTokenAddress,
    metaDataState,
    metaDataDecryptorAddress,
    v4ProviderUrl,
    v3MetadataCacheUri,
    templateIndex,
    dtName,
    dtSymbol,
    network,
    dispenserData,
    v4MetadataCacheUri
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var txReceipt,
        v3DDO,
        description,
        e_3,
        nftAddress,
        erc20Address,
        encryptedFiles,
        v4Did,
        ddo,
        v4Provider,
        encryptedDdo,
        dataHash,
        _a,
        validation,
        response,
        isValid,
        txReceipt2,
        e_4
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, (0, importDDO_1.getDDO)(v3Did, v3MetadataCacheUri)]
          case 1:
            v3DDO = _b.sent()
            description =
              v3DDO.service[0].attributes.additionalInformation.description
            _b.label = 2
          case 2:
            _b.trys.push([2, 4, , 5])
            return [
              4,
              this.publishFreeAsset(
                description,
                ERC721FactoryAddress,
                nftName,
                nftSymbol,
                ownerAddress,
                cap,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                templateIndex,
                dtName,
                dtSymbol,
                dispenserData
              )
            ]
          case 3:
            txReceipt = _b.sent()
            return [3, 5]
          case 4:
            e_3 = _b.sent()
            console.log('publishFixedRateAsset Error', e_3)
            return [3, 5]
          case 5:
            nftAddress =
              txReceipt.events.NFTCreated.returnValues.newTokenAddress
            erc20Address =
              txReceipt.events.TokenCreated.returnValues.newTokenAddress
            return [
              4,
              this.getEncryptedFiles(
                v4ProviderUrl,
                ownerAccount,
                v3Did,
                network
              )
            ]
          case 6:
            encryptedFiles = _b.sent()
            return [4, this.generateDidv4(nftAddress)]
          case 7:
            v4Did = _b.sent()
            return [
              4,
              (0, convertDDO_1.getAndConvertDDO)(
                v3Did,
                v4Did,
                nftAddress,
                erc20Address,
                v3MetadataCacheUri,
                encryptedFiles
              )
            ]
          case 8:
            ddo = _b.sent()
            return [4, Provider_1.default]
          case 9:
            v4Provider = _b.sent()
            return [4, v4Provider.encrypt(ddo, v4ProviderUrl)]
          case 10:
            encryptedDdo = _b.sent()
            dataHash =
              '0x' + (0, sha256_1.default)(JSON.stringify(ddo)).toString()
            return [4, this.validateAssetAquariusV4(ddo, v4MetadataCacheUri)]
          case 11:
            ;(_a = _b.sent()),
              (validation = _a.validation),
              (response = _a.response)
            isValid = response.hash === dataHash
            if (isValid === false) {
              console.log('Asset is not valid')
              return [2, new Error('Invalid DDO hash')]
            }
            _b.label = 12
          case 12:
            _b.trys.push([12, 14, , 15])
            return [
              4,
              this.updateMetadata(
                ownerAddress,
                txReceipt,
                metaDataState,
                v4ProviderUrl,
                metaDataDecryptorAddress,
                flags,
                encryptedDdo,
                dataHash,
                [validation]
              )
            ]
          case 13:
            txReceipt2 = _b.sent()
            return [3, 15]
          case 14:
            e_4 = _b.sent()
            console.log('Error', e_4)
            return [3, 15]
          case 15:
            return [2, { txReceipt: txReceipt, txReceipt2: txReceipt2 }]
        }
      })
    })
  }
  return Migration
})()
exports.Migration = Migration
//# sourceMappingURL=Migration.js.map
