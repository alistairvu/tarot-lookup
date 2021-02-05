import React from "react"
import { StyleSheet, Text, useColorScheme, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RecoilRoot } from "recoil"
import { NavigationContainer } from "@react-navigation/native"
import { SearchScreen, TodayScreen } from "./screens"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Today"
          tabBarOptions={{
            activeTintColor: colorScheme === "dark" ? "#ffffff" : "#222",
            style: {
              backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
              borderTopColor: colorScheme === "dark" ? "#1c1b1d" : "#f0f0f0",
            },
          }}
        >
          <Tab.Screen
            name="Today"
            component={TodayScreen}
            options={{
              tabBarIcon: ({ focused, color }) =>
                focused ? (
                  <Ionicons name="sunny-sharp" size={24} color={color} />
                ) : (
                  <Ionicons name="sunny-outline" size={24} color={color} />
                ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ focused, color }) =>
                focused ? (
                  <Ionicons name="search-sharp" size={24} color={color} />
                ) : (
                  <Ionicons name="search-outline" size={24} color={color} />
                ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
