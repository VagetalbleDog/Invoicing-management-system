import { Controller, Get, Query, Param, Body, HttpCode, UseGuards, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { EmployeeEntity } from './employee.entity';
@Controller('employee')
@UseGuards(AuthGuard)
@ApiTags('雇员模块')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) { }
    /*
     * 查询用户接口
     */
    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'id', required: false, description: '根据id查询用户' })
    @ApiQuery({ name: 'name', required: false, description: '根据name查询用户' })
    @ApiQuery({ name: 'username', required: false, description: '根据username查询用户' })
    @ApiQuery({ name: "userType", required: false, description: '根据userType查询用户' })
    @Roles('admin', 'sale', 'purchase')
    async query(@Query() query) {
        const { username, id, name, userType } = query;
        const users = await this.employeeService.find(name, username, id, userType);
        //把密码字段去除再返回
        const result = users.map((employee) => { return { id: employee.id, name: employee.name, username: employee.username, sex: employee.sex, userType: employee.userType } })
        return result;
    }


    /*
     * 删除用户接口
     */
    @Post('delete/:id')
    @HttpCode(201)
    @ApiParam({
        name: 'id',
        description: "根据id删除用户，只有管理员权限才可以，并且只能操作销售人员和采购人员，不能删除其他管理员"
    })
    @Roles('admin')
    async deleteUser(@Param() { id }) {
        id = parseInt(id)
        const user = await this.employeeService.find(undefined, undefined, id, undefined);
        if (!user) {
            return {
                code: 400,
                message: '传入id有误'
            }
        }
        if (user[0].userType === 1) {
            return {
                code: 400,
                message: '管理员用户不可删除'
            }
        }
        await this.employeeService.deleteUser(id);
        return {
            code: 201,
            message: `删除成功，用户信息如下`,
            user: user[0]
        }
    }

    /*
     * 注册用户接口
     */
    @Post('register')
    @ApiBody({
        type: EmployeeEntity,
        description: '注册用户，需要传入除id以外的其他字段',
    })
    @Roles('admin')
    @HttpCode(201)
    async registerUser(@Body() user: any) {
        const nowUsers = await this.employeeService.find(undefined, undefined, undefined, undefined);
        const newId = nowUsers.length > 0 ? nowUsers[nowUsers.length - 1].id + 1 : 1;
        const { username, name, password, sex, userType } = user;
        if (nowUsers.find(user => user.username === username)) {
            return {
                code: 400,
                message: '当前用户名已存在!'
            }
        }
        if (userType === 1) {
            return {
                code: 400,
                message: '您不能注册管理员用户!'
            }
        }
        const newEmployee = {
            id: newId, username, name, password, sex, userType
        }
        await this.employeeService.regsiterUser(newEmployee);
        return {
            code: 201,
            message: "注册成功",
            employee: newEmployee
        }
    }

    /**
     * 更新用户接口
     */
    @Post('update/:id')
    @Roles('admin')
    @ApiParam({ name: 'id', description: '根据id更新用户' })
    @ApiBody({
        type: EmployeeEntity,
        description: '传入需要修改的字段即可',
        required: false
    })
    @HttpCode(201)
    async updateEmployee(@Param() { id }, @Body() newInfo) {
        const { username, name, sex, userType, password } = newInfo;
        id = parseInt(id);
        const nowUsers = await this.employeeService.find(undefined, undefined, undefined, undefined);
        if (nowUsers.find(user => user.username === username && user.id !== id)) {
            return {
                code: 400,
                message: '当前用户名已存在!'
            }
        }
        await this.employeeService.updateUser(id, username, name, sex, userType, password)
        return {
            code: 200,
            message: '更新成功',
        }
    }
}
