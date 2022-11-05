import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { ValidateService } from 'src/utils/svg.validate';

@Module({
  imports:[EmployeeModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{
      expiresIn:'3600s'
    }
  })],
  providers: [AuthService,ValidateService],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}                          
