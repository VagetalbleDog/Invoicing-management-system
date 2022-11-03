import { Injectable } from '@nestjs/common'
import * as SvgCaptcha from 'svg-captcha'

@Injectable()
export class ValidateService {
    async captcha(size = 4) {
        const captcha = SvgCaptcha.create({
            size,
            fontSize: 50,
            width: 100,  //宽度
            height: 34,  //高度
            background: '#cc9966',  //背景颜色
        })
        return captcha
    }
}