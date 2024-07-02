import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { PriceModel, PriceModelSchema } from './price.model'


@Schema()
export class PriceDetailsModel extends Document {
  @Prop({ type: PriceModelSchema })
  public shopPrice: PriceModel

  @Prop({ type: PriceModelSchema })
  public presentmentPrice: PriceModel
}

export const PriceDetailsModelSchema = SchemaFactory.createForClass(PriceDetailsModel)
