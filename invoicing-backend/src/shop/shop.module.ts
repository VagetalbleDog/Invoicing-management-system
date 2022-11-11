import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './shop.entity';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from 'src/employee/employee.module';
import { OrderService } from 'src/order/order.service';
import { OrderEntity } from 'src/order/order.entity';
import { SupplierModule } from 'src/supplier/supplier.module';

@Module({
  imports:[TypeOrmModule.forFeature([ShopEntity,OrderEntity]),JwtModule,EmployeeModule,SupplierModule],
  providers: [ShopService,OrderService],
  controllers: [ShopController],
})
export class ShopModule {}
