import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons size={28} name="arrow-back-outline" color="#000" />
      </TouchableOpacity>
      <Text style={{ fontSize: 18 }}>
        <Ionicons name="person" size={32} color="#000" /> Dobrodošao na Stranicu
        gde se nalazi Privacy Policy
      </Text>
    </View>
  );
}
