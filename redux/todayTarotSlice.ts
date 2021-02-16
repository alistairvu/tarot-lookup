import { createSlice } from "@reduxjs/toolkit"

interface CardInterface {
  name: string
  shortName: string
  reverse: boolean
  image: string
}

const initalState = {
  card: {} as CardInterface,
  lastDraw: Date.now(),
}

const tarotSlice = createSlice({
  name: "tarot",
  initialState: {
    card: {} as CardInterface,
    lastDraw: Date.now(),
  },

  reducers: {
    recordCardDraw: (state, action) => action.payload,
    resetCards: () => initalState,
  },
})

const { actions, reducer: tarotReducer } = tarotSlice
export const { recordCardDraw, resetCards } = actions
export default tarotReducer
