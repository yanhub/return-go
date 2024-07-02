import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetOrderQuery } from '@application/Query'
import { OrderResponseModel } from '@application/Model/Response'
import {
  OrdersRepositoryInterface
} from '@application/Interface/Repository/Mongo'
import { OrderModel } from '@domain/Model'
import { DataProviderResolver } from '@application/Service'

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  constructor(
    @Inject('IOrdersRepository')
    private readonly ordersRepository: OrdersRepositoryInterface,
    @Inject()
    private readonly dataProviderResolver: DataProviderResolver,
  ) {}

  async execute(query: GetOrderQuery): Promise<OrderResponseModel> {
    const { platform, orderId } = query

    let order: OrderModel | null
      = await this.ordersRepository.findByPlatformAndId(
        platform,
        orderId
      )

    if (!order) {
      order = await this.dataProviderResolver
        .getDataProvider(platform)
        .getOrderById(orderId)

      order.platform = platform

      await this.ordersRepository.save(order)
    }

    return OrderResponseModel.create(order)
  }
}
