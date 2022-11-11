import { Injectable } from '@nestjs/common';
import { SupplierEntity } from './supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(SupplierEntity)
        private readonly shopRepository:Repository<SupplierEntity>
    ){}
    /**
     * 查询供应商信息 以及商品信息
     */
    async find(supplierName:string|undefined,id:number|undefined){
        return this.shopRepository.find({relations:["saleShops"],where:{'supplierName':supplierName,"id":id}})
    }
}
