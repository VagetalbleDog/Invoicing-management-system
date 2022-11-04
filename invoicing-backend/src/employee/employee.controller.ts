import { Controller,Get,Query,Param,Body,HttpCode, UseGuards, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiBearerAuth,ApiTags,ApiQuery, ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmployeeEntity } from './employee.entity';
@Controller('employee')
@UseGuards(AuthGuard)
export class EmployeeController {
    constructor(
        private readonly employeeService:EmployeeService
    ){}
    /*
     * 查询用户接口
     */
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


    /*
     * 删除用户接口
     */
    @Post('delete/:id')
    @HttpCode(201)
    @ApiParam({
        name:'id',
        description:"根据id删除用户，只有管理员权限才可以，并且只能操作销售人员和采购人员，不能删除其他管理员"
    })
    @Roles('admin')
    async deleteUser(@Param() {id}){
        id = parseInt(id)
        const user = await this.employeeService.find(undefined,undefined,id);
        if(!user){
            return {
                code:400,
                message:'传入id有误'
            }
        }
        if(user[0].userType===1){
            return {
                code:400,
                message:'管理员用户不可删除'
            }
        }
        await this.employeeService.deleteUser(id);
        return {
            code:201,
            message:`删除成功，用户信息如下`,
            user:user[0]
        }
    }

    /*
     * 注册用户接口
     */
    @Post('register')
    @ApiBody({
        type:EmployeeEntity
    })
    async registerUser(){

    }
}
