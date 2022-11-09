import { Injectable } from '@nestjs/common';
import { ShopEntity,ShopType } from './shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepository:Repository<ShopEntity>
    ){}

    /**
     * 查询商品信息,支持传参 id shopName shopType 不传参则查询所有
     * @returns Promise<EmployeeEntity[]>
     */
     async find(shopName:string|undefined,shopType:number|undefined,id:number|undefined):Promise<ShopEntity[]>{
        return this.shopRepository.findBy({"shopName":shopName,"shopType":shopType,"id":id});
    }

    /**
     * 进货,需要调用订单服务产生订单
     * @Params shopId:购入商品Id num:购入数量 suppiler:供应商 employee:操作人员
     * @returns Order
     */

    async purcase(shopId:number,num:number,/*供应商*/employeeId:number){
        //生成订单服务


        //修改数据库中的存量
        let nowNum = (await this.shopRepository.find({where:{'id':shopId}}))[0].remainder;
        nowNum += num;
        await this.shopRepository.update({'id':shopId},{'remainder':nowNum});

        //返回订单信息
    }


    /**
     * 售货,需要调用订单服务产生订单
     * @Params shopId:卖出商品id num:卖出数量 employee:操作人
     * @returns Order
     */

    async sale(shopId:number,num:number,employeeId:number){
        //修改数据库中的存量
        let nowNum = (await this.shopRepository.find({where:{'id':shopId}}))[0].remainder;
        nowNum -= num;
        if(nowNum<0){
            return {
                code:'400',
                message:'存量不足购买失败'
            }
        }
        await this.shopRepository.update({'id':shopId},{'remainder':nowNum});
        //生成订单服务

        //返回订单信息
    }
}
