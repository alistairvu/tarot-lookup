import React, { useEffect, useState } from "react"
import { SearchBar } from "react-native-elements"
import {
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  View,
} from "react-native"
import { Text } from "react-native-elements"
import axios from "axios"
import { AppHeader, BodyView, SearchResult } from "../components"
import { useTarot } from "../hooks/useTarot"

export const SearchHome = () => {
  const [term, setTerm] = useState<string>("")
  const [results, setResults] = useState<Array<any>>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const colorScheme = useColorScheme()
  const { searchCards } = useTarot()

  const getResults = (term: string) => {
    const cards = searchCards(term)
    const cardData = cards.map((item: any) => ({
      shortName: item.name_short,
      imageLink: item.image,
      name: item.name,
      type:
        item.suit === undefined
          ? "Major Arcana"
          : "Minor Arcana - " +
            item.suit.charAt(0).toUpperCase() +
            item.suit.slice(1),
    }))
    setResults(cardData)
    setLoaded(true)
  }

  useEffect(() => {
    setLoaded(false)
    const debouncer = setTimeout(() => getResults(term), 300)
    return () => clearTimeout(debouncer)
  }, [term])

  return (
    <BodyView>
      <AppHeader text="Browse Cards" />
      <SearchBar
        platform={"ios"}
        inputStyle={{ color: colorScheme === "dark" ? "white" : "#222222" }}
        inputContainerStyle={{
          height: 30,
          backgroundColor: colorScheme === "dark" ? "#2a2a2a" : "#e3e3e7",
          borderBottomColor: colorScheme === "dark" ? "#1c1b1d" : "#f0f0f0",
        }}
        placeholder={"Search..."}
        value={term}
        onChangeText={(val) => setTerm(val)}
        containerStyle={{
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
        cancelButtonProps={{
          buttonTextStyle: {
            color: colorScheme === "dark" ? "white" : "#222222",
          },
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {loaded ? (
          <ScrollView>
            {results.length > 0 ? (
              results!.map((item, index) => (
                <SearchResult key={`${item}${index}`} {...item} />
              ))
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Text
                  h4
                  style={{
                    color: colorScheme === "dark" ? "white" : "#222222",
                  }}
                >
                  No results.
                </Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        )}
      </KeyboardAvoidingView>
    </BodyView>
  )
}
