export const switchUserTypeToString = (userType:number)=>{
    switch (userType){
        case 1:
            return 'admin';
        case 2:
            return 'purchase';
        case 3:
            return 'sale';
    }
}