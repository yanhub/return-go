import { Document } from 'mongoose'
import { Prop, Schema } from '@nestjs/mongoose'
import { PlatformEnum, ProductStatusEnum } from '@domain/Enum'

@Schema()
export class ProductModel extends Document {
  @Prop({ type: String, enum: PlatformEnum })
  public platform: PlatformEnum

  @Prop()
  public id: string

  @Prop()
  public type: string

  @Prop({ type: String, enum: ProductStatusEnum })
  public status: ProductStatusEnum

  @Prop({ type: [String] })
  public tags: string[]

  @Prop()
  public title: string

  @Prop()
  public createdAt: string

  @Prop()
  public updatedAt: string

  @Prop()
  public vendor: string
}
