import { Instantiable, InstantiableConfig } from '../Instantiable.abstract'
/**
 * Provides an interface for Event access control service.
 */
export declare class EventAccessControl extends Instantiable {
  private baseUrl
  /**
   * Returns the instance of Event access Control.
   * @return {Promise<EventAccessControl>}
   */
  static getInstance(config: InstantiableConfig): Promise<EventAccessControl>
  setBaseUrl(url: string): Promise<void>
  get url(): string
  private getIsPermitArgs
  isPermit(
    component: string,
    eventType: string,
    authService: string,
    credentials: string,
    credentialsType: string,
    did?: string
  ): Promise<boolean>
}
