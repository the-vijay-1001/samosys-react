import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user: [] },
    reducers: {
        insert: (state, action) => {
            state.user.push(action.payload)
        }
    }
})

export const { insert } = userSlice.actions;
export default userSlice.reducer;