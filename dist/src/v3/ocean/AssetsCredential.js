'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.addCredentialDetail =
  exports.updateCredentialDetail =
  exports.removeCredentialDetail =
  exports.checkCredentialExist =
    void 0
/**
 * checks if a credential list exists for a specific action
 * @param  {credentials} Credentials list of crentials from ddo
 * @param {credentialType} string e.g. address / credential3Box
 * @param {credentialAction} CredentialAction allow or deny
 * @return {boolean}
 */
function checkCredentialExist(credentials, credentialType, credentialAction) {
  var isExist = false
  if (credentialAction === 'allow') {
    if (credentials && credentials.allow) {
      var allowList = credentials.allow.find(function (credential) {
        return credential.type === credentialType
      })
      isExist = allowList && allowList.values.length > 0
    }
    return isExist
  } else {
    if (credentials && credentials.deny) {
      var dennyList = credentials.deny.find(function (credential) {
        return credential.type === credentialType
      })
      isExist = dennyList && dennyList.values.length > 0
    }
    return isExist
  }
}
exports.checkCredentialExist = checkCredentialExist
/**
 * Removes all credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
function removeCredentialDetail(ddo, credentialType, credentialAction) {
  var exists = checkCredentialExist(
    ddo.credentials,
    credentialType,
    credentialAction
  )
  if (credentialAction === 'allow') {
    if (exists) {
      ddo.credentials.allow = ddo.credentials.allow.filter(function (
        credential
      ) {
        return credential.type !== credentialType
      })
    }
    if (ddo.credentials && !ddo.credentials.allow) {
      ddo.credentials = {
        deny: ddo.credentials && ddo.credentials.deny
      }
    }
  } else {
    if (exists) {
      ddo.credentials.deny = ddo.credentials.deny.filter(function (credential) {
        return credential.type !== credentialType
      })
    }
    if (ddo.credentials && !ddo.credentials.deny) {
      ddo.credentials = {
        allow: ddo.credentials && ddo.credentials.allow
      }
    }
  }
  return ddo
}
exports.removeCredentialDetail = removeCredentialDetail
/**
 * Updates credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {list} string[] list of values
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
function updateCredentialDetail(ddo, credentialType, list, credentialAction) {
  var exists = checkCredentialExist(
    ddo.credentials,
    credentialType,
    credentialAction
  )
  if (credentialAction === 'allow') {
    if (exists) {
      ddo.credentials.allow.find(function (credential) {
        if (credential.type === credentialType) {
          credential.values = list
        }
      })
    } else {
      ddo = addCredentialDetail(ddo, credentialType, list, credentialAction)
    }
  } else {
    if (exists) {
      ddo.credentials.deny.find(function (credential) {
        if (credential.type === credentialType) {
          credential.values = list
        }
      })
    } else {
      ddo = addCredentialDetail(ddo, credentialType, list, credentialAction)
    }
  }
  return ddo
}
exports.updateCredentialDetail = updateCredentialDetail
/**
 * Adds values to credentials of a certain type for a specific action
 * @param  {ddo} DDO
 * @param {credentialType} string e.g. address / credential3Box
 * @param {list} string[] list of values
 * @param {credentialAction} CredentialAction allow or deny
 * @return {DDO}
 */
function addCredentialDetail(ddo, credentialType, list, credentialAction) {
  var newCredentialDetail = {
    type: credentialType,
    values: list
  }
  if (credentialAction === 'allow') {
    if (ddo.credentials && ddo.credentials.allow) {
      ddo.credentials.allow.push(newCredentialDetail)
    } else {
      var newCredentials = {
        allow: [newCredentialDetail],
        deny: ddo.credentials && ddo.credentials.deny
      }
      ddo.credentials = newCredentials
    }
  } else {
    if (ddo.credentials && ddo.credentials.deny) {
      ddo.credentials.deny.push(newCredentialDetail)
    } else {
      var newCredential = {
        allow: ddo.credentials && ddo.credentials.allow,
        deny: [newCredentialDetail]
      }
      ddo.credentials = newCredential
    }
  }
  return ddo
}
exports.addCredentialDetail = addCredentialDetail
//# sourceMappingURL=AssetsCredential.js.map
