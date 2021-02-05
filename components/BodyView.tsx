import React from "react"
import { useColorScheme, View } from "react-native"

interface BodyViewProps {
  children: React.ReactNode
}

export const BodyView = ({ children }: BodyViewProps) => {
  const colorScheme = useColorScheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#1c1b1d" : "#f0f0f0",
      }}
    >
      {children}
    </View>
  )
}
