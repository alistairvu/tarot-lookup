import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import settingsReducer from "./settingsSlice"
import todayTarotReducer from "./todayTarotSlice"

const rootReducer = combineReducers({
  todayTarot: todayTarotReducer,
  settings: settingsReducer,
})

const persistConfig = {
  key: "@tarot_persist",
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

let persistor = persistStore(store)
type rootState = ReturnType<typeof store.getState>
export { store, persistor, rootState }
