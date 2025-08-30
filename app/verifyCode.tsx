import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerificationScreen() {
  const [code, setCode] = useState("");
  const { email } = useLocalSearchParams();

  const handleVerify = async () => {
    if (!code || !email) {
      Alert.alert("Error", "Please enter verification code and email.");
      return;
    }

    try {
      const response = await fetch(
        "https://51b1b8bea150.ngrok-free.app/api/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            verification_code: code,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Alert.alert("Success", "Email verified successfully.");
        router.push("/(tabs)");
      } else {
        Alert.alert("Error", data.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      Alert.alert("Error", "Failed to verify. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./assets/images/TriathlonForgeLogo.png")}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>Enter Verification Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter code"
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
        placeholderTextColor="#888"
        autoFocus
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "600",
    color: "#000",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#a6a6a6",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#0077b3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: "hidden", // ovo čini sliku okruglom
    marginBottom: 40,
    alignSelf: "center",
    backgroundColor: "#fff", // ili neko shadow rešenje
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});
