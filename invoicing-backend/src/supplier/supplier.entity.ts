import { Column,Entity,JoinColumn,JoinTable,ManyToMany,PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ShopEntity } from 'src/shop/shop.entity'

@Entity({name:'Supplier'})
export class SupplierEntity{
    @ApiProperty({
        default:1,
        description:'供应商id'
    })
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({
        default:'京西电商南京仓库',
        description:'供应商名称'
    })
    @Column()
    supplierName:string

    @ApiProperty({
        description:'所售商品'
    })
    @ManyToMany(()=>ShopEntity)
    @JoinTable()
    saleShops:ShopEntity[]
}