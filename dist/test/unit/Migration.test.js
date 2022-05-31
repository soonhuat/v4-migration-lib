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
var chai_1 = require('chai')
var TestContractHandler_1 = require('../TestContractHandler')
var web3_1 = __importDefault(require('web3'))
var Migration_1 = require('../../src/migration/Migration')
var Dispenser_json_1 = __importDefault(
  require('../../src/artifacts/Dispenser.json')
)
var ERC721Factory_json_1 = __importDefault(
  require('../../src/artifacts/ERC721Factory.json')
)
var ERC721Template_json_1 = __importDefault(
  require('../../src/artifacts/ERC721Template.json')
)
var SideStaking_json_1 = __importDefault(
  require('../../src/artifacts/SideStaking.json')
)
var FactoryRouter_json_1 = __importDefault(
  require('../../src/artifacts/FactoryRouter.json')
)
var ERC20Template_json_1 = __importDefault(
  require('../../src/artifacts/ERC20Template.json')
)
var FixedRateExchange_json_1 = __importDefault(
  require('../../src/artifacts/FixedRateExchange.json')
)
var OPFCommunityFeeCollector_json_1 = __importDefault(
  require('../../src/artifacts/OPFCommunityFeeCollector.json')
)
var BPool_json_1 = __importDefault(require('../../src/artifacts/BPool.json'))
var Constants_1 = require('../../src/utils/Constants')
var web3 = new web3_1.default('http://127.0.0.1:8545')
var providerUrl = 'https://v4.provider.rinkeby.oceanprotocol.com/'
var metadataCacheUri = 'https://aquarius.oceanprotocol.com'
var marketURL = 'https://market.oceanprotocol.com'
var did = 'did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38'
var nftName = 'OCEAN NFT'
var nftSymbol = 'OCEAN-NFT'
var cap = 10000
var marketFee = 1e15
var rate = web3.utils.toWei('1')
var publishingMarketFeeAddress = '0x9984b2453eC7D99a73A5B3a46Da81f197B753C8d'
var publishingMarketTokenAddress = '0x967da4048cD07aB37855c090aAF366e4ce1b9F48'
var baseTokenAddress = '0x967da4048cD07aB37855c090aAF366e4ce1b9F48'
var flags = '0x02'
var templateIndex = 1
var dtName = 'Test Datatoken'
var dtSymbol = 'TEST-DT'
var network = 'v4-testing'
var description = 'Example description with lots of detail...'
describe('Migration test', function () {
  var v3DtOwner,
    user1,
    user2,
    daemon,
    v3dt1Address,
    v3dt2Address,
    v3pool1Address,
    v3pool2Address,
    migrationAddress,
    contracts,
    migration,
    oceanAddress,
    stakingAddress,
    factory721Address,
    fixedRateAddress,
    txReceipt,
    dispenserAddress
  it('should initiate Migration instance', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        migration = new Migration_1.Migration(web3)
        ;(0,
        chai_1.assert)(migration != undefined, 'Failed to initialize Migration class')
        return [2]
      })
    })
  })
  it('should deploy contracts', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_1, error_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            try {
              contracts = new TestContractHandler_1.TestContractHandler(
                web3,
                ERC721Template_json_1.default.abi,
                ERC20Template_json_1.default.abi,
                BPool_json_1.default.abi,
                ERC721Factory_json_1.default.abi,
                FactoryRouter_json_1.default.abi,
                SideStaking_json_1.default.abi,
                FixedRateExchange_json_1.default.abi,
                Dispenser_json_1.default.abi,
                OPFCommunityFeeCollector_json_1.default.abi,
                ERC721Template_json_1.default.bytecode,
                ERC20Template_json_1.default.bytecode,
                BPool_json_1.default.bytecode,
                ERC721Factory_json_1.default.bytecode,
                FactoryRouter_json_1.default.bytecode,
                SideStaking_json_1.default.bytecode,
                FixedRateExchange_json_1.default.bytecode,
                Dispenser_json_1.default.bytecode,
                OPFCommunityFeeCollector_json_1.default.bytecode
              )
            } catch (error) {
              console.log('contracts error', error)
            }
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [4, contracts.getAccounts()]
          case 2:
            _a.sent()
            v3DtOwner = contracts.accounts[0]
            user1 = contracts.accounts[1]
            user2 = contracts.accounts[2]
            daemon = contracts.accounts[9]
            return [3, 4]
          case 3:
            error_1 = _a.sent()
            console.log('Get Accounts error', error_1)
            return [3, 4]
          case 4:
            ;(0, chai_1.expect)(v3DtOwner != undefined)
            ;(0, chai_1.expect)(user1 != undefined)
            ;(0, chai_1.expect)(user2 != undefined)
            ;(0, chai_1.expect)(daemon != undefined)
            _a.label = 5
          case 5:
            _a.trys.push([5, 7, , 8])
            return [
              4,
              contracts.deployContracts(
                v3DtOwner,
                daemon,
                FactoryRouter_json_1.default.abi
              )
            ]
          case 6:
            _a.sent()
            v3dt1Address = contracts.v3dt1Address
            v3dt2Address = contracts.v3dt2Address
            v3pool1Address = contracts.v3pool1Address
            v3pool2Address = contracts.v3pool2Address
            migrationAddress = contracts.migrationAddress
            oceanAddress = contracts.oceanAddress
            stakingAddress = contracts.sideStakingAddress
            factory721Address = contracts.factory721Address
            fixedRateAddress = contracts.fixedRateAddress
            dispenserAddress = contracts.dispenserAddress
            return [3, 8]
          case 7:
            error_2 = _a.sent()
            console.log('Deploy Contracts error', error_2)
            return [3, 8]
          case 8:
            ;(0, chai_1.expect)(v3dt1Address != undefined)
            ;(0, chai_1.expect)(v3dt2Address != undefined)
            ;(0, chai_1.expect)(v3pool1Address != undefined)
            ;(0, chai_1.expect)(v3pool2Address != undefined)
            ;(0, chai_1.expect)(migrationAddress != undefined)
            ;(0, chai_1.expect)(oceanAddress != undefined)
            ;(0, chai_1.expect)(stakingAddress != undefined)
            ;(0, chai_1.expect)(factory721Address != undefined)
            ;(0, chai_1.expect)(fixedRateAddress != undefined)
            ;(0, chai_1.expect)(dispenserAddress != dispenserAddress)
            return [2]
        }
      })
    })
  })
  it('should publish Fixed Rate Asset', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [
              4,
              migration.publishFixedRateAsset(
                did,
                description,
                factory721Address,
                nftName,
                nftSymbol,
                v3DtOwner,
                cap,
                rate,
                marketFee,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                fixedRateAddress,
                baseTokenAddress,
                templateIndex,
                dtName,
                dtSymbol
              )
            ]
          case 1:
            txReceipt = _a.sent()
            return [3, 3]
          case 2:
            e_1 = _a.sent()
            console.log('Error', e_1)
            return [3, 3]
          case 3:
            ;(0, chai_1.expect)(txReceipt.events.NFTCreated != null)
            ;(0, chai_1.expect)(txReceipt.events.TokenCreated != null)
            ;(0, chai_1.expect)(txReceipt.events.NewFixedRate != null)
            return [2]
        }
      })
    })
  })
  it('should migrate the fixed priced Asset', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var response, account, e_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3])
            return [
              4,
              migration.migrateFixedRateAsset(
                did,
                factory721Address,
                nftName,
                nftSymbol,
                v3DtOwner,
                account,
                cap,
                rate,
                flags,
                marketFee,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                fixedRateAddress,
                baseTokenAddress,
                1,
                '0x123',
                providerUrl,
                metadataCacheUri,
                templateIndex,
                dtName,
                dtSymbol,
                network
              )
            ]
          case 1:
            response = _a.sent()
            return [3, 3]
          case 2:
            e_2 = _a.sent()
            console.log('Error', e_2)
            return [3, 3]
          case 3:
            ;(0, chai_1.expect)(response.txReceipt.events.NFTCreated != null)
            ;(0, chai_1.expect)(response.txReceipt.events.TokenCreated != null)
            ;(0, chai_1.expect)(response.txReceipt.events.NewFixedRate != null)
            ;(0,
            chai_1.expect)(response.txReceipt2.events.MetadataCreated != null)
            return [2]
        }
      })
    })
  })
  it('should migrate the free Asset', function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var response, account, dispenserData, e_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            dispenserData = {
              dispenserAddress: dispenserAddress,
              maxTokens: web3.utils.toWei('1'),
              maxBalance: web3.utils.toWei('1'),
              withMint: true,
              allowedSwapper: Constants_1.ZERO_ADDRESS
            }
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            return [
              4,
              migration.migrateFreeAsset(
                did,
                factory721Address,
                nftName,
                nftSymbol,
                v3DtOwner,
                account,
                cap,
                flags,
                publishingMarketFeeAddress,
                publishingMarketTokenAddress,
                1,
                '0x123',
                providerUrl,
                metadataCacheUri,
                templateIndex,
                dtName,
                dtSymbol,
                network,
                dispenserData
              )
            ]
          case 2:
            response = _a.sent()
            return [3, 4]
          case 3:
            e_3 = _a.sent()
            console.log('Error', e_3)
            return [3, 4]
          case 4:
            ;(0, chai_1.expect)(response.txReceipt.events.NFTCreated != null)
            ;(0, chai_1.expect)(response.txReceipt.events.TokenCreated != null)
            ;(0, chai_1.expect)(response.txReceipt.events.NewFixedRate != null)
            ;(0,
            chai_1.expect)(response.txReceipt2.events.MetadataCreated != null)
            return [2]
        }
      })
    })
  })
})
//# sourceMappingURL=Migration.test.js.map
