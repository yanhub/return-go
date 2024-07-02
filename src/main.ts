import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { urlencoded, json } from 'express'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  })
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('')
  app.use(json({ limit: '80mb' }))
  app.use(urlencoded({ extended: true, limit: '80mb' }))

  app.use(helmet())
  app.enableCors({
    origin: configService.get('corsOrigin'),
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription(
      'This page contains a full description of all endpoints, their parameters, returned types and entities, used in the application',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  const port = configService.get('port')
  await app.listen(port, () => {
    console.log(`application started on port: ${port}`)
  })
}

bootstrap().catch(() => {
  process.exit(1)
})
