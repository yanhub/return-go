import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { CreateProductCommand } from '@application/Command'
import { DataProviderResolver } from '@application/Service'
import { ProductResponseModel } from '@application/Model/Response'
import {
  ProductsRepositoryInterface
} from '@application/Interface/Repository/Mongo'

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @Inject() private readonly dataProviderResolver: DataProviderResolver,
    @Inject('IProductsRepository')
    private readonly productsRepository: ProductsRepositoryInterface,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductResponseModel> {
    const {
      platform,
      productModel: createProductModel
    } = command

    const product = await this.dataProviderResolver
      .getDataProvider(platform)
      .createProduct(createProductModel)

    await this.productsRepository.save(product)

    return ProductResponseModel.create(product)
  }
}
