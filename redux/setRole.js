import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: "guest",
    role: "",
}
export const setUserInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setRole: (state, action) =>{
            state.role = action.payload;
        }
    }
});
export const {setUser, setRole} = setUserInfo.actions;
export default setUserInfo.reducer;