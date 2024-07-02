import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import * as Controllers from './Controller'
import { ApplicationModule } from '@application/application.module'

@Module({
  imports: [
    CqrsModule,
    ApplicationModule,
  ],
  controllers: [
    Controllers.OrderController,
    Controllers.ProductController,
  ],
})
export class PresentationModule {}
