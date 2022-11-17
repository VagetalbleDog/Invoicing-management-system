import { Controller, Get, HttpCode, Query, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
@ApiTags('订单模块')
@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    /**
     * 查询所有订单信息
     * @returns Promise<Order[]>
     */
    @Roles('admin', 'purchase', 'sale')
    @HttpCode(200)
    @ApiQuery({
        required: false,
        description: '根据订单id查询',
        name: 'id'
    })
    @ApiQuery({
        required: false,
        description: '根据订单类型查询',
        name: 'orderType'
    })
    @Get()
    async find(@Query() { id, orderType }) {
        id = id ? Number(id) : undefined;
        return this.orderService.find(id, orderType)
    }
}
