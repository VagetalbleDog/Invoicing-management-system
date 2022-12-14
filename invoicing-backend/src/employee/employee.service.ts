import { Injectable } from '@nestjs/common';
import { EmployeeEntity, Sex, EmpolyeeType } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeEntity: Repository<EmployeeEntity>
    ) { }
    /**
     * 查询所有用户,支持传参 name id username 不传参则查询所有
     * @returns Promise<EmployeeEntity[]>
     */
    async find(name: string | undefined, username: string | undefined, id: number | undefined, userType: number | undefined): Promise<EmployeeEntity[]> {
        return this.employeeEntity.findBy({ "name": name, "username": username, "id": id, "userType": userType });
    }
    /**
     * 注册用户，需要给出所有用户信息
     * dto:EmployeeEntity
     * @return Promise<void>
     */
    async regsiterUser(user: EmployeeEntity) {
        return this.employeeEntity.insert(user)
    }
    /**
     * 删除用户，传入id
     * @return promise<void>
     */
    async deleteUser(id: number) {
        return this.employeeEntity.delete({ 'id': id })
    }
    /**
     * 
     * @param id 
     * @param username 
     * @param name 
     * @param sex 
     * @param userType 
     * @param password 
     * @return Promise<void>
     */
    async updateUser(id: number, username: string, name: string, sex: number, userType: number, password: string) {
        this.employeeEntity.update({ id: id }, { username, name, sex, userType, password })
    }
}
