import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SearchHome } from "./SearchHome"
import { ResultsScreen } from "./ResultsScreen"

const Stack = createStackNavigator()

export const SearchScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={SearchHome} />
      <Stack.Screen name="Result" component={ResultsScreen} />
    </Stack.Navigator>
  )
}
