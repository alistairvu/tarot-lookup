import React from "react"
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import {
  SearchScreen,
  SettingsScreen,
  SpreadScreen,
  TodayScreen,
} from "./screens"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

export default function App() {
  const colorScheme = useColorScheme()

  return (
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
          name="Spread"
          component={SpreadScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <MaterialCommunityIcons name="cards" size={24} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name="cards-outline"
                  size={24}
                  color={color}
                />
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
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="ios-settings-sharp" size={24} color={color} />
              ) : (
                <Ionicons name="ios-settings-outline" size={24} color={color} />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
