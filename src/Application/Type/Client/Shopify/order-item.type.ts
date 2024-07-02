import { PriceDetailsType } from '@application/Type'

export type OrderItemType = {
  id: number
  name: string
  grams: number
  price_set: PriceDetailsType
  product_id: number
  quantity: number
  sku: string
  variant_id: number
  tax_lines: {
    price_set: PriceDetailsType
  }[]
}
