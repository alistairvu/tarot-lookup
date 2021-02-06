import React from "react"
import {
  View,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  Dimensions,
} from "react-native"
import { Image, Text, Button } from "react-native-elements"
import { useTarot } from "../hooks/useTarot"

interface HomeBodyProps {
  loaded: boolean
  image: any
  reverse: boolean | undefined
  name: string
  shortName: string
}

export const HomeBody = ({
  loaded,
  image,
  reverse,
  name,
  shortName,
}: HomeBodyProps) => {
  const colorScheme = useColorScheme()
  const { goToResult } = useTarot()

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image
        source={image!}
        style={{
          ...styles.image,
          transform: reverse ? [{ rotate: "180deg" }] : [],
        }}
        PlaceholderContent={<ActivityIndicator />}
        onPress={() => goToResult(name, shortName)}
      />
      <Text
        h4
        style={{
          ...styles.h4Text,
          textAlign: "center",
          color: colorScheme === "dark" ? "white" : "#222222",
        }}
      >
        Today's card is {"\n" + name} {reverse && "(Reversed)"}
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
        onPress={() => goToResult(name, shortName)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flex: 1,
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
