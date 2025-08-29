import { AuthService } from "@/app/services/authService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Toast from "react-native-toast-message";

export default function SettingsScreen() {
  const handleLogout = async () => {
    const authService = new AuthService();
    await authService.logout();
    router.replace("/login");
  };

  const navigateTo = (path: string) => {
    if (path === "toast") {
      Toast.show({
        type: "success",
        text1: "Changed to Dark Mode",
        text2: "This is toast notification 👋",
      });
    } else {
      router.push(path);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons size={28} name="arrow-back-outline" color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Settings
        </Text>
        <View style={{ width: 25 }}></View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("/(tabs)/Settings/ChangeProfile")}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
          <Ionicons name="person-add" size={28} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 8 }]}>Profile Settings</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("/(tabs)/Settings/Platforms")}
      >
        <Ionicons name="apps" size={32} color="#fff"/>
        <View style={{ position: "absolute", left: 48, flexDirection: "row", alignItems: "center" }}>

          <Text style={[styles.buttonText, { marginLeft: 12 }]}>Connected Platforms</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("/(tabs)/Settings/Notifications")}
      ><Ionicons name="notifications" size={32} color="#fff"/>
      <View style={{ position: "absolute", left: 48, flexDirection: "row", alignItems: "center" }}>

        <Text style={[styles.buttonText, { marginLeft: 12 }]}>Notifications</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("/(tabs)/Settings/Privacy")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="privacy-tip" size={32} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 12 }]}>Privacy Policy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("/(tabs)/Settings/AboutApp")}
      ><Ionicons name="information-circle-outline" size={32} color="#fff"/>
        <View style={{ position: "absolute", left: 48, flexDirection: "row", alignItems: "center" }}>

        <Text style={[styles.buttonText, { marginLeft: 12 }]}>About App</Text>
      </View>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo("toast")}
      >
      <MaterialCommunityIcons name="theme-light-dark" size={32} color="#fff" />
       <View style={{ position: "absolute", left: 48, flexDirection: "row", alignItems: "center" }}>

        <Text style={[styles.buttonText, { marginLeft: 12 }]}>Dark Mode</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.RedButton]}
        onPress={handleLogout}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Ionicons name="log-out-outline" size={32} color="#fff" />
          <Text style={[styles.buttonText, { marginLeft: 8 }]}>
            Log out of the app
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1F90FF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    textAlign: "left",
  },
  RedButton: { backgroundColor: "#ff4d4d", alignItems: "center" },
});
