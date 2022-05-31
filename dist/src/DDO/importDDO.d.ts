import { DDO, DID } from '../v3'
export declare function getDDO(
  did: string | DID,
  metadataCacheUri: string
): Promise<DDO>
