import AsyncStorage from "@react-native-async-storage/async-storage"
import create, { State } from "zustand"
import { persist } from "zustand/middleware"

export interface SettingsState extends State {
  enableReverse: boolean
  flipReverse: () => void
}

const useSettings = create<SettingsState>(
  persist(
    (set) => ({
      enableReverse: false,
      flipReverse: () =>
        set((state) => ({ enableReverse: !state.enableReverse })),
    }),
    { name: "tarot_settings", getStorage: () => AsyncStorage }
  )
)

export default useSettings
