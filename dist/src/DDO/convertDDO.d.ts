import { DDO as v3DDO } from '../v3'
import { DDO as v4DDO } from '../@types/DDO/DDO'
export declare function convertDDO(
  v4Did: string,
  v3DDO: v3DDO,
  nftAddress: string | '',
  erc20Address: string | '',
  encryptedFiles: any
): Promise<v4DDO>
export declare function getAndConvertDDO(
  v3Did: string,
  v4Did: string,
  nftAddress: string,
  erc20Address: string,
  metadataCacheUri: string,
  encryptedFiles: any
): Promise<v4DDO>
