import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class PriceModel extends Document {
  @Prop()
  public amount: number

  @Prop()
  public currency: string
}

export const PriceModelSchema = SchemaFactory.createForClass(PriceModel)
