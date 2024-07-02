import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from './product.controller'
import { CommandBus } from '@nestjs/cqrs'
import { PlatformEnum, ProductStatusEnum } from '@domain/Enum'
import { CreateProductRequestModel } from '@application/Model/Request'
import { CreateProductCommand } from '@application/Command'
import { ProductResponseModel } from '@application/Model/Response'

describe('ProductController', () => {
  let productController: ProductController
  let commandBus: CommandBus

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [CommandBus],
    }).compile()

    productController = module.get<ProductController>(ProductController)
    commandBus = module.get<CommandBus>(CommandBus)

    commandBus.execute = jest.fn()
  })

  it('should call CreateProductCommand with correct parameters on createProduct', async () => {
    const platform: PlatformEnum = PlatformEnum.SHOPIFY
    const createProductRequest: CreateProductRequestModel = {
      title: "Dumbbells",
      description: "30kg dumbbells best quality black",
      vendor: "Super sport equipment Inc",
      type: "dumbbell"
    }

    const expectedResult: ProductResponseModel = {
      id: 'id',
      type: 'type',
      status: ProductStatusEnum.ACTIVE,
      tags: ['a', 'b'],
      title: 'title',
      createdAt: '2024-07-02T00:01:02',
      updatedAt: '2024-07-02T00:01:02',
      vendor: 'vendor'
    }

    const mockedInvoke = (commandBus.execute as jest.MockedFunction<any>)
      .mockReturnValueOnce(Promise.resolve(expectedResult))

    const result = await productController.createProduct(
      platform,
      createProductRequest
    )

    const firstCall = mockedInvoke.mock.calls[0]
    const command = firstCall[0] as CreateProductCommand

    expect(command.platform).toEqual(platform)
    expect(command.productModel).toEqual(createProductRequest)

    expect(result).toEqual(expectedResult)
  })
})
