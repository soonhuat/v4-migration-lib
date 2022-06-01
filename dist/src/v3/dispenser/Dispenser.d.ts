import { TransactionReceipt } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils/types'
import Web3 from 'web3'
import { SubscribablePromise, Logger } from '../utils'
import { DataTokens } from '../datatokens/Datatokens'
import { ConfigHelperConfig } from '../utils/ConfigHelper'
export interface DispenserToken {
  active: boolean
  owner: string
  minterApproved: boolean
  isTrueMinter: boolean
  maxTokens: string
  maxBalance: string
  balance: string
}
export declare enum DispenserMakeMinterProgressStep {
  MakeDispenserMinter = 0,
  AcceptingNewMinter = 1
}
export declare enum DispenserCancelMinterProgressStep {
  MakeOwnerMinter = 0,
  AcceptingNewMinter = 1
}
export declare class OceanDispenser {
  GASLIMIT_DEFAULT: number
  /** Ocean related functions */
  dispenserAddress: string
  dispenserABI: AbiItem | AbiItem[]
  web3: Web3
  contract: Contract
  private logger
  datatokens: DataTokens
  startBlock: number
  private config
  /**
   * Instantiate Dispenser
   * @param {any} web3
   * @param {String} dispenserAddress
   * @param {any} dispenserABI
   */
  constructor(
    web3: Web3,
    logger: Logger,
    dispenserAddress: string,
    dispenserABI: AbiItem | AbiItem[],
    datatokens: DataTokens,
    config?: ConfigHelperConfig
  )
  /**
   * Get dispenser status for a datatoken
   * @param {String} dataTokenAddress
   * @return {Promise<FixedPricedExchange>} Exchange details
   */
  status(dataTokenAddress: string): Promise<DispenserToken>
  /**
   * Activates a new dispener.
   * @param {String} dataToken
   * @param {Number} maxTokens max amount of tokens to dispense
   * @param {Number} maxBalance max balance of user. If user balance is >, then dispense will be rejected
   * @param {String} address User address (must be owner of the dataToken)
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  activate(
    dataToken: string,
    maxTokens: string,
    maxBalance: string,
    address: string
  ): Promise<TransactionReceipt>
  /**
   * Deactivates a dispener.
   * @param {String} dataToken
   * @param {String} address User address (must be owner of the dispenser)
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  deactivate(dataToken: string, address: string): Promise<TransactionReceipt>
  /**
   * Make the dispenser minter of the datatoken
   * @param {String} dataToken
   * @param {String} address User address (must be owner of the datatoken)
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  makeMinter(
    dataToken: string,
    address: string
  ): SubscribablePromise<DispenserMakeMinterProgressStep, TransactionReceipt>
  /**
   * Cancel minter role of dispenser and make the owner minter of the datatoken
   * @param {String} dataToken
   * @param {String} address User address (must be owner of the dispenser)
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  cancelMinter(
    dataToken: string,
    address: string
  ): SubscribablePromise<DispenserCancelMinterProgressStep, TransactionReceipt>
  /**
   * Request tokens from dispenser
   * @param {String} dataToken
   * @param {String} amount
   * @param {String} address User address
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  dispense(
    dataToken: string,
    address: string,
    amount?: string
  ): Promise<TransactionReceipt>
  /**
   * Withdraw all tokens from the dispenser (if any)
   * @param {String} dataToken
   * @param {String} address User address (must be owner of the dispenser)
   * @return {Promise<TransactionReceipt>} TransactionReceipt
   */
  ownerWithdraw(dataToken: string, address: string): Promise<TransactionReceipt>
  /**
   * Check if tokens can be dispensed
   * @param {String} dataToken
   * @param {String} address User address that will receive datatokens
   * @return {Promise<Boolean>}
   */
  isDispensable(
    dataToken: string,
    address: string,
    amount?: string
  ): Promise<Boolean>
}
