import { Service } from './Service'
import { Metadata } from './Metadata'
import { Credentials } from './Credentials'
import { Event } from './Event'
export interface DDO {
  '@context': string[]
  id: string
  version: string
  nftAddress: string
  chainId: number
  metadata: Metadata
  services: Service[]
  credentials?: Credentials
  event?: Event
}
