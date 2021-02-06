import { useNavigation } from "@react-navigation/native"
import React from "react"
import {
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
  ActivityIndicator,
} from "react-native"
import { Text, Image } from "react-native-elements"

interface SearchResultInterface {
  shortName: string
  imageLink: any
  name: string
  type: string
}

export const SearchResult = ({
  imageLink,
  shortName,
  name,
  type,
}: SearchResultInterface) => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: colorScheme === "dark" ? "#1c1b1d" : "#f0f0f0",
        borderBottomColor: colorScheme === "dark" ? "#272628" : "#dfdfe3",
      }}
      onPress={() =>
        navigation.navigate("Result", {
          shortName,
          name,
        })
      }
    >
      <Image
        source={imageLink}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            ...styles.name,
            color: colorScheme === "dark" ? "white" : "#222222",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            ...styles.type,
            color: colorScheme === "dark" ? "white" : "#222222",
          }}
        >
          {type}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "600",
    fontSize: 20,
  },
  type: {
    fontSize: 15,
  },
})
