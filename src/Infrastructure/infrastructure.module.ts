import { Module } from '@nestjs/common'
import * as Clients from '@infrastructure/Client'
import * as MongoRepositories from '@infrastructure/Repository/Mongo'
import * as Services from '@infrastructure/Service'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([
      MongoRepositories.OrderModelDefinition,
      MongoRepositories.ProductModelDefinition,
    ]),
    HttpModule,
  ],
  providers: [
    Services.RequestRepeaterService,
    Services.RequestLimiterService,
    {
      provide: 'IShopifyClient',
      useClass: Clients.ShopifyClient,
    },
    {
      provide: 'IOrdersRepository',
      useClass: MongoRepositories.OrdersRepository,
    },
    {
      provide: 'IProductsRepository',
      useClass: MongoRepositories.ProductsRepository,
    },
  ],
  exports: [
    // Clients
    'IShopifyClient',

    // Mongo
    'IOrdersRepository',
    'IProductsRepository',
  ],
})
export class InfrastructureModule {}
