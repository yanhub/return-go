import { Module } from '@nestjs/common'
import { PresentationModule } from '@presentation/presentation.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from 'config/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    PresentationModule,
  ],
})
export class AppModule {}
