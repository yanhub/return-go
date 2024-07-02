import { PlatformEnum } from '@domain/Enum'
import { Error } from 'mongoose'
import { Inject, Injectable } from '@nestjs/common'
import { DataProviderInterface } from '@application/Interface/Service'
import { ShopifyDataProvider } from '@application/Service/DataProvider'

@Injectable()
export class DataProviderResolver {
  constructor(
    @Inject()
    private shopifyDataProvider: ShopifyDataProvider
  ) {
  }

  public getDataProvider(platform: PlatformEnum): DataProviderInterface {
    switch (platform) {
      case PlatformEnum.SHOPIFY:
        return this.shopifyDataProvider
      default:
        throw new Error('Not supported platform')
    }
  }
}
