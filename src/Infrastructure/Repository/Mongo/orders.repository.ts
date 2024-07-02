import { Injectable } from '@nestjs/common'
import {
  InjectModel, ModelDefinition, SchemaFactory,
} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { OrderModel } from '@domain/Model'
import { PlatformEnum } from '@domain/Enum'
import {
  OrdersRepositoryInterface
} from '@application/Interface/Repository/Mongo'

export const OrderModelDefinition: ModelDefinition = {
  name: 'orders',
  schema: SchemaFactory.createForClass(OrderModel),
  collection: 'orders',
}

@Injectable()
export class OrdersRepository implements OrdersRepositoryInterface {
  constructor(
    @InjectModel(OrderModelDefinition.name)
    private model: Model<OrderModel>
  ) {}

  async findByPlatformAndId(
    platform: PlatformEnum,
    id: string
  ): Promise<OrderModel | null> {
    return await this.model.findOne({ platform, id }).exec()
  }

  async save(orderData: OrderModel): Promise<OrderModel> {
    return await this.model
      .findOneAndUpdate(
        { id: orderData.id, platform: orderData.platform },
        { ...orderData, _id: undefined },
        { new: true, upsert: true }
      )
      .exec()
  }
}
