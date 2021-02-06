import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ResultsScreen } from "./ResultsScreen"
import { TodayHome } from "./home/TodayHome"
import { Dimensions } from "react-native"

const Stack = createStackNavigator()

export const TodayScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={TodayHome} />
      <Stack.Screen
        name="Result"
        component={ResultsScreen}
        options={{
          gestureResponseDistance: {
            horizontal: Dimensions.get("window").width,
          },
        }}
      />
    </Stack.Navigator>
  )
}
