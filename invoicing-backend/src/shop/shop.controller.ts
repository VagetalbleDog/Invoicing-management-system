import { Controller,Get,Query,Param,Body,HttpCode, UseGuards, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ApiBearerAuth,ApiTags,ApiQuery, ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ShopEntity } from './shop.entity';

@Controller('shop')
@UseGuards(AuthGuard)
@ApiTags('商品模块')
export class ShopController {
    constructor(
        private readonly shopService:ShopService
    ){}

    /*
     * 查询商品接口
     */
    @Get()
    @HttpCode(200)
    @ApiQuery({name:'id',required:false,description:'根据id查询商品'})
    @ApiQuery({name:'shopName',required:false,description:'根据商品名查询商品'})
    @ApiQuery({name:'shopType',required:false,description:'根据商品类别查询商品'})
    @Roles()
    async query(@Query() query){
        let {shopName,id,shopType} = query;
        if(id){id = parseInt(id)};
        if(shopType){shopType = parseInt(shopType)}
        return this.shopService.find(shopName,shopType,id);
    }

    /**
     * 进货接口
     */
    @Post('purchase')
    @ApiBody({
        description:"进货数量、操作员id、供应商id、商品id"
    })
    @HttpCode(201)
    @Roles('purchase','admin')
    async purchase(@Body() {shopId,num,employeeId,supplierId}){
        const id = parseInt(shopId);
        num = parseInt(num);
        employeeId = parseInt(employeeId);
        supplierId = parseInt(supplierId);
        return this.shopService.purcase(id,num,supplierId,employeeId)
    };


    /**
     * 售货接口
     */
    @Post('sale')
    @HttpCode(201)
    @ApiBody({
        description:"售货数量、操作员id、商品id"
    })
    @Roles('sale','admin')
    async sale(@Body() {num,employeeId,shopId}){
        const id = parseInt(shopId);
        num = parseInt(num);
        employeeId = parseInt(employeeId);
        return this.shopService.sale(id,num,employeeId)
    }
}
