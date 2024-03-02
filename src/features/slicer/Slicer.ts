import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testValue: 1,
  isLoading: false,
  isError: false,
  Incprogress : 10
};

const Slicer = createSlice({
  name: "slicer",
  initialState,
  reducers: {
    setSaveNext: (state, action) => {
      if( state.Incprogress >= 60){
        state.Incprogress = 10;
      }

      state.Incprogress =  state.Incprogress + action.payload;
      console.log(state.Incprogress)
    },
  },
});

export const { setSaveNext } = Slicer.actions;
export default Slicer.reducer;
