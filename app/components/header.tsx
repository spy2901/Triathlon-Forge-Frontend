import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => router.push("/Profile")}
        >
          <Image
            source={require("../assets/images/TriathlonForgeLogo.png")}
            resizeMode="contain"
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => router.push("/(tabs)/Settings")}
        >
          <Ionicons size={28} name="settings-sharp" color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#0077B3",
  },
  container: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
    marginTop: 10,
  },
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: "50%",
  },
  settingsIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    transform: [{ translateY: 15 }],
  },
});
