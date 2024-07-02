import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Param,
  Get,
  Controller,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { OrderResponseModel } from '@application/Model/Response'
import { GetOrderQuery, GetOrdersQuery } from '@application/Query'
import { PlatformEnum } from '@domain/Enum'

@ApiTags('order')
@Controller('')
@UsePipes(new ValidationPipe())
export class OrderController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/order/:platform/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.OK, type: OrderResponseModel })
  async getOrder(
    @Param('platform') platform: PlatformEnum,
    @Param('id') orderId: string,
  ): Promise<OrderResponseModel> {
    return await this.queryBus.execute(
      new GetOrderQuery(platform, orderId)
    )
  }

  @Get('/orders/:platform')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.OK, type: [OrderResponseModel] })
  async getOrders(
    @Param('platform') platform: PlatformEnum,
  ): Promise<OrderResponseModel> {
    return await this.queryBus.execute(
      new GetOrdersQuery(platform)
    )
  }
}
