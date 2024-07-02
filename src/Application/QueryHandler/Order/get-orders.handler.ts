import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetOrdersQuery } from '@application/Query'
import { OrderResponseModel } from '@application/Model/Response'
import { OrderModel } from '@domain/Model'
import { DataProviderResolver } from '@application/Service'
import {
  OrdersRepositoryInterface
} from '@application/Interface/Repository/Mongo'

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @Inject('IOrdersRepository')
    private readonly ordersRepository: OrdersRepositoryInterface,
    @Inject()
    private readonly dataProviderResolver: DataProviderResolver,
  ) {}

  async execute(query: GetOrdersQuery): Promise<OrderResponseModel[]> {
    const { platform } = query

    const orderModels: OrderModel[] = await this.dataProviderResolver
      .getDataProvider(platform)
      .getOrders()

    return await Promise.all(
      orderModels.map(async (order) => {
        order.platform = platform

        await this.ordersRepository.save(order)

        return OrderResponseModel.create(order)
      })
    )
  }
}
