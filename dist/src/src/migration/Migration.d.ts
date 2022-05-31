import Web3 from 'web3'
import { TransactionReceipt } from 'web3-eth'
import { Account } from '../v3'
import { DDO as v4DDO } from '../@types'
export interface MetadataProof {
  validatorAddress?: string
  r?: string
  s?: string
  v?: number
}
export interface DispenserData {
  dispenserAddress: string
  maxTokens: string
  maxBalance: string
  withMint: boolean
  allowedSwapper: string
}
export declare class Migration {
  GASLIMIT_DEFAULT: number
  web3: Web3
  startBlock: number
  constructor(web3: Web3, startBlock?: number)
  generateDidv4(erc721Address: string): Promise<string>
  getHash(message: string): Promise<string>
  validateAssetAquariusV4(
    asset: v4DDO,
    v4MetadataCacheUri?: string
  ): Promise<{
    validation: MetadataProof
    response: any
  }>
  getAssetURL(
    account: Account,
    did: string,
    network: string | number,
    infuraProjectId?: string
  ): Promise<string>
  getEncryptedFiles(
    v4ProviderUrl: string,
    account: Account,
    did: string,
    network: string | number
  ): Promise<string>
  estGasPublishFixedRateAsset(
    did: string,
    description: string,
    ERC721FactoryAddress: string,
    nftName: string,
    nftSymbol: string,
    ownerAddress: string,
    cap: number,
    rate: string,
    marketFee: number,
    publishingMarketFeeAddress: string,
    publishingMarketTokenAddress: string,
    fixedRateExchangeAddress: string,
    baseTokenAddress: string,
    templateIndex: number,
    dtName: string,
    dtSymbol: string
  ): Promise<number>
  publishFixedRateAsset(
    did: string,
    description: string,
    ERC721FactoryAddress: string,
    nftName: string,
    nftSymbol: string,
    ownerAddress: string,
    cap: number,
    rate: string,
    marketFee: number,
    publishingMarketFeeAddress: string,
    publishingMarketTokenAddress: string,
    fixedRateExchangeAddress: string,
    baseTokenAddress: string,
    templateIndex: number,
    dtName: string,
    dtSymbol: string
  ): Promise<TransactionReceipt>
  estGaspublishFreeAsset(
    description: string,
    ERC721FactoryAddress: string,
    nftName: string,
    nftSymbol: string,
    ownerAddress: string,
    cap: number,
    publishingMarketFeeAddress: string,
    publishingMarketTokenAddress: string,
    templateIndex: number,
    dtName: string,
    dtSymbol: string,
    dispenserData: DispenserData
  ): Promise<number>
  publishFreeAsset(
    description: string,
    ERC721FactoryAddress: string,
    nftName: string,
    nftSymbol: string,
    ownerAddress: string,
    cap: number,
    publishingMarketFeeAddress: string,
    publishingMarketTokenAddress: string,
    templateIndex: number,
    dtName: string,
    dtSymbol: string,
    dispenserData: DispenserData
  ): Promise<TransactionReceipt>
  estGasUpdateMetadata(
    ownerAddress: string,
    txReceipt: TransactionReceipt,
    metaDataState: number,
    metaDataDecryptorUrl: string,
    metaDataDecryptorAddress: string,
    flags: string,
    data: string,
    dataHash: string,
    metadataProofs?: MetadataProof[]
  ): Promise<number>
  updateMetadata(
    ownerAddress: string,
    txReceipt: TransactionReceipt,
    metaDataState: number,
    metaDataDecryptorUrl: string,
    metaDataDecryptorAddress: string,
    flags: string,
    data: string,
    dataHash: string,
    metadataProofs?: MetadataProof[]
  ): Promise<TransactionReceipt>
  migrateFixedRateAsset(
    v3Did: string,
    ERC721FactoryAddress: string,
    nftName: string,
    nftSymbol: string,
    ownerAddress: string,
    ownerAccount: Account,
    cap: number,
    rate: string,
    flags: string,
    marketFee: number,
    publishingMarketFeeAddress: string,
    publishingMarketTokenAddress: string,
    fixedRateExchangeAddress: string,
    baseTokenAddress: string,
    metaDataState: number,
    metaDataDecryptorAddress: string,
    v4ProviderUrl: string,
    v3MetadataCacheUri: string,
    templateIndex: number,
    dtName: string,
    dtSymbol: string,
    network: string | number,
    v4MetadataCacheUri?: string,
    v4EncryptProviderUri?: string
  ): Promise<
    | Error
    | {
        txReceipt: TransactionReceipt
        txReceipt2: TransactionReceipt
      }
  >
  migrateFreeAsset(
    v3Did: string,
    ERC721FactoryAddress: string,
    nftName: string,
    nftSymbol: string,
    ownerAddress: string,
    ownerAccount: Account,
    cap: number,
    flags: string,
    publishingMarketFeeAddress: string,
    publishingMarketTokenAddress: string,
    metaDataState: number,
    metaDataDecryptorAddress: string,
    v4ProviderUrl: string,
    v3MetadataCacheUri: string,
    templateIndex: number,
    dtName: string,
    dtSymbol: string,
    network: string | number,
    dispenserData: DispenserData,
    v4MetadataCacheUri?: string
  ): Promise<
    | Error
    | {
        txReceipt: TransactionReceipt
        txReceipt2: TransactionReceipt
      }
  >
}
