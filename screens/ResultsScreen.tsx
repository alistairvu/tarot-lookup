import React, { useState, useEffect } from "react"
import { Image, Text } from "react-native-elements"
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  useColorScheme,
} from "react-native"
import axios from "axios"
import { AppHeader, BodyView } from "../components"
import { useRoute } from "@react-navigation/native"

interface CardData {
  upMeaning: string
  revMeaning: string
  description: string
}

export const ResultsScreen = () => {
  const colorScheme = useColorScheme()
  const [displayData, setDisplayData] = useState<CardData>()
  const [loaded, setLoaded] = useState<boolean>(false)
  const route = useRoute<any>()

  const fetchData = async () => {
    const res = await axios.get(
      `https://rws-cards-api.herokuapp.com/api/v1/cards/${route.params.shortName}`
    )
    const { card } = res.data
    const { meaning_up, meaning_rev, desc } = card
    setDisplayData({
      upMeaning: meaning_up,
      revMeaning: meaning_rev,
      description: desc,
    })
    setLoaded(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BodyView>
      <AppHeader text={route.params.name || "Not found"} goBack />
      <View style={{ flex: 1 }}>
        {loaded ? (
          <ScrollView contentContainerStyle={styles.container}>
            <Image
              source={{
                uri: `https://tarot-photo-api.herokuapp.com/images/${route.params.shortName}`,
              }}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.section}>
              <Text
                h4
                style={{
                  ...styles.sectionTitle,
                  color: colorScheme === "dark" ? "white" : "#222222",
                }}
              >
                MEANING
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: colorScheme === "dark" ? "white" : "#222222",
                }}
              >
                {displayData?.upMeaning}
              </Text>
            </View>
            <View style={styles.section}>
              <Text
                h4
                style={{
                  ...styles.sectionTitle,
                  color: colorScheme === "dark" ? "white" : "#222222",
                }}
              >
                REVERSE MEANING
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: colorScheme === "dark" ? "white" : "#222222",
                }}
              >
                {displayData?.revMeaning}
              </Text>
            </View>
            <View style={styles.section}>
              <Text
                h4
                style={{
                  ...styles.sectionTitle,
                  color: colorScheme === "dark" ? "white" : "#222222",
                }}
              >
                DESCRIPTION
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: colorScheme === "dark" ? "white" : "#222222",
                }}
              >
                {displayData?.description}
              </Text>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        )}
      </View>
    </BodyView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  container: {
    alignItems: "center",
    padding: 15,
  },
  section: {
    paddingVertical: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "700",
    textAlign: "center",
  },
})
