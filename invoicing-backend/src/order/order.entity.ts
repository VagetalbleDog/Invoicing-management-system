import { Column,Entity,ManyToOne,PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ShopEntity } from 'src/shop/shop.entity'
import { SupplierEntity } from 'src/supplier/supplier.entity'
import { EmployeeEntity } from 'src/employee/employee.entity'
export enum OrderType{
    '采购'=1,
    '销售'=2
}
@Entity({
    name:'Order'
})
export class OrderEntity{
    @ApiProperty({
        default:1,
        description:'订单id'
    })
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({
        description:'包含商品',
    })
    @ManyToOne(()=>ShopEntity)
    shop:ShopEntity

    @ApiProperty({
        description:'供应商'
    })
    @ManyToOne(()=>SupplierEntity,{nullable:true})
    supplier:SupplierEntity

    @ApiProperty({
        description:'操作人员'
    })
    @ManyToOne(()=>EmployeeEntity)
    employee:EmployeeEntity

    @ApiProperty({
        description:"订单类型",
        default:1,
        enum:OrderType
    })
    @Column()
    orderType:OrderType

    @ApiProperty({
        description:"订单创建时间",
    })
    @Column({type:'datetime'})
    createTime:Date

    @ApiProperty({
        description:"交易数量"
    })
    @Column()
    num:number

    @ApiProperty({
        description:"单价"
    })
    @Column()
    price:number
}