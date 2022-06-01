import { Response } from 'node-fetch'
import fs from 'fs'
import { Logger } from '../../utils'
import save from 'save-file'
import timeoutSignal from '../../utils/Timeout'
import fetch from 'cross-fetch'

/**
 * Provides a common interface to web services.
 */
export class WebServiceConnector {
  public logger: Logger
  public requestTimeout = 5000
  constructor(logger: Logger, requestTimeout?: number) {
    this.logger = logger
    this.requestTimeout = requestTimeout || this.requestTimeout
  }

  public post(url: string, payload: BodyInit): Promise<Response> {
    const headers = {
      'Content-type': 'application/json'
    }
    return this.postWithHeaders(url, payload, headers)
  }

  public postWithOctet(url: string, payload: BodyInit): Promise<Response> {
    const headers = {
      'Content-type': 'application/octet-stream'
    }
    return this.postWithHeaders(url, payload, headers)
  }

  public postWithHeaders(
    url: string,
    payload: BodyInit,
    headers: any
  ): Promise<Response> {
    if (payload != null) {
      return this.fetch(url, {
        method: 'POST',
        body: payload,
        headers,
        signal: timeoutSignal(this.requestTimeout)
      })
    } else {
      return this.fetch(url, {
        method: 'POST',
        signal: timeoutSignal(this.requestTimeout)
      })
    }
  }

  public get(url: string): Promise<Response> {
    return this.fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      signal: timeoutSignal(this.requestTimeout)
    })
  }

  public put(url: string, payload: BodyInit): Promise<Response> {
    if (payload != null) {
      return this.fetch(url, {
        method: 'PUT',
        body: payload,
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    } else {
      return this.fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    }
  }

  public delete(url: string, payload?: BodyInit): Promise<Response> {
    if (payload != null) {
      return this.fetch(url, {
        method: 'DELETE',
        body: payload,
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    } else {
      return this.fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        signal: timeoutSignal(this.requestTimeout)
      })
    }
  }

  private async fetch(url: string, opts: RequestInit): Promise<Response> {
    const result = await fetch(url, opts)
    if (!result.ok) {
      this.logger.error(`Error requesting [${opts.method}] ${url}`)
      this.logger.error(`Response message: \n${await result.text()}`)
      throw result
    }
    return result
  }
}
