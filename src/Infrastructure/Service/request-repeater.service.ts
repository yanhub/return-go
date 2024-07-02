import { AxiosError, HttpStatusCode } from 'axios'
import { sleep } from 'sleep'
import { Injectable } from '@nestjs/common'

const ALLOWED_RETRIES = 5
const INTERNAL_SERVER_ERROR_TIMEOUT = 120
const ERROR_TIMEOUTS = [10, 60, 300, 600, 1800]

@Injectable()
export class RequestRepeaterService {
  private retries: Record<string, number> = {}

  public async callAction<T>(
    name: string,
    func: () => Promise<T | null>,
    isRetry = false
  ): Promise<T | null> {
    if (!(name in this.retries)) {
      this.retries[name] = 0
    }

    if (!isRetry) {
      this.retries[name] = 0
    }

    try {
      return await func()
    } catch (e) {
      if (!(e instanceof AxiosError) || this.retries[name] >= ALLOWED_RETRIES) {
        throw e
      }

      console.log(`Error: ${e.message || ''} :: ${JSON.stringify(e.response?.data || '{}' )}`)

      if (e.code !== 'ECONNRESET' && e.response?.status === HttpStatusCode.NotFound) {
        return null
      }

      if (e.code === 'ECONNRESET'
        || e.response?.status === HttpStatusCode.TooManyRequests
        || e.response?.status === HttpStatusCode.GatewayTimeout
      ) {
        this.retries[name]++
        const timeout = this.retries[name] in ERROR_TIMEOUTS ? ERROR_TIMEOUTS[this.retries[name]] : 0
        console.log(`Sleep for: ${timeout}`)
        sleep(timeout)

        return await this.callAction(name, func, true)
      }

      if (e.response?.status === HttpStatusCode.InternalServerError) {
        this.retries[name] = ALLOWED_RETRIES
        console.log(`Sleep for: ${INTERNAL_SERVER_ERROR_TIMEOUT}`)
        sleep(INTERNAL_SERVER_ERROR_TIMEOUT)

        try {
          return await this.callAction(name, func, true)
        } catch (e) {
          return null
        }
      }

      throw e
    }
  }
}
