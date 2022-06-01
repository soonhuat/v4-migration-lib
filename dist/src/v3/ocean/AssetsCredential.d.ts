import { DDO } from '../ddo/DDO'
import { Credentials, CredentialAction } from '../ddo/interfaces/Credentials'
/**
 * checks if a credential list exists for a specific action
 * @param  {credentials} Credentials list of crentials from ddo
 * @param {credentialType} string e.g. address / credential3Box
 * @param {credentialAction} CredentialAction allow or deny
 * @return {boolean}
 */
export declare function checkCredentialExist(
  credentials: Credentials,
  credentialType: string,
  credentialAction: CredentialAction
): boolean
/**
 * Removes all credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
export declare function removeCredentialDetail(
  ddo: DDO,
  credentialType: string,
  credentialAction: CredentialAction
): DDO
/**
 * Updates credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {list} string[] list of values
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
export declare function updateCredentialDetail(
  ddo: DDO,
  credentialType: string,
  list: string[],
  credentialAction: CredentialAction
): DDO
/**
 * Adds values to credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {list} string[] list of values
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
export declare function addCredentialDetail(
  ddo: DDO,
  credentialType: string,
  list: string[],
  credentialAction: CredentialAction
): DDO
