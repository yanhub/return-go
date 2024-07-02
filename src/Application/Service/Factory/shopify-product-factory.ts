import { ProductType } from '@application/Type'
import { ProductModel } from '@domain/Model'
import { Injectable } from '@nestjs/common'
import { ProductStatusEnum } from '@domain/Enum'

@Injectable()
export class ShopifyProductFactory {
  public create(product: ProductType): ProductModel {
    return {
      id: product.id.toString(),
      type: product.product_type,
      status: product.status as ProductStatusEnum,
      tags: product.tags.split(',').map(tag => tag.trim()),
      title: product.title,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      vendor: product.vendor,
    } as ProductModel
  }
}
