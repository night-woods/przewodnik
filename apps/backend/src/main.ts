import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const apiVersion = 'v1'
  const apiPrefix = `api/${apiVersion}`
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Przewodnik')
    .setDescription('Przewodnik po Wrocławiu')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup(apiPrefix, app, document)
  await app.listen(3001)
}
bootstrap()
