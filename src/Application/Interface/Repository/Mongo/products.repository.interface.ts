import { PlatformEnum } from '@domain/Enum'
import { ProductModel } from '@domain/Model'

export interface ProductsRepositoryInterface {
  findByPlatformAndId(
    platform: PlatformEnum,
    id: string
  ): Promise<ProductModel | null>

  save(productData: ProductModel): Promise<ProductModel>
}
