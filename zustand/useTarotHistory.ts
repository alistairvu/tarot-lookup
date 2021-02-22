import create, { State } from "zustand"
import { persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface CardInterface {
  name: string
  shortName: string
  reverse: boolean
  image: string
}

interface HistoryRecord {
  card: CardInterface
  lastDraw: number
}

interface TarotHistoryInterface extends State {
  card: CardInterface
  lastDraw: number
  recordCardDraw: (record: HistoryRecord) => void
  resetCards: () => void
}

const initialState = {
  card: {} as CardInterface,
  lastDraw: Date.now(),
}

const useTarotHistory = create<TarotHistoryInterface>(
  persist(
    (set) => ({
      ...initialState,

      recordCardDraw: (newData: any) => set(newData),
      resetCards: () => set(initialState),
    }),
    {
      name: "tarot_history",
      getStorage: () => AsyncStorage,
    }
  )
)

export default useTarotHistory
