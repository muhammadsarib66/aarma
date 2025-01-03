import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
// export const baseUrl = "http://192.168.100.19:3002/";
export const baseUrl = "https://aarmaapis.veriorinc.com/";

export const userData = JSON.parse(sessionStorage.getItem('arma-user') || '{}');
export const token = sessionStorage.getItem("arma-event-token");
console.log( userData)
export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

 export const socket = io(baseUrl);

const initialState = {
  testValue: 1,
  isLoading: false,
  isError: false,
  Incprogress: 16.6,
  isModalOpen: false,
  SignUpData: "",
  ImageFilterOpen: false,
};

const Slicer = createSlice({
  name: "slicer",
  initialState,
  reducers: {
    setValPrev: (state, action) => {
      state.testValue = state.testValue - 1;
      console.log(action.payload);
      console.log(state.testValue);
    },
    setSaveNext: (state, action) => {
      if (state.Incprogress >= 100) {
        state.Incprogress = 16.6;
        state.testValue = 1;
      }
      if (action.payload) {
        state.testValue = state.testValue + 1;
        state.Incprogress = state.Incprogress + action.payload;
        console.log(state.Incprogress);
      }
    },
    setIsModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setIsModelClose: (state) => {
      state.isModalOpen = false;
    },
    setSignUpForm: (state, action) => {
      state.SignUpData = action.payload;
    },
    setIsImageFilterOpen: (state,action) => {
      state.ImageFilterOpen = action.payload;
    }
  },
});

export const {
  setSaveNext,
  setValPrev,
  setIsModalOpen,
  setIsModelClose,
  setSignUpForm,
  setIsImageFilterOpen
} = Slicer.actions;
export default Slicer.reducer;




