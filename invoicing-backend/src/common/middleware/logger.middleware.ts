/**
 * 打印请求信息的中间件
 */
import { Injectable,NestMiddleware } from "@nestjs/common";
import {Request,Response} from 'express'

@Injectable()
export class LoggerMiddleWare implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        const {method,path} = req;
        console.log(`请求方法:${method}  请求路径:${req.url}   ——${new Date()}`)
        next();
    }
}