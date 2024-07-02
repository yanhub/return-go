import { Injectable } from '@nestjs/common'
import { msleep } from 'sleep'

@Injectable()
export class RequestLimiterService {
  private limiter: Record<string, number[]> = {}

  public checkRateLimits(
    name: string,
    rateLimitAmountPerTimeWindow: number,
    rateLimitTimeWindowInMs: number,
  ): void {
    if (!(name in this.limiter)) {
      this.limiter[name] = []
    }

    if (this.limiter[name].length < rateLimitAmountPerTimeWindow) {
      this.limiter[name].push(Date.now())
      return
    }

    const awaitTime = rateLimitTimeWindowInMs - (Date.now() - this.limiter[name][0])
    if (awaitTime > 0) {
      msleep(awaitTime)

      return this.checkRateLimits(name, rateLimitAmountPerTimeWindow, rateLimitTimeWindowInMs)
    }

    this.limiter[name].shift()
    this.limiter[name].push(Date.now())
  }
}
