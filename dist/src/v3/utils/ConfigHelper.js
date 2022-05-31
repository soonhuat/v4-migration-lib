'use strict'
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ConfigHelper = exports.configHelperNetworks = void 0
var fs_1 = __importDefault(require('fs'))
var os_1 = require('os')
var address_json_1 = __importDefault(
  require('@oceanprotocol/contracts/artifacts/address.json')
)
var Logger_1 = __importDefault(require('./Logger'))
var configHelperNetworksBase = {
  networkId: null,
  network: 'unknown',
  metadataCacheUri: 'https://aquarius.oceanprotocol.com',
  nodeUri: 'http://localhost:8545',
  providerUri: 'http://127.0.0.1:8030',
  subgraphUri: null,
  explorerUri: null,
  oceanTokenAddress: null,
  oceanTokenSymbol: 'OCEAN',
  factoryAddress: '0x1234',
  poolFactoryAddress: null,
  fixedRateExchangeAddress: null,
  dispenserAddress: null,
  metadataContractAddress: null,
  startBlock: 0,
  transactionBlockTimeout: 50,
  transactionConfirmationBlocks: 1,
  transactionPollingTimeout: 750,
  gasFeeMultiplier: 1
}
exports.configHelperNetworks = [
  __assign({}, configHelperNetworksBase),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 8996,
    network: 'development',
    metadataCacheUri: 'http://127.0.0.1:5000',
    rbacUri: 'http://127.0.0.1:3000'
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 3,
    network: 'ropsten',
    nodeUri: 'https://ropsten.infura.io/v3',
    providerUri: 'https://provider.ropsten.oceanprotocol.com',
    subgraphUri: 'https://subgraph.ropsten.oceanprotocol.com',
    explorerUri: 'https://ropsten.etherscan.io',
    startBlock: 9227563
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 4,
    network: 'rinkeby',
    nodeUri: 'https://rinkeby.infura.io/v3',
    providerUri: 'https://provider.rinkeby.oceanprotocol.com',
    subgraphUri: 'https://subgraph.rinkeby.oceanprotocol.com',
    explorerUri: 'https://rinkeby.etherscan.io',
    startBlock: 7294090
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 1,
    network: 'mainnet',
    nodeUri: 'https://mainnet.infura.io/v3',
    providerUri: 'https://provider.mainnet.oceanprotocol.com',
    subgraphUri: 'https://subgraph.mainnet.oceanprotocol.com',
    explorerUri: 'https://etherscan.io',
    startBlock: 11105459,
    transactionBlockTimeout: 150,
    transactionConfirmationBlocks: 5,
    transactionPollingTimeout: 1750,
    gasFeeMultiplier: 1.05
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 137,
    network: 'polygon',
    nodeUri: 'https://polygon-mainnet.infura.io/v3',
    providerUri: 'https://provider.polygon.oceanprotocol.com',
    subgraphUri: 'https://subgraph.polygon.oceanprotocol.com',
    explorerUri: 'https://polygonscan.com',
    oceanTokenSymbol: 'mOCEAN',
    startBlock: 11005222,
    gasFeeMultiplier: 1.05
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 1287,
    network: 'moonbeamalpha',
    nodeUri: 'https://rpc.testnet.moonbeam.network',
    providerUri: 'https://provider.moonbeamalpha.oceanprotocol.com',
    subgraphUri: 'https://subgraph.moonbeamalpha.oceanprotocol.com',
    explorerUri: 'https://moonbase-blockscout.testnet.moonbeam.network/',
    startBlock: 90707
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 2021000,
    network: 'gaiaxtestnet',
    nodeUri: 'https://rpc.gaiaxtestnet.oceanprotocol.com',
    providerUri: 'https://provider.gaiaxtestnet.oceanprotocol.com',
    subgraphUri: 'https://subgraph.gaiaxtestnet.oceanprotocol.com',
    explorerUri: 'https://blockscout.gaiaxtestnet.oceanprotocol.com'
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 2021001,
    network: 'catenaxtestnet',
    nodeUri: 'https://rpc.catenaxtestnet.oceanprotocol.com',
    providerUri: 'https://provider.catenaxtestnet.oceanprotocol.com',
    subgraphUri: 'https://subgraph.catenaxtestnet.oceanprotocol.com',
    explorerUri: 'https://blockscout.catenaxtestnet.oceanprotocol.com',
    metadataCacheUri: 'https://aquarius.catenaxtestnet.oceanprotocol.com'
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 80001,
    network: 'mumbai',
    nodeUri: 'https://polygon-mumbai.infura.io/v3',
    providerUri: 'https://provider.mumbai.oceanprotocol.com',
    subgraphUri: 'https://subgraph.mumbai.oceanprotocol.com',
    explorerUri: 'https://mumbai.polygonscan.com'
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 56,
    network: 'bsc',
    nodeUri: 'https://bsc-dataseed.binance.org',
    providerUri: 'https://provider.bsc.oceanprotocol.com',
    subgraphUri: 'https://subgraph.bsc.oceanprotocol.com',
    explorerUri: 'https://bscscan.com/',
    gasFeeMultiplier: 1.05
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 44787,
    network: 'celoalfajores',
    nodeUri: 'https://alfajores-forno.celo-testnet.org',
    providerUri: 'https://provider.celoalfajores.oceanprotocol.com',
    subgraphUri: 'https://subgraph.celoalfajores.oceanprotocol.com',
    explorerUri: 'https://alfajores-blockscout.celo-testnet.org'
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 246,
    network: 'energyweb',
    nodeUri: 'https://rpc.energyweb.org',
    providerUri: 'https://provider.energyweb.oceanprotocol.com',
    subgraphUri: 'https://subgraph.energyweb.oceanprotocol.com',
    explorerUri: 'https://explorer.energyweb.org',
    gasFeeMultiplier: 1.05
  }),
  __assign(__assign({}, configHelperNetworksBase), {
    networkId: 1285,
    network: 'moonriver',
    nodeUri: 'https://moonriver.api.onfinality.io/public',
    providerUri: 'https://provider.moonriver.oceanprotocol.com',
    subgraphUri: 'https://subgraph.moonriver.oceanprotocol.com',
    explorerUri: 'https://blockscout.moonriver.moonbeam.network',
    gasFeeMultiplier: 1.05
  })
]
var ConfigHelper = (function () {
  function ConfigHelper() {}
  ConfigHelper.prototype.getAddressesFromEnv = function (network) {
    var configAddresses
    if (address_json_1.default[network]) {
      var _a = address_json_1.default[network],
        DTFactory = _a.DTFactory,
        BFactory = _a.BFactory,
        FixedRateExchange = _a.FixedRateExchange,
        Dispenser = _a.Dispenser,
        Metadata = _a.Metadata,
        Ocean = _a.Ocean,
        chainId = _a.chainId,
        startBlock = _a.startBlock
      configAddresses = __assign(
        {
          factoryAddress: DTFactory,
          poolFactoryAddress: BFactory,
          fixedRateExchangeAddress: FixedRateExchange,
          dispenserAddress: Dispenser,
          metadataContractAddress: Metadata,
          oceanTokenAddress: Ocean,
          networkId: chainId,
          startBlock: startBlock
        },
        process.env.AQUARIUS_URI && {
          metadataCacheUri: process.env.AQUARIUS_URI
        }
      )
    }
    if (fs_1.default && process.env.ADDRESS_FILE) {
      try {
        var data = JSON.parse(
          fs_1.default.readFileSync(
            process.env.ADDRESS_FILE ||
              ''.concat(
                os_1.homedir,
                '/.ocean/ocean-contracts/artifacts/address.json'
              ),
            'utf8'
          )
        )
        var _b = data[network],
          DTFactory = _b.DTFactory,
          BFactory = _b.BFactory,
          FixedRateExchange = _b.FixedRateExchange,
          Dispenser = _b.Dispenser,
          Metadata = _b.Metadata,
          Ocean = _b.Ocean,
          chainId = _b.chainId,
          startBlock = _b.startBlock
        configAddresses = __assign(
          {
            factoryAddress: DTFactory,
            poolFactoryAddress: BFactory,
            fixedRateExchangeAddress: FixedRateExchange,
            dispenserAddress: Dispenser,
            metadataContractAddress: Metadata,
            oceanTokenAddress: Ocean,
            networkId: chainId,
            startBlock: startBlock
          },
          process.env.AQUARIUS_URI && {
            metadataCacheUri: process.env.AQUARIUS_URI
          }
        )
      } catch (e) {}
    }
    return configAddresses
  }
  ConfigHelper.prototype.getConfig = function (network, infuraProjectId) {
    var filterBy = typeof network === 'string' ? 'network' : 'networkId'
    var config = exports.configHelperNetworks.find(function (c) {
      return c[filterBy] === network
    })
    if (!config) {
      Logger_1.default.error(
        "No config found for given network '".concat(network, "'")
      )
      return null
    }
    var contractAddressesConfig = this.getAddressesFromEnv(config.network)
    config = __assign(__assign({}, config), contractAddressesConfig)
    var nodeUri = infuraProjectId
      ? ''.concat(config.nodeUri, '/').concat(infuraProjectId)
      : config.nodeUri
    return __assign(__assign({}, config), { nodeUri: nodeUri })
  }
  return ConfigHelper
})()
exports.ConfigHelper = ConfigHelper
//# sourceMappingURL=ConfigHelper.js.map
