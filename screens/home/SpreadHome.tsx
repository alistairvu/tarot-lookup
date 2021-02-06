import React, { useState, useEffect } from "react"
import { View, StyleSheet, useColorScheme, Dimensions } from "react-native"
import { Button, Text } from "react-native-elements"
import { BodyView, AppHeader } from "../../components"
import { SpreadCardContainer } from "../../components/SpreadCardContainer"
import { useTarot } from "../../hooks/useTarot"

export const SpreadHome = () => {
  const [cards, setCards] = useState(Array(3))
  const [drawn, setDrawn] = useState(0)
  const [command, setCommand] = useState("Draw your first card.")
  const [buttonText, setButtonText] = useState("Draw a Card")
  const colorScheme = useColorScheme()
  const { drawCard } = useTarot()

  const spreadText = ["Past", "Present", "Future"]

  const reset = () => {
    setCards(Array(3))
    setDrawn(0)
    setCommand("Draw your first card.")
    setButtonText("Draw a Card")
  }

  const handlePress = () => {
    if (drawn === 3) {
      reset()
      return
    }

    const { card, reversed } = drawCard()
    const newCard = {
      name: card.name,
      shortName: card.name_short,
      image: card.image,
      reverse: reversed,
    }
    setCards((prev) => {
      const prevCards = [...prev]
      prevCards[drawn] = newCard
      return prevCards
    })
    setDrawn((prev) => prev + 1)
  }

  useEffect(() => {
    switch (drawn) {
      case 0:
        setCommand("Draw your first card.")
        setButtonText("Draw a Card")
        break
      case 1:
        setCommand("Draw your next card.")
        setButtonText("Draw a Card")
        break
      case 2:
        setCommand("Draw your last card.")
        setButtonText("Draw a Card")
        break
      case 3:
        setCommand("Tap on each card to learn more.")
        setButtonText("Draw another Spread")
        break
    }
  }, [drawn])

  return (
    <BodyView>
      <AppHeader text="Three Card Spread" />

      <View style={styles.container}>
        <View style={styles.spreadContainer}>
          {drawn === 0
            ? spreadText.map((item) => (
                <SpreadCardContainer key={item} card={undefined} title={item} />
              ))
            : cards.map((item, index) => (
                <SpreadCardContainer
                  key={index}
                  card={item}
                  title={spreadText[index]}
                />
              ))}
        </View>

        <View style={styles.commandContainer}>
          <Text
            h4
            style={{
              ...styles.text,
              color: colorScheme === "dark" ? "white" : "#222222",
            }}
          >
            {command}
          </Text>
          <Button
            title={buttonText}
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
      </View>
    </BodyView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spreadContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
    padding: 10,
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
  commandContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
})
