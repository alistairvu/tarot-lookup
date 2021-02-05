import React from "react"
import { useColorScheme, View } from "react-native"
import { Header } from "react-native-elements"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

interface AppHeaderProps {
  text: string
  goBack?: boolean
}

export const AppHeader = ({ text, goBack }: AppHeaderProps) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  return (
    <Header
      leftComponent={
        goBack ? (
          <Ionicons
            name="arrow-back"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <View />
        )
      }
      centerComponent={{
        text: text,
        style: {
          color: colorScheme === "dark" ? "white" : "black",
          fontWeight: "600",
          fontSize: 22,
        },
      }}
      containerStyle={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        borderBottomColor: colorScheme === "dark" ? "#1c1b1d" : "#f0f0f0",
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}
    />
  )
}
