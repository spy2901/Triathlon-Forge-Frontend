import { Tabs } from "expo-router";

export default function ActivityLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // možeš i da ugasiš header ako želiš
        tabBarStyle: { display: "none" }, // 🚀 sakriva tab bar
      }}
    />
  );
}
