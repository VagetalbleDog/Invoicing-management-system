import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import { EmployeeModule } from './employee/employee.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [EmployeeModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('')
  }
}
