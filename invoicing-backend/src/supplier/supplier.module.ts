import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './supplier.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([SupplierEntity]),EmployeeModule,JwtModule],
  providers: [SupplierService],
  controllers: [SupplierController],
  exports:[SupplierService]
})
export class SupplierModule {}
