import { DataProviderInterface } from '@application/Interface/Service'
import { OrderModel, ProductModel } from '@domain/Model'
import { Inject } from '@nestjs/common'
import { ShopifyClientInterface } from '@application/Interface/Client'
import {
  ShopifyOrderFactory,
  ShopifyProductFactory
} from '@application/Service/Factory'
import { CreateProductRequestModel } from '@application/Model/Request'
import { CreateProductType } from '@application/Type'

export class ShopifyDataProvider implements DataProviderInterface {

  constructor(
    @Inject() private readonly orderFactory: ShopifyOrderFactory,
    @Inject() private readonly productFactory: ShopifyProductFactory,
    @Inject('IShopifyClient')
    private readonly client: ShopifyClientInterface
  ) {
  }

  public async getOrderById(id: string): Promise<OrderModel> {
    const orderData = await this.client.getOrderById(id)
    if (!orderData) {
      throw new Error('Order not found')
    }

    return this.orderFactory.create(orderData)
  }

  public async getOrders(): Promise<OrderModel[]> {
    const ordersData = await this.client.getOrders()
    if (!ordersData) {
      throw new Error('Orders not found')
    }

    return ordersData.map(
      orderData => this.orderFactory.create(orderData)
    )
  }

  public async createProduct(
    productModel: CreateProductRequestModel
  ): Promise<ProductModel> {
    const productData = await this.client.createProduct({
      title: productModel.title,
      body_html: productModel.description,
      product_type: productModel.type,
      vendor: productModel.vendor,
    } as CreateProductType)
    if (!productData) {
      throw new Error('Can not create product')
    }

    return this.productFactory.create(productData)
  }
}
