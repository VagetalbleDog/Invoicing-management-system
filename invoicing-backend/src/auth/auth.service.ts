import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from 'src/employee/employee.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly employeeService:EmployeeService,
        private readonly jwtService:JwtService
    ){}

    /**
     * 通过账号、密码来验证用户，验证成功返回用户，失败返回null
     * @param username 
     * @param password 
     */
    async validateUser(username:string,password:string):Promise<any>{
        const user = await this.employeeService.find(undefined,username,undefined);
        if(user.length===1&&user[0].password===password){
            const {password,...result} = user[0];
            return result;
        }else{
            return null;
        }
    }

    /**
     * 通过登录验证的用户进行jwt加密并返回token
     * @param user 
     * @returns json web token
     */
    async login(user:any){
        const payload = {
            username:user.username,
            id:user.id,
            userType:user.userType
        }
        return {
            access_token:this.jwtService.sign(payload)
        }
    }
}
