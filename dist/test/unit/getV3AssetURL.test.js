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
var DataTokenTemplate_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json')
)
var DTFactory_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/DTFactory.json')
)
var chai_1 = require('chai')
var web3_1 = __importDefault(require('web3'))
var Datatokens_1 = require('../../src/v3/datatokens/Datatokens')
var Ocean_1 = require('../../src/v3/ocean/Ocean')
var ConfigHelper_1 = require('../../src/v3/utils/ConfigHelper')
var V3TestContractHandler_1 = require('../V3TestContractHandler')
var utils_1 = require('../../src/v3/utils')
var Migration_1 = require('../../src/migration/Migration')
var convertDDO_1 = require('../../src/DDO/convertDDO')
var web3 = new web3_1.default('http://127.0.0.1:8545')
var url = 'https://people.sc.fsu.edu/~jburkardt/data/csv/homes.csv'
var v4ProviderUrl = 'https://v4.provider.ropsten.oceanprotocol.com'
var network = 'development'
var metadataCacheUri = 'https://aquarius.oceanprotocol.com'
var did1 = 'did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38'
var did2 = 'did:op:a2B8b3aC4207CFCCbDe4Ac7fa40214fd00A2BA71'
var did3 = 'did:op:F3D3CB5707b1fe2c8Ad9cD5bC7f01285334b4880'
var nftAddress = ''
var erc20Address = ''
var encryptedFiles =
  '0x04f91f187587d76605c40d0ab6f92d1e75ee1a4f97bdc60ed0368884082240c20d03e799e1f54e038f953ec508454631b0a4c24fcfd9d8fb9657d4d5f6945f2c4c91eeb9a40c5f6580a7c785c44420223fd2cac6ad7e34403e5047b394706075653d359b46480fdd365d286f37ea460b9b0c9d9d7787210fbe5a0bab66de96d3a237d599d6876f547bdf996445498cb6f70fea47c9ec811c4a9a34dfc498f628583e5221c119'
describe('V3 flow', function () {
  var owner,
    alice,
    ddo,
    did,
    asset,
    contracts,
    datatoken,
    tokenAddress,
    service1,
    price,
    ocean,
    data,
    blob,
    migration
  it('Initialize Ocean contracts v3', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var config
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            contracts = new V3TestContractHandler_1.TestContractHandler(
              DTFactory_json_1.default.abi,
              DataTokenTemplate_json_1.default.abi,
              DataTokenTemplate_json_1.default.bytecode,
              DTFactory_json_1.default.bytecode,
              web3
            )
            config = new ConfigHelper_1.ConfigHelper().getConfig('development')
            config.web3Provider = web3
            return [4, Ocean_1.Ocean.getInstance(config)]
          case 1:
            ocean = _a.sent()
            return [4, ocean.accounts.list()]
          case 2:
            owner = _a.sent()[0]
            return [4, ocean.accounts.list()]
          case 3:
            alice = _a.sent()[1]
            data = { t: 1, url: config.metadataCacheUri }
            blob = JSON.stringify(data)
            return [4, contracts.deployContracts(owner.getId())]
          case 4:
            _a.sent()
            migration = new Migration_1.Migration(web3)
            return [2]
        }
      })
    })
  })
  it('Alice publishes a datatoken contract', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            datatoken = new Datatokens_1.DataTokens(
              contracts.factoryAddress,
              DTFactory_json_1.default.abi,
              DataTokenTemplate_json_1.default.abi,
              web3,
              utils_1.LoggerInstance
            )
            return [
              4,
              datatoken.create(
                blob,
                alice.getId(),
                '10000000000',
                'AliceDT',
                'DTA'
              )
            ]
          case 1:
            tokenAddress = _a.sent()
            ;(0, chai_1.assert)(tokenAddress != null)
            return [2]
        }
      })
    })
  })
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
                encryptedFiles
              )
            ]
          case 1:
            ddo1 = _a.sent()
            ;(0,
            chai_1.assert)(ddo1.metadata.name === '🖼  DataUnion.app - Image & Annotation Vault  📸')
            ;(0, chai_1.assert)(ddo1.metadata.type === 'dataset')
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
                encryptedFiles
              )
            ]
          case 1:
            ddo2 = _a.sent()
            ;(0,
            chai_1.assert)(ddo2.metadata.name === 'Product Pages of 1’044’709 Products on Amazon.com (processed data)')
            ;(0, chai_1.assert)(ddo2.metadata.type === 'dataset')
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
                encryptedFiles
              )
            ]
          case 1:
            ddo3 = _a.sent()
            ;(0,
            chai_1.assert)(ddo3.metadata.name === "UK Traffic 2'177'207 Accidents and Vehicles from 2005 to 2017")
            ;(0, chai_1.assert)(ddo3.metadata.type === 'dataset')
            return [2]
        }
      })
    })
  })
  it('Generates metadata', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        asset = {
          main: {
            type: 'dataset',
            name: 'test-dataset',
            dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z',
            author: 'oceanprotocol-team',
            license: 'MIT',
            files: [
              {
                index: 0,
                url: url,
                checksum: 'efb2c764274b745f5fc37f97c6b0e761',
                contentLength: '4535431',
                contentType: 'text/csv',
                encoding: 'UTF-8',
                compression: 'zip'
              }
            ]
          }
        }
        return [2]
      })
    })
  })
  it('Should validate local metadata', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var valid
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, ocean.metadataCache.validateMetadata(asset)]
          case 1:
            valid = _a.sent()
            ;(0, chai_1.assert)(valid.valid, 'This metadata should be valid')
            return [2]
        }
      })
    })
  })
  it('Alice publishes all datasets', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var publishedDate, timeout, error_1, storeTx, error_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            price = '10'
            publishedDate =
              new Date(Date.now()).toISOString().split('.')[0] + 'Z'
            timeout = 0
            return [
              4,
              ocean.assets.createAccessServiceAttributes(
                alice,
                price,
                publishedDate,
                timeout
              )
            ]
          case 1:
            service1 = _a.sent()
            asset.main.datePublished = asset.main.dateCreated
            _a.label = 2
          case 2:
            _a.trys.push([2, 4, , 5])
            return [
              4,
              ocean.assets.create(asset, alice, [service1], tokenAddress)
            ]
          case 3:
            ddo = _a.sent()
            return [3, 5]
          case 4:
            error_1 = _a.sent()
            console.log('error', error_1)
            return [3, 5]
          case 5:
            ;(0, chai_1.assert)(ddo.dataToken === tokenAddress)
            did = ddo.id
            _a.label = 6
          case 6:
            _a.trys.push([6, 8, , 9])
            return [
              4,
              ocean.onChainMetadata.publish(ddo.id, ddo, alice.getId())
            ]
          case 7:
            storeTx = _a.sent()
            return [3, 9]
          case 8:
            error_2 = _a.sent()
            console.log('error', error_2)
            return [3, 9]
          case 9:
            ;(0, chai_1.assert)(storeTx)
            return [4, ocean.metadataCache.waitForAqua(ddo.id)]
          case 10:
            _a.sent()
            return [2]
        }
      })
    })
  })
  it('Alice tries to get the asset URL from the V3 provider', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var urlResponse, error_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [4, ocean.provider.getAssetURL(alice, did, 1)]
          case 1:
            urlResponse = _a.sent()
            ;(0,
            chai_1.assert)(urlResponse !== undefined, 'Failed to get asset url')
            ;(0,
            chai_1.assert)(urlResponse === url, 'Wrong or invalid url returned')
            return [3, 3]
          case 2:
            error_3 = _a.sent()
            ;(0,
            chai_1.assert)(error_3 === null, 'Order should not throw error')
            return [3, 3]
          case 3:
            return [2]
        }
      })
    })
  })
  it('Alice tries to get the asset URL using the migration', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var urlResponse, error_4
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [4, migration.getAssetURL(alice, did, network)]
          case 1:
            urlResponse = _a.sent()
            ;(0,
            chai_1.assert)(urlResponse !== undefined, 'Failed to get asset url')
            ;(0,
            chai_1.assert)(urlResponse === url, 'Wrong or invalid url returned')
            return [3, 3]
          case 2:
            error_4 = _a.sent()
            ;(0,
            chai_1.assert)(error_4 === null, 'Order should not throw error')
            return [3, 3]
          case 3:
            return [2]
        }
      })
    })
  })
  it('Alice tries to get the encrypted Files using the migration', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var encryptedFiles_1, error_5
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [
              4,
              migration.getEncryptedFiles(v4ProviderUrl, alice, did, network)
            ]
          case 1:
            encryptedFiles_1 = _a.sent()
            ;(0,
            chai_1.assert)(encryptedFiles_1 !== undefined, 'Failed to get asset url')
            return [3, 3]
          case 2:
            error_5 = _a.sent()
            ;(0,
            chai_1.assert)(error_5 === null, 'Order should not throw error')
            return [3, 3]
          case 3:
            return [2]
        }
      })
    })
  })
})
//# sourceMappingURL=getV3AssetURL.test.js.map
