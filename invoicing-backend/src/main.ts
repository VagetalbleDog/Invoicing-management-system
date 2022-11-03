import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/filter/httpExp.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  //设置swagger文档
  const swaggerOptions = new DocumentBuilder()
  .setTitle('进销存信息系统后端api可视化')
  .setDescription('PowerBy NestJs&Swagger.\nDesignBy Zhuwenfu')
  .build();
  const document = SwaggerModule.createDocument(app,swaggerOptions);
  SwaggerModule.setup('doc',app,document)
  await app.listen(3000);
}
bootstrap();
