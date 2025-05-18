import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@/application/middleware/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupManualSwagger } from '@/docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter())

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true
  })
  const PORT = process.env.PORT || 3000

  setupManualSwagger(app)

  await app.listen(PORT ?? 3000);

  console.log('🚀 HTTP Server is running at: http://localhost:' + PORT)
  console.log('📡 WebSocket Gateway is active at: ws://localhost:' + PORT)
  console.log('💬 Listening for events like: "scheduling:created"')

}
bootstrap();
