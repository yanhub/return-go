import { CreateProductType, OrderType, ProductType } from '@application/Type'

export interface ShopifyClientInterface {
  getOrders(): Promise<OrderType[]>
  getOrderById(id: string): Promise<OrderType | null>
  createProduct(data: CreateProductType): Promise<ProductType>
}
