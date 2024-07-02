import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DomainModule } from '@domain/domain.module'
import * as Services from '@application/Service'
import * as CommandHandlers from '@application/CommandHandler'
import * as QueryHandlers from '@application/QueryHandler'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'

const commandHandlers = [
  CommandHandlers.CreateProductHandler,
]

const queryHandlers = [
  QueryHandlers.GetOrderHandler,
  QueryHandlers.GetOrdersHandler,
]

const eventHandlers = []

const services = [
  Services.DataProviderResolver,
  Services.ShopifyDataProvider,
  Services.ShopifyOrderFactory,
  Services.ShopifyProductFactory,
]

@Module({
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    ...queryHandlers,
    ...services,
  ],
  imports: [
    CqrsModule,
    InfrastructureModule,
    DomainModule,
  ],
})
export class ApplicationModule {}
