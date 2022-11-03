/**
 * 自定义filter异常处理器，详细记录一些错误信息，并返回
 * 全局调用 useGlobalFilter（） main.ts
 */
 import {ArgumentsHost,Catch,ExceptionFilter,HttpException} from '@nestjs/common'

 @Catch(HttpException)
 export class HttpExceptionFilter implements ExceptionFilter<HttpException>{
     catch(exception: HttpException, host: ArgumentsHost) {
         const ctx = host.switchToHttp();
         const response = ctx.getResponse();
         const request = ctx.getRequest();
         const status = exception.getStatus();
         console.log(exception);
         response.status(status).json({
             status,
             timeStamp:new Date().toISOString(),
             path:request.url,
             message:exception.getResponse()
         })
     }
 }