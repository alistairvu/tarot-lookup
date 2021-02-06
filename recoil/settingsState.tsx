import { atom } from "recoil"

export const settingsAtom = atom({
  key: "settings",
  default: {
    enableReverse: false,
  },
})
