import { Body, Controller, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
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
}
