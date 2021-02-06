import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect } from "react"
import { StyleSheet, Switch, useColorScheme, View } from "react-native"
import { Text } from "react-native-elements"
import { useRecoilState } from "recoil"
import { AppHeader, BodyView } from "../components"
import { settingsAtom } from "../recoil/settingsState"

export const SettingsScreen = () => {
  const colorScheme = useColorScheme()
  const [settings, setSettings] = useRecoilState(settingsAtom)

  const handleSettingsChange = async () => {
    await AsyncStorage.setItem("@settings", JSON.stringify(settings))
  }

  useEffect(() => {
    handleSettingsChange()
  }, [settings])

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
            value={settings.enableReverse}
            onValueChange={() =>
              setSettings((prev) => ({
                ...prev,
                enableReverse: !prev.enableReverse,
              }))
            }
          />
        </View>
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
