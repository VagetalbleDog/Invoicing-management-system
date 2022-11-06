import { Body, Controller, Get, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateService } from 'src/utils/svg.validate';
import { ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('登录和权限认证模块')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
        private readonly validateService:ValidateService
        ){}
    @Post('login')
    async login(@Body() body){
        const {username,password} = body;
        const user = await this.authService.validateUser(username,password);
        if(!user){
            return {
                code:401,
                message:'用户名或密码错误'
            }
        }
        return this.authService.login(user)
    }
    @Get('code')
    async getCode(){
        const svgCaptcha = await this.validateService.captcha();
        return {
            svg:svgCaptcha.data,
            text:svgCaptcha.text
        }
    }
}
