import { OrderItemType, PriceDetailsType } from '@application/Type'

export type OrderType = {
  id: number
  source_name: string
  total_price_set: PriceDetailsType
  line_items: OrderItemType[]
}
