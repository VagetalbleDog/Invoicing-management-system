import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee/employee.entity';
import { ShopEntity } from './shop/shop.entity';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierEntity } from './supplier/supplier.entity';
import { OrderEntity } from './order/order.entity';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'zwf.20010928-3',
    database:'InvocingDatabase',
    entities:[OrderEntity,EmployeeEntity,ShopEntity,SupplierEntity],
    // synchronize:true
  }),EmployeeModule, AuthModule, ShopModule, OrderModule, SupplierModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('')
  }
}
