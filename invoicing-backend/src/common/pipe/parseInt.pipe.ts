/**
 * 自定义管道，将string参数转为number类型，一般用于id为参数的确认query查询场景
 * 将
 */
import {PipeTransform,Injectable,ArgumentMetadata,BadRequestException} from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string>{
    async transform(value: string, metadata: ArgumentMetadata) {
        const val = parseInt(value,10);
        if(isNaN(val)){
            throw new BadRequestException('Validation failed')
        }
        return val
    }
}