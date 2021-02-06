import React from "react"
import {
  View,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { Image, Text } from "react-native-elements"
import { FontAwesome5 } from "@expo/vector-icons"
import { useTarot } from "../hooks/useTarot"

interface Card {
  name: string
  shortName: string
  image: any
  reverse: boolean
}

interface SpreadCardContainerProps {
  card?: Card | undefined
  title: string
}

export const SpreadCardContainer = ({
  card,
  title,
}: SpreadCardContainerProps) => {
  const colorScheme = useColorScheme()
  const { goToResult } = useTarot()

  return (
    <View style={styles.container}>
      {card ? (
        <Image
          source={card.image}
          style={{
            ...styles.image,
            transform: card.reverse ? [{ rotate: "180deg" }] : [],
          }}
          PlaceholderContent={<ActivityIndicator />}
          onPress={() => goToResult(card.name, card.shortName)}
        />
      ) : (
        <View style={styles.blankContainer}>
          <FontAwesome5
            name="question"
            size={75}
            color={colorScheme === "dark" ? "white" : "#222222"}
          />
        </View>
      )}
      <Text
        style={{
          ...styles.text,
          color: colorScheme === "dark" ? "white" : "#222222",
        }}
      >
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    paddingVertical: 5,
    fontSize: 20,
  },
  image: {
    width:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.3,
    height:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.3,
    resizeMode: "contain",
  },
  blankContainer: {
    width:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.3,
    height:
      Math.min(
        Dimensions.get("window").width,
        Dimensions.get("window").height
      ) * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
})
