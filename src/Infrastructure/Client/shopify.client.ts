import axios, { AxiosInstance } from 'axios'
import { RequestRepeaterService } from '@infrastructure/Service'
import { ConfigService } from '@nestjs/config'
import { Inject } from '@nestjs/common'
import { ShopifyClientInterface } from '@application/Interface/Client'
import { CreateProductType, OrderType, ProductType } from '@application/Type'

const GET_ORDERS_PATH = '/orders.json?status=any&fields=id,name,total_price_set,line_items'
const GET_ORDER_PATH = (id: string) => `/orders/${id}.json?fields=id,name,total_price_set,line_items`
const CREATE_PRODUCT_PATH = '/products.json'

export class ShopifyClient implements ShopifyClientInterface {
  private readonly client: AxiosInstance

  constructor(
    private readonly requestRepeater: RequestRepeaterService,
    @Inject()
    configService: ConfigService,
  ) {
    this.client = axios.create({
      baseURL: configService.get('shopify.baseUrl'),
      timeout: 40000,
      auth: {
        username: configService.get('shopify.apiKey'),
        password: configService.get('shopify.password'),
      }
    })
  }

  public async getOrders(): Promise<OrderType[]> {
    type DataType = { orders: OrderType[] }
    type ResponseData = { data: DataType }

    const response
      = await this.requestRepeater.callAction<ResponseData>(
        ShopifyClient.name,
        async () => {
          return await this.client.get<DataType>(GET_ORDERS_PATH)
        }
    )

    return response?.data.orders || []
  }

  public async getOrderById(
    id: string
  ): Promise<OrderType | null> {
    type DataType = { order: OrderType }
    type ResponseData = { data: DataType }

    const response
      = await this.requestRepeater.callAction<ResponseData>(
        ShopifyClient.name,
        async () => {
          return await this.client.get<DataType>(GET_ORDER_PATH(id))
        }
      )

    return response?.data?.order || null
  }

  public async createProduct(
    product: CreateProductType
  ): Promise<ProductType> {
    type DataType = { product: ProductType }
    type ResponseData = { data: DataType }

    const response
      = await this.requestRepeater.callAction<ResponseData>(
        ShopifyClient.name,
        async () => {
          return await this.client.post<DataType>(
            CREATE_PRODUCT_PATH,
            { product }
          )
        }
      )

    return response?.data?.product
  }
}
