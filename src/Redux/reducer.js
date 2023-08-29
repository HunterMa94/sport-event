/* 
1.该文件适用于创建一个为count组件服务的reducer，reducer的本质就是一个函数
2.reducer函数会接到两个参数，一个是之前的状态，一个是动作对象
*/
import { USERLOGIN, USERLOGOUT } from "./constant";

// 初始化状态
// const initState = false;
export default function userReducer(preState, action) {
    if (preState === undefined) preState = null;
    const { type, data } = action;
    switch (type) {
        case USERLOGIN:
            return data;
        case USERLOGOUT:
            return data;
        default:
            return preState;
    }
}