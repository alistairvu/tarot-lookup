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
import { flipReverse } from "../redux/settingsSlice"
import { useSelector, useDispatch } from "react-redux"
import { rootState } from "../redux"
import { resetCards } from "../redux/todayTarotSlice"

export const SettingsScreen = () => {
  const colorScheme = useColorScheme()
  const dispatch = useDispatch()
  const settings = useSelector((state: rootState) => state.settings)
  const { enableReverse } = settings

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
              dispatch(flipReverse())
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
          onPress={() => dispatch(resetCards())}
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
