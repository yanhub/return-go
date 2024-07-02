import { Injectable } from '@nestjs/common'
import {
  InjectModel, ModelDefinition, SchemaFactory,
} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProductModel } from '@domain/Model'
import { PlatformEnum } from '@domain/Enum'
import {
  ProductsRepositoryInterface
} from '@application/Interface/Repository/Mongo'


export const ProductModelDefinition: ModelDefinition = {
  name: 'products',
  schema: SchemaFactory.createForClass(ProductModel),
  collection: 'products',
}


@Injectable()
export class ProductsRepository implements ProductsRepositoryInterface {
  constructor(
    @InjectModel(ProductModelDefinition.name)
    private model: Model<ProductModel>
  ) {}

  async findByPlatformAndId(
    platform: PlatformEnum,
    id: string
  ): Promise<ProductModel | null> {
    return await this.model.findOne({ platform, id }).exec()
  }

  async save(productData: ProductModel): Promise<ProductModel> {
    return await this.model
      .findOneAndUpdate(
        { id: productData.id, platform: productData.platform },
        { ...productData, _id: undefined },
        { new: true, upsert: true }
      )
      .exec()
  }
}
