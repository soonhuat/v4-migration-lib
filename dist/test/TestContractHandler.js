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
exports.TestContractHandler = void 0
var MockERC20_json_1 = __importDefault(
  require('./../src/artifacts/MockERC20.json')
)
var V3BFactory_json_1 = __importDefault(
  require('./../src/artifacts/V3BFactory.json')
)
var DTFactory_json_1 = __importDefault(
  require('./../src/artifacts/DTFactory.json')
)
var V3BPool_json_1 = __importDefault(require('./../src/artifacts/V3BPool.json'))
var DataTokenTemplate_json_1 = __importDefault(
  require('./../src/artifacts/DataTokenTemplate.json')
)
var TestContractHandler = (function () {
  function TestContractHandler(
    web3,
    ERC721TemplateABI,
    ERC20TemplateABI,
    PoolTemplateABI,
    ERC721FactoryABI,
    RouterABI,
    SideStakingABI,
    FixedRateABI,
    DispenserABI,
    OPFABI,
    template721Bytecode,
    template20Bytecode,
    poolTemplateBytecode,
    factory721Bytecode,
    routerBytecode,
    sideStakingBytecode,
    fixedRateBytecode,
    dispenserBytecode,
    opfBytecode
  ) {
    this.web3 = web3
    this.ERC721Template = new this.web3.eth.Contract(ERC721TemplateABI)
    this.ERC20Template = new this.web3.eth.Contract(ERC20TemplateABI)
    this.PoolTemplate = new this.web3.eth.Contract(PoolTemplateABI)
    this.ERC721Factory = new this.web3.eth.Contract(ERC721FactoryABI)
    this.Router = new this.web3.eth.Contract(RouterABI)
    this.SideStaking = new this.web3.eth.Contract(SideStakingABI)
    this.FixedRate = new this.web3.eth.Contract(FixedRateABI)
    this.Dispenser = new this.web3.eth.Contract(DispenserABI)
    this.MockERC20 = new this.web3.eth.Contract(MockERC20_json_1.default.abi)
    this.OPFCollector = new this.web3.eth.Contract(OPFABI)
    this.V3BFactory = new this.web3.eth.Contract(V3BFactory_json_1.default.abi)
    this.V3DTFactory = new this.web3.eth.Contract(DTFactory_json_1.default.abi)
    this.V3BPoolTemplate = new this.web3.eth.Contract(
      V3BPool_json_1.default.abi
    )
    this.V3DatatokenTemplate = new this.web3.eth.Contract(
      DataTokenTemplate_json_1.default.abi
    )
    this.ERC721FactoryBytecode = factory721Bytecode
    this.ERC20TemplateBytecode = template20Bytecode
    this.PoolTemplateBytecode = poolTemplateBytecode
    this.ERC721TemplateBytecode = template721Bytecode
    this.RouterBytecode = routerBytecode
    this.SideStakingBytecode = sideStakingBytecode
    this.FixedRateBytecode = fixedRateBytecode
    this.DispenserBytecode = dispenserBytecode
    this.MockERC20Bytecode = MockERC20_json_1.default.bytecode
    this.OPFBytecode = opfBytecode
    this.V3BFactoryBytecode = V3BFactory_json_1.default.bytecode
    this.V3DTFactoryBytecode = DTFactory_json_1.default.bytecode
    this.V3BPoolTemplateBytecode = V3BPool_json_1.default.bytecode
    this.V3DatatokenTemplateBytecode = DataTokenTemplate_json_1.default.bytecode
  }
  TestContractHandler.prototype.getAccounts = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a, error_1
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3])
            _a = this
            return [4, this.web3.eth.getAccounts()]
          case 1:
            _a.accounts = _b.sent()
            return [3, 3]
          case 2:
            error_1 = _b.sent()
            console.log('Get Accounts Error:', error_1)
            return [3, 3]
          case 3:
            return [2, this.accounts]
        }
      })
    })
  }
  TestContractHandler.prototype.deployContracts = function (
    owner,
    daemon,
    routerABI
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var estGas,
        name,
        symbol,
        cap,
        blob,
        _a,
        _b,
        _c,
        _d,
        _e,
        _f,
        _g,
        _h,
        _j,
        _k,
        _l,
        _m,
        _o,
        _p,
        _q,
        _r,
        RouterContract,
        V3DtFactory,
        V3PoolFactory,
        trxReceipt,
        e_1,
        V3Pool1,
        V3Pool2,
        OceanMock,
        Dt1Mock,
        Dt2Mock,
        MAX
      return __generator(this, function (_s) {
        switch (_s.label) {
          case 0:
            name = 'Template'
            symbol = 'TEMPL'
            cap = this.web3.utils.toWei('100000')
            blob = 'https://example.com/dataset-1'
            return [
              4,
              this.V3DatatokenTemplate.deploy({
                data: this.V3DatatokenTemplateBytecode,
                arguments: [name, symbol, owner, cap, blob, owner]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 1:
            estGas = _s.sent()
            _a = this
            return [
              4,
              this.V3DatatokenTemplate.deploy({
                data: this.V3DatatokenTemplateBytecode,
                arguments: [name, symbol, owner, cap, blob, owner]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 2:
            _a.v3DatatokenTemplateAddress = _s.sent()
            return [
              4,
              this.V3DTFactory.deploy({
                data: this.V3DTFactoryBytecode,
                arguments: [this.v3DatatokenTemplateAddress, owner]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 3:
            estGas = _s.sent()
            _b = this
            return [
              4,
              this.V3DTFactory.deploy({
                data: this.V3DTFactoryBytecode,
                arguments: [this.v3DatatokenTemplateAddress, owner]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 4:
            _b.v3DTFactoryAddress = _s.sent()
            return [
              4,
              this.V3BPoolTemplate.deploy({
                data: this.V3BPoolTemplateBytecode,
                arguments: []
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 5:
            estGas = _s.sent()
            _c = this
            return [
              4,
              this.V3BPoolTemplate.deploy({
                data: this.V3BPoolTemplateBytecode,
                arguments: []
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 6:
            _c.v3BPoolTemplateAddress = _s.sent()
            return [
              4,
              this.V3BFactory.deploy({
                data: this.V3BFactoryBytecode,
                arguments: [this.v3BPoolTemplateAddress]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 7:
            estGas = _s.sent()
            _d = this
            return [
              4,
              this.V3BFactory.deploy({
                data: this.V3BFactoryBytecode,
                arguments: [this.v3BPoolTemplateAddress]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 8:
            _d.v3BFactoryAddress = _s.sent()
            return [
              4,
              this.OPFCollector.deploy({
                data: this.OPFBytecode,
                arguments: [owner, owner]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 9:
            estGas = _s.sent()
            _e = this
            return [
              4,
              this.OPFCollector.deploy({
                data: this.OPFBytecode,
                arguments: [owner, owner]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 10:
            _e.opfCollectorAddress = _s.sent()
            return [
              4,
              this.PoolTemplate.deploy({
                data: this.PoolTemplateBytecode,
                arguments: []
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 11:
            estGas = _s.sent()
            _f = this
            return [
              4,
              this.PoolTemplate.deploy({
                data: this.PoolTemplateBytecode,
                arguments: []
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 12:
            _f.poolTemplateAddress = _s.sent()
            return [
              4,
              this.ERC20Template.deploy({
                data: this.ERC20TemplateBytecode,
                arguments: []
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 13:
            estGas = _s.sent()
            _g = this
            return [
              4,
              this.ERC20Template.deploy({
                data: this.ERC20TemplateBytecode,
                arguments: []
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 14:
            _g.template20Address = _s.sent()
            return [
              4,
              this.ERC721Template.deploy({
                data: this.ERC721TemplateBytecode,
                arguments: []
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 15:
            estGas = _s.sent()
            _h = this
            return [
              4,
              this.ERC721Template.deploy({
                data: this.ERC721TemplateBytecode,
                arguments: []
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 16:
            _h.template721Address = _s.sent()
            return [
              4,
              this.MockERC20.deploy({
                data: this.MockERC20Bytecode,
                arguments: ['OCEAN', 'OCEAN', 18]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 17:
            estGas = _s.sent()
            _j = this
            return [
              4,
              this.MockERC20.deploy({
                data: this.MockERC20Bytecode,
                arguments: ['OCEAN', 'OCEAN', 18]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 18:
            _j.oceanAddress = _s.sent()
            return [
              4,
              this.Router.deploy({
                data: this.RouterBytecode,
                arguments: [
                  owner,
                  this.oceanAddress,
                  this.poolTemplateAddress,
                  this.opfCollectorAddress,
                  []
                ]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 19:
            estGas = _s.sent()
            _k = this
            return [
              4,
              this.Router.deploy({
                data: this.RouterBytecode,
                arguments: [
                  owner,
                  this.oceanAddress,
                  this.poolTemplateAddress,
                  this.opfCollectorAddress,
                  []
                ]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 20:
            _k.routerAddress = _s.sent()
            return [
              4,
              this.SideStaking.deploy({
                data: this.SideStakingBytecode,
                arguments: [this.routerAddress]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 21:
            estGas = _s.sent()
            _l = this
            return [
              4,
              this.SideStaking.deploy({
                data: this.SideStakingBytecode,
                arguments: [this.routerAddress]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 22:
            _l.sideStakingAddress = _s.sent()
            return [
              4,
              this.FixedRate.deploy({
                data: this.FixedRateBytecode,
                arguments: [this.routerAddress, this.opfCollectorAddress]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 23:
            estGas = _s.sent()
            _m = this
            return [
              4,
              this.FixedRate.deploy({
                data: this.FixedRateBytecode,
                arguments: [this.routerAddress, this.opfCollectorAddress]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 24:
            _m.fixedRateAddress = _s.sent()
            return [
              4,
              this.Dispenser.deploy({
                data: this.DispenserBytecode,
                arguments: [this.routerAddress]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 25:
            estGas = _s.sent()
            _o = this
            return [
              4,
              this.Dispenser.deploy({
                data: this.DispenserBytecode,
                arguments: [this.routerAddress]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 26:
            _o.dispenserAddress = _s.sent()
            return [
              4,
              this.ERC721Factory.deploy({
                data: this.ERC721FactoryBytecode,
                arguments: [
                  this.template721Address,
                  this.template20Address,
                  this.opfCollectorAddress,
                  this.routerAddress
                ]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 27:
            estGas = _s.sent()
            _p = this
            return [
              4,
              this.ERC721Factory.deploy({
                data: this.ERC721FactoryBytecode,
                arguments: [
                  this.template721Address,
                  this.template20Address,
                  this.opfCollectorAddress,
                  this.routerAddress
                ]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 28:
            _p.factory721Address = _s.sent()
            return [
              4,
              this.MockERC20.deploy({
                data: this.MockERC20Bytecode,
                arguments: ['USDC', 'USDC', 6]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 29:
            estGas = _s.sent()
            _q = this
            return [
              4,
              this.MockERC20.deploy({
                data: this.MockERC20Bytecode,
                arguments: ['USDC', 'USDC', 6]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 30:
            _q.usdcAddress = _s.sent()
            return [
              4,
              this.MockERC20.deploy({
                data: this.MockERC20Bytecode,
                arguments: ['DAI', 'DAI', 18]
              }).estimateGas(function (err, estGas) {
                if (err) console.log('DeployContracts: ' + err)
                return estGas
              })
            ]
          case 31:
            estGas = _s.sent()
            _r = this
            return [
              4,
              this.MockERC20.deploy({
                data: this.MockERC20Bytecode,
                arguments: ['DAI', 'DAI', 18]
              })
                .send({
                  from: owner,
                  gas: estGas + 1,
                  gasPrice: '3000000000'
                })
                .then(function (contract) {
                  return contract.options.address
                })
            ]
          case 32:
            _r.daiAddress = _s.sent()
            RouterContract = new this.web3.eth.Contract(
              routerABI,
              this.routerAddress
            )
            V3DtFactory = new this.web3.eth.Contract(
              DTFactory_json_1.default.abi,
              this.v3DTFactoryAddress
            )
            V3PoolFactory = new this.web3.eth.Contract(
              V3BFactory_json_1.default.abi,
              this.v3BFactoryAddress
            )
            _s.label = 33
          case 33:
            _s.trys.push([33, 35, , 36])
            return [
              4,
              V3DtFactory.methods
                .createToken('https://dataset1.dao', 'Token1', 'Tk1', cap)
                .send({ from: owner })
            ]
          case 34:
            trxReceipt = _s.sent()
            return [3, 36]
          case 35:
            e_1 = _s.sent()
            console.log(e_1.message)
            return [3, 36]
          case 36:
            this.v3dt1Address =
              trxReceipt.events.TokenCreated.returnValues.newTokenAddress
            return [
              4,
              V3DtFactory.methods
                .createToken('https://dataset2.dao', 'Token2', 'Tk2', cap)
                .send({ from: owner })
            ]
          case 37:
            trxReceipt = _s.sent()
            this.v3dt2Address =
              trxReceipt.events.TokenCreated.returnValues.newTokenAddress
            return [4, V3PoolFactory.methods.newBPool().send({ from: owner })]
          case 38:
            trxReceipt = _s.sent()
            this.v3pool1Address =
              trxReceipt.events.BPoolCreated.returnValues.newBPoolAddress
            V3Pool1 = new this.web3.eth.Contract(
              V3BPool_json_1.default.abi,
              this.v3pool1Address
            )
            return [4, V3PoolFactory.methods.newBPool().send({ from: owner })]
          case 39:
            trxReceipt = _s.sent()
            this.v3pool2Address =
              trxReceipt.events.BPoolCreated.returnValues.newBPoolAddress
            V3Pool2 = new this.web3.eth.Contract(
              V3BPool_json_1.default.abi,
              this.v3pool2Address
            )
            OceanMock = new this.web3.eth.Contract(
              MockERC20_json_1.default.abi,
              this.oceanAddress
            )
            Dt1Mock = new this.web3.eth.Contract(
              DataTokenTemplate_json_1.default.abi,
              this.v3dt1Address
            )
            Dt2Mock = new this.web3.eth.Contract(
              DataTokenTemplate_json_1.default.abi,
              this.v3dt2Address
            )
            return [4, Dt1Mock.methods.mint(owner, cap).send({ from: owner })]
          case 40:
            _s.sent()
            return [4, Dt2Mock.methods.mint(owner, cap).send({ from: owner })]
          case 41:
            _s.sent()
            MAX = this.web3.utils.toTwosComplement(-1)
            return [
              4,
              OceanMock.methods
                .approve(this.v3pool1Address, MAX)
                .send({ from: owner })
            ]
          case 42:
            _s.sent()
            return [
              4,
              Dt1Mock.methods
                .approve(this.v3pool1Address, MAX)
                .send({ from: owner })
            ]
          case 43:
            _s.sent()
            return [
              4,
              OceanMock.methods
                .approve(this.v3pool2Address, MAX)
                .send({ from: owner })
            ]
          case 44:
            _s.sent()
            return [
              4,
              Dt2Mock.methods
                .approve(this.v3pool2Address, MAX)
                .send({ from: owner })
            ]
          case 45:
            _s.sent()
            return [
              4,
              V3Pool1.methods
                .setup(
                  this.v3dt1Address,
                  this.web3.utils.toWei('10000'),
                  this.web3.utils.toWei('25'),
                  this.oceanAddress,
                  this.web3.utils.toWei('10000'),
                  this.web3.utils.toWei('25'),
                  1e15
                )
                .send({ from: owner })
            ]
          case 46:
            _s.sent()
            return [
              4,
              V3Pool2.methods
                .setup(
                  this.v3dt2Address,
                  this.web3.utils.toWei('10000'),
                  this.web3.utils.toWei('25'),
                  this.oceanAddress,
                  this.web3.utils.toWei('20000'),
                  this.web3.utils.toWei('25'),
                  1e15
                )
                .send({ from: owner })
            ]
          case 47:
            _s.sent()
            return [
              4,
              V3Pool1.methods
                .transfer(this.accounts[1], this.web3.utils.toWei('30'))
                .send({ from: owner })
            ]
          case 48:
            _s.sent()
            return [
              4,
              V3Pool1.methods
                .transfer(this.accounts[2], this.web3.utils.toWei('20'))
                .send({ from: owner })
            ]
          case 49:
            _s.sent()
            return [
              4,
              RouterContract.methods
                .addFactory(this.factory721Address)
                .send({ from: owner })
            ]
          case 50:
            _s.sent()
            return [
              4,
              RouterContract.methods
                .addFixedRateContract(this.fixedRateAddress)
                .send({ from: owner })
            ]
          case 51:
            _s.sent()
            return [
              4,
              RouterContract.methods
                .addDispenserContract(this.dispenserAddress)
                .send({ from: owner })
            ]
          case 52:
            _s.sent()
            return [
              4,
              RouterContract.methods
                .addSSContract(this.sideStakingAddress)
                .send({ from: owner })
            ]
          case 53:
            _s.sent()
            return [2]
        }
      })
    })
  }
  return TestContractHandler
})()
exports.TestContractHandler = TestContractHandler
//# sourceMappingURL=TestContractHandler.js.map
