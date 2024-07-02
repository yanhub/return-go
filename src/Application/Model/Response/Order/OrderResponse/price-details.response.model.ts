import { ApiProperty } from '@nestjs/swagger'
import { PriceDetailsModel } from '@domain/Model'
import { PriceResponseModel } from './index'

export class PriceDetailsResponseModel {
  @ApiProperty({ type: PriceResponseModel })
  public shopPrice: PriceResponseModel

  @ApiProperty({ type: PriceResponseModel })
  public presentmentPrice: PriceResponseModel

  public static create(
    priceDetails: PriceDetailsModel
  ): PriceDetailsResponseModel {
    const self = new PriceDetailsResponseModel()
    self.shopPrice = PriceResponseModel.create(
      priceDetails.shopPrice
    )
    self.presentmentPrice = PriceResponseModel.create(
      priceDetails.presentmentPrice
    )

    return self
  }
}
