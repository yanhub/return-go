import { ApiProperty } from '@nestjs/swagger'
import { OrderItemModel } from '@domain/Model'
import { PriceDetailsResponseModel } from './index'

export class OrderItemResponseModel {
  @ApiProperty({ type: 'string', example: '12300605751429' })
  public id: string

  @ApiProperty({ type: 'string', example: 'Dumbbells' })
  public name: string

  @ApiProperty({ type: 'string', example: '12' })
  public weight: string

  @ApiProperty({ type: 'string', example: 'KG' })
  public weightUnit: string

  // @ApiProperty({ type: PriceDetailsResponseModel })
  public priceDetails: PriceDetailsResponseModel

  @ApiProperty({ type: 'string', example: '6914492137605' })
  public productId: string

  @ApiProperty({ type: 'number', example: 1 })
  public quantity: number

  @ApiProperty({ type: 'string', example: '1231ffrfdgadsa434' })
  public sku: string

  @ApiProperty({ type: 'string', example: '40498848170117' })
  public variantId: string

  @ApiProperty({ type: PriceDetailsResponseModel })
  public tax: PriceDetailsResponseModel

  public static create(
    orderItem: OrderItemModel
  ): OrderItemResponseModel {
    const self = new OrderItemResponseModel()
    self.id = orderItem.id
    self.name = orderItem.name
    self.weight = orderItem.weight
    self.weightUnit = orderItem.weightUnit
    self.priceDetails = PriceDetailsResponseModel.create(orderItem.priceDetails)
    self.productId = orderItem.productId
    self.quantity = 1
    self.sku = orderItem.sku
    self.variantId = orderItem.variantId
    self.tax = PriceDetailsResponseModel.create(orderItem.tax)

    return self
  }
}
