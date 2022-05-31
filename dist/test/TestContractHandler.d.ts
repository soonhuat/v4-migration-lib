import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils/types'
export declare class TestContractHandler {
  accounts: string[]
  ERC721Factory: Contract
  ERC20Template: Contract
  ERC721Template: Contract
  Router: Contract
  SideStaking: Contract
  FixedRate: Contract
  Dispenser: Contract
  OPFCollector: Contract
  PoolTemplate: Contract
  MockERC20: Contract
  MockOcean: Contract
  Migration: Contract
  V3BFactory: Contract
  V3DTFactory: Contract
  V3BPoolTemplate: Contract
  V3DatatokenTemplate: Contract
  ERC721FactoryBytecode: string
  ERC20TemplateBytecode: string
  ERC721TemplateBytecode: string
  RouterBytecode: string
  SideStakingBytecode: string
  FixedRateBytecode: string
  DispenserBytecode: string
  PoolTemplateBytecode: string
  OPFCollectorBytecode: string
  MockERC20Bytecode: string
  OPFBytecode: string
  MigrationBytecode: string
  V3BFactoryBytecode: string
  V3DTFactoryBytecode: string
  V3BPoolTemplateBytecode: string
  V3DatatokenTemplateBytecode: string
  factory721Address: string
  template721Address: string
  template20Address: string
  routerAddress: string
  sideStakingAddress: string
  fixedRateAddress: string
  dispenserAddress: string
  poolTemplateAddress: string
  opfCollectorAddress: string
  oceanAddress: string
  daiAddress: string
  usdcAddress: string
  migrationAddress: string
  v3BFactoryAddress: string
  v3DTFactoryAddress: string
  v3BPoolTemplateAddress: string
  v3DatatokenTemplateAddress: string
  v3dt1Address: string
  v3dt2Address: string
  v3pool1Address: string
  v3pool2Address: string
  web3: Web3
  constructor(
    web3: Web3,
    ERC721TemplateABI: AbiItem | AbiItem[],
    ERC20TemplateABI: AbiItem | AbiItem[],
    PoolTemplateABI?: AbiItem | AbiItem[],
    ERC721FactoryABI?: AbiItem | AbiItem[],
    RouterABI?: AbiItem | AbiItem[],
    SideStakingABI?: AbiItem | AbiItem[],
    FixedRateABI?: AbiItem | AbiItem[],
    DispenserABI?: AbiItem | AbiItem[],
    OPFABI?: AbiItem | AbiItem[],
    template721Bytecode?: string,
    template20Bytecode?: string,
    poolTemplateBytecode?: string,
    factory721Bytecode?: string,
    routerBytecode?: string,
    sideStakingBytecode?: string,
    fixedRateBytecode?: string,
    dispenserBytecode?: string,
    opfBytecode?: string
  )
  getAccounts(): Promise<string[]>
  deployContracts(
    owner: string,
    daemon: string,
    routerABI?: AbiItem | AbiItem[]
  ): Promise<void>
}
