/**
 * 返回一个随机的订单id确保不重复
 * @returns number
 */
export const createOrderId = () => {

    const date = new Date();
    const year = date.getFullYear().toString().slice(3)
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString();


    const id = parseInt(year + month + day + Math.trunc(Math.random() * 10000))
    return id
}