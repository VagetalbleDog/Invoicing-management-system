import { Column,Entity,PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
export enum Sex{
    male=1,
    female=2
}
export enum EmpolyeeType{
    admin=1,
    purchase=2,
    sale=3,
}
@Entity({name:'Employee'})
export class EmployeeEntity{
    @ApiProperty({
        default:2,
        description:'用户id'
    })
    @PrimaryGeneratedColumn()
    id:number
    @ApiProperty({
        default:'sale1',
        description:'用户账户名'
    })
    @Column({type:'varchar',length:20})
    username:string
    @ApiProperty({
        default:'朱文甫-sale',
        description:'用户姓名'
    })
    @Column({type:'varchar',length:10})
    name:string
    @ApiProperty({
        default:'zwf.20010928-3',
        description:'密码'
    })
    @Column({type:'varchar',length:25})
    password:string
    @ApiProperty({
        enum:EmpolyeeType,
        default:EmpolyeeType.purchase,
        description:'用户类型'
    })
    @Column({type:'enum',enum:EmpolyeeType,default:EmpolyeeType.admin})
    userType:EmpolyeeType
    @ApiProperty({
        enum:Sex,
        default:Sex.male,
        description:'用户性别'
    })
    @Column({type:'enum',enum:Sex,default:Sex.male})
    sex:Sex
}