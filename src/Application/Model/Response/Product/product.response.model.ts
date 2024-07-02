import { ApiProperty } from '@nestjs/swagger'
import { ProductStatusEnum } from '@domain/Enum'
import { ProductModel } from '@domain/Model'

export class ProductResponseModel {
  @ApiProperty({ type: 'string', example: '6914491809925' })
  public id: string

  @ApiProperty({ example: 'dumbbell' })
  public type: string

  @ApiProperty({ example: ProductStatusEnum.ACTIVE })
  public status: ProductStatusEnum

  @ApiProperty({ type: ['string'], example: 'Sport, Active, Fitness' })
  public tags: string[]

  @ApiProperty({ type: 'string', example: 'Best dumbbell' })
  public title: string

  @ApiProperty({ type: 'string', example: '2024-01-02T08:59:11-05:00' })
  public createdAt: string

  @ApiProperty({ type: 'string', example: '2024-01-02T08:59:11-05:00' })
  public updatedAt: string

  @ApiProperty({ example: 'Super sport equipment Inc' })
  public vendor: string

  public static create(product: ProductModel): ProductResponseModel {
    const self = new ProductResponseModel()
    self.id = product.id
    self.type = product.type
    self.status = product.status
    self.tags = product.tags
    self.title = product.title
    self.createdAt = product.createdAt
    self.updatedAt = product.updatedAt
    self.vendor = product.vendor

    return self
  }
}
