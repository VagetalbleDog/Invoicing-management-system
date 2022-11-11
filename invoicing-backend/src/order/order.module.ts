import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/employee/employee.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { SupplierEntity } from 'src/supplier/supplier.entity';
import { SupplierModule } from 'src/supplier/supplier.module';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,EmployeeEntity,SupplierEntity]),EmployeeModule,JwtModule,SupplierModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
