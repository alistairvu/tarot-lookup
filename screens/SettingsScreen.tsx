import React from "react"
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native"
import { Text } from "react-native-elements"
import { AppHeader, BodyView } from "../components"
import useSettings from "../zustand/useSettings"
import useTarotHistory from "../zustand/useTarotHistory"

export const SettingsScreen = () => {
  const colorScheme = useColorScheme()
  const enableReverse = useSettings((state) => state.enableReverse)
  const flipReverse = useSettings((state) => state.flipReverse)
  const resetCards = useTarotHistory((state) => state.resetCards)

  return (
    <BodyView>
      <AppHeader text="Settings" />

      <View style={styles.section}>
        <View
          style={{
            ...styles.container,
            backgroundColor: colorScheme === "dark" ? "black" : "white",
            borderBottomColor: colorScheme === "dark" ? "#272628" : "#dfdfe3",
            borderTopColor: colorScheme === "dark" ? "#272628" : "#dfdfe3",
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: colorScheme === "dark" ? "white" : "#222222",
            }}
          >
            Enable Reverse Cards
          </Text>
          <Switch
            ios_backgroundColor={colorScheme === "dark" ? "#1c1b1d" : "#f0f0f0"}
            value={enableReverse}
            onValueChange={() => {
              flipReverse()
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.container,
            backgroundColor: colorScheme === "dark" ? "black" : "white",
            borderBottomColor: colorScheme === "dark" ? "#272628" : "#dfdfe3",
            borderTopColor: colorScheme === "dark" ? "#272628" : "#dfdfe3",
          }}
          onPress={() => resetCards()}
        >
          <Text
            style={{
              ...styles.text,
              color: colorScheme === "dark" ? "white" : "#222222",
            }}
          >
            Reset Data
          </Text>
        </TouchableOpacity>
      </View>
    </BodyView>
  )
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
})
