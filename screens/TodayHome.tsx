import React, { useState } from "react"
import { Image, Text } from "react-native-elements"
import {
  View,
  StyleSheet,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
} from "react-native"
import { Button } from "react-native-elements"
import { FontAwesome5 } from "@expo/vector-icons"
import { AppHeader, BodyView } from "../components"
import axios from "axios"
import { useNavigation } from "@react-navigation/native"

export const TodayHome = () => {
  const [pressed, setPressed] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [shortName, setShortName] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [reverse, setReverse] = useState<boolean>()
  const navigation = useNavigation()
  const colorScheme = useColorScheme()

  const handlePress = async () => {
    setPressed(true)
    setLoaded(false)
    const res = await axios.get(
      "https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1"
    )
    const { cards } = res.data
    const { name, name_short } = cards[0]
    setName(name)
    setReverse(Math.random() > 0.5)
    setShortName(name_short)
    setLoaded(true)
  }

  const generateBody = () =>
    loaded ? (
      <View style={styles.innerContainer}>
        <Image
          source={{
            uri: `https://tarot-photo-api.herokuapp.com/images/${shortName}`,
          }}
          style={{
            ...styles.image,
            transform: reverse ? [{ rotate: "180deg" }] : [],
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text
          h4
          style={{
            ...styles.h4Text,
            textAlign: "center",
            color: colorScheme === "dark" ? "white" : "#222222",
          }}
        >
          Your card is {"\n" + name} {reverse && "(Reversed)"}
        </Text>
        <Button
          title="Explore this Card"
          buttonStyle={{
            ...styles.button,
            backgroundColor: colorScheme === "dark" ? "white" : "#222222",
          }}
          containerStyle={{ padding: 10 }}
          titleStyle={{
            fontWeight: "600",
            color: colorScheme === "dark" ? "#222222" : "white",
          }}
          onPress={() => navigation.navigate("Result", { shortName, name })}
        />
      </View>
    ) : (
      <View style={styles.innerContainer}>
        <ActivityIndicator />
      </View>
    )

  return (
    <BodyView>
      <AppHeader text="My Day" />

      {pressed ? (
        generateBody()
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
            Draw your next card.
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
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    resizeMode: "contain",
  },
  h4Text: {
    fontWeight: "600",
    padding: 20,
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 10,
  },
})
