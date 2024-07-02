import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Param,
  Post,
  Controller,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ProductResponseModel } from '@application/Model/Response'
import { CreateProductRequestModel } from '@application/Model/Request'
import { PlatformEnum } from '@domain/Enum'
import { CreateProductCommand } from '@application/Command'

@ApiTags('product')
@Controller('')
@UsePipes(new ValidationPipe())
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/product/:platform')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ProductResponseModel })
  async createProduct(
    @Param('platform') platform: PlatformEnum,
    @Body() createProductRequest: CreateProductRequestModel,
  ): Promise<ProductResponseModel> {
    return await this.commandBus.execute(
      new CreateProductCommand(
        platform,
        createProductRequest
      )
    )
  }
}
