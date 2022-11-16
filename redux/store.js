import { configureStore } from "@reduxjs/toolkit";
import setUserInfoReducer  from "./setRole";

export const store = configureStore({
    reducer: {
        userInfo: setUserInfoReducer,
    }
})