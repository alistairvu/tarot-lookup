import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ResultsScreen } from "./ResultsScreen"
import { Dimensions } from "react-native"
import { SpreadHome } from "./home/SpreadHome"

const Stack = createStackNavigator()

export const SpreadScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={SpreadHome} />
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
