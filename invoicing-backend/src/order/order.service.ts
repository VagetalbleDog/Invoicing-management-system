import { Injectable } from '@nestjs/common';
import { OrderEntity, OrderType } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from 'src/shop/shop.entity';
import { createOrderId } from 'src/utils/createOrderId';
import { EmployeeService } from 'src/employee/employee.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly employeeService: EmployeeService,
        private readonly supplierService: SupplierService
    ) { }

    /**
     * 查询所有订单信息
     * @Query id
     */
    async find(orderId: number | undefined, orderType: number | undefined) {
        return this.orderRepository.find({ relations: ["employee", "supplier", "shop"], where: { 'id': orderId, "orderType": orderType } })
    }
    /**
     * 生成订单
     */
    async create(orderType: OrderType, employeeId: number, shop: ShopEntity, num: number, supplierId?: number) {
        //生成订单号
        const orderId = createOrderId();
        const employee = (await this.employeeService.find(undefined, undefined, employeeId, undefined))[0]
        const supplier = supplierId ? (await this.supplierService.find(undefined, supplierId))[0] : undefined;

        await this.orderRepository.insert({
            id: orderId,
            orderType,
            employee,
            shop,
            supplier,
            createTime: new Date(),
            price: shop.price,
            num: num
        });
        return {
            message: '订单创建成功',
            orderId
        }
    }
}
