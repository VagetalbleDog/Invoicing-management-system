import { Injectable } from '@nestjs/common';
import { EmployeeEntity,Sex,EmpolyeeType } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeEntity:Repository<EmployeeEntity>
    ){}
    /**
     * 查询所有用户,支持传参 name id username 不传参则查询所有
     * @returns Promise<EmployeeEntity[]>
     */
    async find(name:string|undefined,username:string|undefined,id:number|undefined):Promise<EmployeeEntity[]>{
        return this.employeeEntity.findBy({"name":name,"username":username,"id":id});
    }
}
