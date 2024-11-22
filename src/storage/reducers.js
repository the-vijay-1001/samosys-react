import { createSlice } from "@reduxjs/toolkit";

const counterSlicr = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByState: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { increment, decrement, incrementByState } = counterSlicr.actions;
export default counterSlicr.reducer;