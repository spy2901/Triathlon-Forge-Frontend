import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthService } from "./services/authService";

const { height: screenHeight } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // Provera da li je neko polje prazno
    if (!email || !password) {
      alert("Please enter Email and Password.");
      return;
    }

    // Osnovna provera validnosti email adrese
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter correct Email address");
      return;
    }
    try {
      const response = await fetch(
        "https://51b1b8bea150.ngrok-free.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const text = await response.text();
      const authService = new AuthService();

      const data = JSON.parse(text);
      // console.log("User data: ", data.user) // ovo mi treba da cuvam
      if (data.success) {
        if (rememberMe) {
          await authService.setUser(data.user);
          console.log("user saved");
        }
        console.log("Login successful");
        router.push("/(tabs)/Home");
        console.log("User data:", data.user);
        console.log("user reditred to /tabs");
      } else {
        alert(`Greška: ${data.message}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Došlo je do greške prilikom logovanja u aplikaciju.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.loginDesign}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("./assets/images/TriathlonForgeLogo.png")}
            resizeMode="cover"
          />
        </View>

        <View style={styles.input01}>
          <Text style={styles.label01Span}>EMAIL</Text>
          <TextInput
            style={styles.textbox01}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.labelSpan}>PASSWORD</Text>
          <TextInput
            style={styles.textbox}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}
          >
            {rememberMe && <View style={styles.checked} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remeber me</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}>
            Don’t have an account? Register
          </Text>
        </TouchableOpacity>

        <View style={styles.rectangle3}>
          <TouchableOpacity style={styles.login} onPress={handleLogin}>
            <Text style={styles.loginSpan}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginSpan: {
    color: "#F4F4F4",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
  },
  labelSpan: {
    color: "black",
    fontSize: 9,
    fontFamily: "Roboto",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: 1.8,
  },
  textbox: {
    padding: 25,
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "#A6A6A6",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textFieldData: {
    flex: 1,
  },
  textfielddataSpan: {
    color: "#A6A6A6",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  label01Span: {
    color: "black",
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  textbox01: {
    padding: 25,
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "#A6A6A6",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textFieldData01: {
    flex: 1,
  },
  textfielddata01Span: {
    color: "#A6A6A6",
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  textInput: {
    width: "100%",
    fontSize: 14,
    color: "#000",
    fontFamily: "Roboto",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loginDesign: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    paddingVertical: 60,
    minHeight: screenHeight,
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

  input01: {
    width: "75%",
    marginBottom: 30,
    flexDirection: "column",
    gap: 4,
  },
  input: {
    width: "75%",
    marginBottom: 20,
    flexDirection: "column",
    gap: 4,
  },
  registerLink: {
    color: "#0077B3",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
    marginVertical: 20,
  },
  rectangle3: {
    width: 159,
    height: 50,
    backgroundColor: "#0077B3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  login: {
    width: 66.89,
    height: 23.47,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    paddingLeft: "0%", // isto kao širina margina inputa (75%)
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000000", //A6A6A6
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  checked: {
    width: 15,
    height: 15,
    backgroundColor: "#0077B3",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Roboto",
  },
});
