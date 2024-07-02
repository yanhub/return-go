import {
  OrderItemType,
  OrderType,
  PriceDetailsType,
  PriceType
} from '@application/Type'
import {
  OrderItemModel,
  OrderModel,
  PriceDetailsModel,
  PriceModel
} from '@domain/Model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ShopifyOrderFactory {
  public create(order: OrderType): OrderModel {
    return {
      id: order.id.toString(),
      name: order.source_name,
      priceDetails: this.createPriceDetailsModel(
        order.total_price_set
      ),
      items: order.line_items.map(
        lineItem => this.createLineItem(lineItem)
      )
    } as OrderModel
  }

  private createLineItem(orderItem: OrderItemType): OrderItemModel {
    return {
      id: orderItem.id.toString(),
      name: orderItem.name,
      weight: orderItem.grams.toString(),
      weightUnit: 'GR',
      priceDetails: this.createPriceDetailsModel(
        orderItem.price_set
      ),
      productId: orderItem.product_id.toString(),
      quantity: orderItem.quantity,
      sku: orderItem.sku,
      variantId: orderItem.variant_id.toString(),
      tax: orderItem.tax_lines.length
        ? this.createPriceDetailsModel(orderItem.tax_lines[0].price_set)
        : null
    } as OrderItemModel
  }

  private createPriceDetailsModel(
    priceDetails: PriceDetailsType
  ): PriceDetailsModel {
    return {
      shopPrice: this.createPriceModel(
        priceDetails.shop_money
      ),
      presentmentPrice: this.createPriceModel(
        priceDetails.presentment_money
      )
    } as PriceDetailsModel
  }

  private createPriceModel(price: PriceType): PriceModel {
    return {
      amount: Number(price.amount),
      currency: price.currency_code,
    } as PriceModel
  }
}
