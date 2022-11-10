import { Column,Entity,JoinColumn,JoinTable,ManyToOne,PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ShopEntity } from 'src/shop/shop.entity'
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
    @Column()
    @ManyToOne(()=>ShopEntity)
    @JoinTable()
    shops:ShopEntity

    // @ApiProperty({
    //     description:'供应商'
    // })
    // @ManyToOne(()=>/** */)
    // @JoinColumn()
    // suppiler
}