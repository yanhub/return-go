import { PlatformEnum } from '@domain/Enum'
import { OrderModel } from '@domain/Model'

export interface OrdersRepositoryInterface {
  findByPlatformAndId(
    platform: PlatformEnum,
    id: string
  ): Promise<OrderModel | null>
  save(orderData: OrderModel): Promise<OrderModel>
}
