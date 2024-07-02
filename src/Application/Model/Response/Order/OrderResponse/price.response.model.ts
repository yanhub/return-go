import { ApiProperty } from '@nestjs/swagger'
import { PriceModel } from '@domain/Model'

export class PriceResponseModel {
  @ApiProperty({ type: 'number', example: '100', description: 'price amount' })
  public amount: number

  @ApiProperty({ type: 'string', example: 'EUR' })
  public currency: string

  public static create(
    price: PriceModel,
  ): PriceResponseModel {
    const self = new PriceResponseModel()
    self.amount = price.amount
    self.currency = price.currency

    return self
  }
}
