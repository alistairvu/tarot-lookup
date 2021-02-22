import React, { useEffect, useState } from "react"
import { useTarot } from "../../hooks/useTarot"
import { Text } from "react-native-elements"
import { View, StyleSheet, Dimensions, useColorScheme } from "react-native"
import { Button } from "react-native-elements"
import { FontAwesome5 } from "@expo/vector-icons"
import { AppHeader, BodyView, HomeBody } from "../../components"
import useTarotHistory from "../../zustand/useTarotHistory"

interface CardInterface {
  name: string
  shortName: string
  reverse: boolean
  image: string
}

export const TodayHome = () => {
  const [pressed, setPressed] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [todayCard, setTodayCard] = useState<CardInterface>()

  const { card, lastDraw, recordCardDraw } = useTarotHistory((state) => ({
    card: state.card,
    lastDraw: state.lastDraw,
    recordCardDraw: state.recordCardDraw,
  }))

  const { drawCard } = useTarot()
  const colorScheme = useColorScheme()

  const checkDrawn = () => {
    try {
      if (!card.name || card.name.length <= 0) {
        setPressed(false)
        setLoaded(false)
        return
      }
      if (
        new Date(lastDraw).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        setTodayCard(card)
        setPressed(true)
        setLoaded(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkDrawn()
  }, [card])

  const handlePress = () => {
    setPressed(true)
    setLoaded(false)
    setTimeout(() => {
      const { card, reversed } = drawCard()
      const drawnCard = {
        name: card.name,
        shortName: card.name_short,
        image: card.image,
        reverse: reversed,
      }
      setTodayCard(drawnCard)
      recordCardDraw({ card: drawnCard, lastDraw: Date.now() })
      setLoaded(true)
    }, 500)
  }

  return (
    <BodyView>
      <AppHeader text="My Day" />

      {pressed ? (
        <HomeBody
          loaded={loaded}
          image={todayCard?.image}
          name={todayCard?.name || ""}
          shortName={todayCard?.shortName || ""}
          reverse={todayCard?.reverse}
        />
      ) : (
        <View style={styles.innerContainer}>
          <View style={styles.blankContainer}>
            <FontAwesome5
              name="question"
              size={100}
              color={colorScheme === "dark" ? "white" : "#222222"}
            />
          </View>
          <Text
            h4
            style={{
              ...styles.h4Text,
              color: colorScheme === "dark" ? "white" : "#222222",
            }}
          >
            Draw today's card.
          </Text>
          <Button
            title="Draw a Card"
            buttonStyle={{
              ...styles.button,
              backgroundColor: colorScheme === "dark" ? "white" : "#222222",
            }}
            containerStyle={{ padding: 10 }}
            titleStyle={{
              fontWeight: "600",
              color: colorScheme === "dark" ? "#222222" : "white",
            }}
            onPress={handlePress}
          />
        </View>
      )}
    </BodyView>
  )
}

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flex: 1,
  },
  blankContainer: {
    width:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.9,
    height:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.9,
    height:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.9,
    resizeMode: "contain",
  },
  h4Text: {
    fontWeight: "600",
    padding: 20,
  },
  button: {
    width:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.9,
    height: 50,
    borderRadius: 10,
  },
})
