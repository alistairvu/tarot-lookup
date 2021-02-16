import { createSlice } from "@reduxjs/toolkit"

const tarotSlice = createSlice({
  name: "tarot",
  initialState: {
    enableReverse: false,
  },

  reducers: {
    flipReverse: (state) => ({
      ...state,
      enableReverse: !state.enableReverse,
    }),
  },
})

const { actions, reducer: settingsReducer } = tarotSlice
export const { flipReverse } = actions
export default settingsReducer
