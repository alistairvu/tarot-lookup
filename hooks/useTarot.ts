import { useNavigation } from "@react-navigation/native"
import { tarotData } from "../assets/data"
import useSettings from "../zustand/useSettings"

export const useTarot = () => {
  const navigation = useNavigation()
  const enableReverse = useSettings((state) => state.enableReverse)

  const drawCard = () => {
    const index = Math.floor(Math.random() * tarotData.cards.length)
    const card = tarotData.cards[index]
    const reversed = enableReverse ? Math.random() > 0.5 : false
    return { card, reversed }
  }

  const findCard = (shortName: string) => {
    const card = tarotData.cards.find((item) => item.name_short === shortName)
    return card
  }

  const searchCards = (query: string) => {
    let results = new Set()
    const processedQuery = query.toLowerCase().trim()
    tarotData.cards
      .filter((item) => item.name.toLowerCase().includes(processedQuery))
      .forEach((item) => results.add(item))
    tarotData.cards
      .filter(
        (item) =>
          item.meaning_rev.toLowerCase().includes(processedQuery) ||
          item.meaning_up.toLowerCase().includes(processedQuery)
      )
      .forEach((item) => results.add(item))
    tarotData.cards
      .filter((item) => item.desc.toLowerCase().includes(processedQuery))
      .forEach((item) => results.add(item))
    return [...results]
  }

  const goToResult = (name: string, shortName: string) => {
    navigation.navigate("Result", {
      name,
      shortName,
    })
  }

  return { drawCard, findCard, searchCards, goToResult }
}
