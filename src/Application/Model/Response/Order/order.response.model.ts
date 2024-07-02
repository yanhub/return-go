import { ApiProperty } from '@nestjs/swagger'
import { OrderModel } from '@domain/Model'
import {
  OrderItemResponseModel,
  PriceDetailsResponseModel
} from './OrderResponse'

export class OrderResponseModel {
  @ApiProperty({ type: 'string', example: '4985632194693', description: 'id' })
  public id: string

  @ApiProperty({ type: 'string', example: '1011' })
  public name: string

  @ApiProperty({ type: PriceDetailsResponseModel })
  public priceDetails: PriceDetailsResponseModel

  @ApiProperty({ type: [OrderItemResponseModel] })
  public items: OrderItemResponseModel[]

  public static create(order: OrderModel): OrderResponseModel {
    const self = new OrderResponseModel()
    self.id = order.id
    self.name = order.name
    self.priceDetails = PriceDetailsResponseModel.create(order.priceDetails)
    self.items = []
    order.items.map(
    orderItem =>   new Array(orderItem.quantity)
      .fill('')
      .map(() => {
        self.items.push(OrderItemResponseModel.create(orderItem))
      })
    )

    return self
  }
}
