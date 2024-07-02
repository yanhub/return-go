import { Test, TestingModule } from '@nestjs/testing'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductController } from '@presentation/Controller'
import { ApplicationModule } from '@application/application.module'
import { PlatformEnum } from '@domain/Enum'

describe('ProductController', () => {
  let productController: ProductController

  beforeEach(async () => {
    const app: TestingModule = await Test
      .createTestingModule({
        imports: [
          CqrsModule,
          ApplicationModule,
        ],
        controllers: [ ProductController ],
      })
      .compile()

    productController = app.get<ProductController>(ProductController)
  })

  describe('Test Product', () => {
    it('should create product', () => {
      expect(
        productController.createProduct(
          PlatformEnum.SHOPIFY,
          {
            title: 'test-title',
            type: 'test-type',
            description: 'test-desc',
            vendor: 'test-vendor',
          }
        )
      ).toBe('Hello World!')
    })
  })
})
