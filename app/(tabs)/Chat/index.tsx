import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Selection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 24, marginBottom: 24 },
});

export default ChatPage;
