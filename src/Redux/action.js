/* 
该文件专门为count组件生成action对象
*/
import { USERLOGIN, USERLOGOUT } from "./constant";

// 同步action  返回值是对象
export const createLoginAction = (data) => ({ type: USERLOGIN, data })
export const createLogoutAction = (data) => ({ type: USERLOGOUT, data })
