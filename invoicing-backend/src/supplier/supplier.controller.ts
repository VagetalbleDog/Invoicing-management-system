import { Controller, Get, HttpCode, Query,UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('supplier')
@ApiTags('供应商模块')
@UseGuards(AuthGuard)
export class SupplierController {
    constructor(
        private readonly SupplierService:SupplierService
    ){}

    /**
     * 查询所有供应商信息 、所售商品信息
     * @returns Suppiler[]
     */
    @Get()
    @Roles('admin','purchase')
    @HttpCode(200)
    @ApiQuery({
        required:false,
        description:'根据供应商名查询',
        name:'supplierName'
    })
    async find(@Query() {supplierName}){
       return this.SupplierService.find(supplierName);
    }
}
