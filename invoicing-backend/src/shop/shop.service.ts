import { Injectable } from '@nestjs/common';
import { ShopEntity, ShopType } from './shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
        private readonly orderService: OrderService,
    ) { }

    /**
     * 查询商品信息,支持传参 id shopName shopType 不传参则查询所有
     * @returns Promise<EmployeeEntity[]>
     */
    async find(shopName: string | undefined, shopType: number | undefined, id: number | undefined): Promise<ShopEntity[]> {
        return this.shopRepository.findBy({ "shopName": shopName, "shopType": shopType, "id": id });
    }

    /**
     * 进货,需要调用订单服务产生订单
     * @Params shopId:购入商品Id num:购入数量 suppiler:供应商 employee:操作人员
     * @returns Order
     */
    async purcase(shopId: number, num: number, supplierId: number, employeeId: number) {

        const shop = (await this.find(undefined, undefined, shopId))[0];
        //生成订单服务

        //修改数据库中的存量
        let nowNum = shop.remainder;
        nowNum += num;
        await this.shopRepository.update({ 'id': shopId }, { 'remainder': nowNum });

        //创建并返回订单信息
        return this.orderService.create(1, employeeId, shop, num, supplierId)
    }


    /**
     * 售货,需要调用订单服务产生订单
     * @Params shopId:卖出商品id num:卖出数量 employee:操作人
     * @returns Order
     */

    async sale(shopId: number, num: number, employeeId: number) {
        if (num <= 0) {
            return {
                code: '400',
                message: '您没有输入购买数量'
            }
        }
        const shop = (await this.find(undefined, undefined, shopId))[0];
        //修改数据库中的存量
        let nowNum = shop.remainder;
        nowNum -= num;
        if (nowNum < 0) {
            return {
                code: '400',
                message: '存量不足购买失败'
            }
        }
        await this.shopRepository.update({ 'id': shopId }, { 'remainder': nowNum });
        //生成订单服务,返回订单信息
        return this.orderService.create(2, employeeId, shop, num)
    }
}
