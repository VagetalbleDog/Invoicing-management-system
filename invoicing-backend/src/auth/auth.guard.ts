import { Injectable,CanActivate, ConsoleLogger, ExecutionContext } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import { Reflector } from "@nestjs/core";
import { EmployeeService } from "src/employee/employee.service";
import { switchUserTypeToString } from "src/utils/switchUserType";
/**
 * 全局权限守卫，获取每次请求的头部的token。
 * 使用jwt加解密，解密后对角色进行权限认证，认证成功放行。
 * 配合自定义角色装饰器使用
 */

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly reflector:Reflector,
        private readonly employeeService:EmployeeService,
        private readonly jwtService:JwtService
    ){}
    canActivate(context: ExecutionContext): boolean|Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles',context.getHandler());
        if(roles.length===0){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;
        if(!authorization){
            return false;
        }
        //拿到jwt
        const token = authorization.slice(7)
        //解密
        const {username,id,userType} = this.jwtService.decode(token) as any;
        if(!username || !id ||!userType){
            return false;
        }
        const employeeType = switchUserTypeToString(userType);
        return roles.includes(employeeType)
    }
}