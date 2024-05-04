import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  customOfferMessage : {}
}

export const ChatSlicer = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setCustomOfferMessage: (state, action) => {
    
      state.customOfferMessage =  action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setCustomOfferMessage  } = ChatSlicer.actions

export default ChatSlicer.reducer