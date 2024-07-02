import { OrderModel, ProductModel } from '@domain/Model'
import { CreateProductRequestModel } from '@application/Model/Request'

export interface DataProviderInterface {
  getOrderById(id: string): Promise<OrderModel>
  getOrders(): Promise<OrderModel[]>
  createProduct(productModel: CreateProductRequestModel): Promise<ProductModel>
}
