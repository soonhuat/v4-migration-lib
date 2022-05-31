import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils/types'
export declare class TestContractHandler {
  factory: Contract
  template: Contract
  accounts: string[]
  templateBytecode: string
  factoryBytecode: string
  factoryAddress: string
  templateAddress: string
  web3: Web3
  constructor(
    factoryABI: AbiItem | AbiItem[],
    datatokensABI: AbiItem | AbiItem[],
    templateBytecode: string,
    factoryBytecode: string,
    web3: Web3
  )
  getAccounts(): Promise<string[]>
  deployContracts(minter: string): Promise<void>
}
