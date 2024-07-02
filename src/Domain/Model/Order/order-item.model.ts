import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  PriceDetailsModel,
  PriceDetailsModelSchema
} from './price-details.model'

@Schema()
export class OrderItemModel extends Document {
  @Prop()
  public id: string

  @Prop()
  public name: string

  @Prop()
  public weight: string

  @Prop()
  public weightUnit: string

  @Prop({ type: PriceDetailsModelSchema })
  public priceDetails: PriceDetailsModel

  @Prop()
  public productId: string

  @Prop()
  public quantity: number

  @Prop()
  public sku: string

  @Prop()
  public variantId: string

  @Prop({ type: PriceDetailsModelSchema })
  public tax: PriceDetailsModel | null
}

export const OrderItemModelSchema = SchemaFactory.createForClass(OrderItemModel)
