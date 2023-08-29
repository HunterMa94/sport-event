// 引入createStore, 专门用于创建redux中最核心的store对象
import { createStore } from "redux";
import userReducer from "./reducer"

export default createStore(userReducer)