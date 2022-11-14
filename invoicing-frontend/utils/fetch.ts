import { message } from "antd";
enum Methods{
    GET=1,
    POST=2
}
const Fetch = (url:string,token?:string,body?:any,method:Methods=1)=>{
    if(method===1){
        return fetch(url,{
            headers:new Headers({
                'Authorization':`Bearer ${token}`,
                'Content-type':'application/json'
            }),
        }).then(res=>{
            if(res.status>=200&&res.status<400){
                return res.json();
            }else{
                message.error('请求失败')
            }
        })
    }else{
        return fetch(url,{
            headers:new Headers({
                'Authorization':`Bearer ${token}`,
                'Content-type':'application/json'
            }),
            method:'POST',
            body:JSON.stringify(body)
        }).then(res=>{
            if(res.status>=200&&res.status<400){
                return res.json();
            }else{
                message.error('请求失败')
            }
        })
    }
}
export default Fetch