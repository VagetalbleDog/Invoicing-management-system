import { Column,Entity,PrimaryGeneratedColumn } from 'typeorm'
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
    @PrimaryGeneratedColumn()
    id:number
    @Column({type:'varchar',length:20})
    username:string
    @Column({type:'varchar',length:10})
    name:string
    @Column({type:'varchar',length:25})
    password:string
    @Column({type:'enum',enum:EmpolyeeType,default:EmpolyeeType.admin})
    userType:EmpolyeeType
    @Column({type:'enum',enum:Sex,default:Sex.male})
    sex:Sex
}