import { Controller,Get,Query,Param,Body,HttpCode, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiBearerAuth,ApiTags,ApiQuery,ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('employee')
@UseGuards(AuthGuard)
export class EmployeeController {
    constructor(
        private readonly employeeService:EmployeeService
    ){}

    @Get()
    @HttpCode(200)
    @ApiQuery({name:'id',required:false,description:'根据id查询用户'})
    @ApiQuery({name:'name',required:false,description:'根据name查询用户'})
    @ApiQuery({name:'username',required:false,description:'根据username查询用户'})
    @Roles('admin')
    async query(@Query() query){
        const {username,id,name} = query;
        return this.employeeService.find(name,username,id)
    }
}
