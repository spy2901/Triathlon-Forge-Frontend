import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Redirect, Tabs, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Check if the user is logged in
  // If not, redirect them to the login page
  // This happens only once, when the component mounts
  // and when the user state changes
  // This is useful to prevent the user from seeing the app’s content
  // if they are not logged in, and to immediately redirect them to the login page
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // if not logged in, redirect to login page
    }
  }, [user, loading, router]);

  // If the user is loading, show a loading indicator
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!user) {
    return <Redirect href="/login" />; // if not logged in, redirect to login page
  }

  return (
    <>
      <Tabs
        screenOptions={{
          header: () => <Header />, // <<=== GLobal header component
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarActiveTintColor: "#f4f4f4", // Color of the active tab icon
          tabBarInactiveTintColor: "#868686", // Color of the inactive tab icon
          tabBarStyle: {
            backgroundColor: "#0077B3", // Nav bar background color
            borderTopLeftRadius: 10, // Border radius Top left
            borderTopRightRadius: 10, // Border radius Top right
            overflow: "hidden", // Overflow hidden to apply border radius
            position: "absolute", // Position absolute to stay on top of the content
          },
        }}
      >
        {/* // Define tab for home Screen */}
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={28} color={color} />
            ),
          }}
        />
        {/* Define tab for chat Screen */}
        <Tabs.Screen
          name="Chat/index"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="chatbubble" color={color} />
            ),
          }}
        />
        {/* Define tab for calendar Screen */}
        <Tabs.Screen
          name="Calendar/index"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="calendar" color={color} />
            ),
          }}
        />
        {/* Define tab for calculators Screen */}
        <Tabs.Screen
          name="Calculators/index"
          options={{
            title: "Calculator",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="calculator" color={color} />
            ),
          }}
        />
        {/* Define tab for profile Screen */}
        <Tabs.Screen
          name="Profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="person" color={color} />
            ),
          }}
        />
        {/* Define tab for settings Screen that is not vissible */}
        <Tabs.Screen
          name="Settings"
          options={{
            headerShadowVisible: false,
            href: null,
            tabBarStyle: { display: "none" },
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="settings-sharp" color={color} />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
