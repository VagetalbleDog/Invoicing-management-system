import { Column,Entity,PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
export enum ShopType{
    '生活用品'=1,
    '数码产品'=2,
    '食品'=3,
    '衣帽鞋类'=4,
    '体育用品'=5
}
@Entity({name:'Shop'})
export class ShopEntity{
    @ApiProperty({
        default:1,
        description:'商品id'
    })
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({
        default:'手机',
        description:'商品名称'
    })
    @Column({type:'varchar',length:20})
    shopName:string

    @ApiProperty({
        default:2,
        description:'商品类别',
        enum:ShopType
    })
    @Column({type:'enum',enum:ShopType})
    shopType:ShopType

    @ApiProperty({
        default:5899,
        description:'售价'
    })
    @Column({type:'int'})
    price:number

    @ApiProperty({
        default:20,
        description:'存量'
    })
    @Column({type:'int'})
    remainder:number

}