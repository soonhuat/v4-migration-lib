import { DDO } from './DDO/DDO'
export interface AssetNft {
  address: string
  name: string
  symbol: string
  owner: string
  state: 0 | 1 | 2 | 3 | 4
  created: string
  tokenURI: string
}
export interface Purgatory {
  state: boolean
  reason: string
}
export interface AssetDatatoken {
  address: string
  name: string
  symbol: string
  serviceId: string
}
export interface AssetLastEvent {
  tx: string
  block: number
  from: string
  contract: string
  datetime: string
}
export interface Asset extends DDO {
  nft: AssetNft
  datatokens: AssetDatatoken[]
  event: AssetLastEvent
  stats: {
    consume: number
  }
  purgatory: Purgatory
}
