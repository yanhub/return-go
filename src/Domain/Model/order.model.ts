import { Document } from 'mongoose'
import { Prop, Schema } from '@nestjs/mongoose'
import { PlatformEnum } from '@domain/Enum'
import {
  OrderItemModel,
  OrderItemModelSchema,
  PriceDetailsModel,
  PriceDetailsModelSchema
} from '@domain/Model/Order'

@Schema()
export class OrderModel extends Document {
  @Prop({ type: String, enum: PlatformEnum })
  public platform: PlatformEnum

  @Prop()
  public id: string

  @Prop()
  public name: string

  @Prop({ type: PriceDetailsModelSchema })
  public priceDetails: PriceDetailsModel

  @Prop({ type: [OrderItemModelSchema] })
  public items: OrderItemModel[]
}
