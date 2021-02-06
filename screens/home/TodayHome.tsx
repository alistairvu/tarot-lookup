import React, { useEffect, useState } from "react"
import { useTarot } from "../../hooks/useTarot"
import { Text } from "react-native-elements"
import { View, StyleSheet, Dimensions, useColorScheme } from "react-native"
import { Button } from "react-native-elements"
import { FontAwesome5 } from "@expo/vector-icons"
import { AppHeader, BodyView, HomeBody } from "../../components"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const TodayHome = () => {
  const [pressed, setPressed] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [shortName, setShortName] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [image, setImage] = useState()
  const [reverse, setReverse] = useState<boolean>()
  const { drawCard } = useTarot()
  const colorScheme = useColorScheme()

  const checkDrawn = async () => {
    try {
      const value = await AsyncStorage.getItem("@last_drawn")
      if (value === null || JSON.parse(value).drawnImage === undefined) {
        setPressed(false)
        return
      }
      const {
        dateString,
        drawnName,
        drawnShortName,
        drawnReverse,
        drawnImage,
      } = JSON.parse(value)
      if (
        new Date(dateString).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        setName(drawnName)
        setShortName(drawnShortName)
        setReverse(drawnReverse)
        setImage(drawnImage)
        setPressed(true)
        setLoaded(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkDrawn()
  }, [])

  const handlePress = async () => {
    setPressed(true)
    setLoaded(false)
    setTimeout(async () => {
      const { card, reversed } = drawCard()
      console.log(card)
      const { name, name_short, image } = card
      setName(name)
      setShortName(name_short)
      setImage(image)
      setReverse(reversed)
      await AsyncStorage.setItem(
        "@last_drawn",
        JSON.stringify({
          dateString: new Date().toDateString(),
          drawnName: name,
          drawnShortName: name_short,
          drawnReverse: reversed,
          drawnImage: image,
        })
      )
      setLoaded(true)
    }, 500)
  }

  return (
    <BodyView>
      <AppHeader text="My Day" />

      {pressed ? (
        <HomeBody
          loaded={loaded}
          image={image}
          name={name}
          shortName={shortName}
          reverse={reverse}
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
