import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { SafeAreaView } from "react-native-safe-area-context";

const RegisterDesign = () => {
  const [first_name, setName] = useState("");
  const [last_name, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [birthYear, setBirthYear] = useState("");
  const [items, setItems] = useState(
    Array.from({ length: 2025 - 1925 + 1 }, (_, i) => ({
      label: (2025 - i).toString(),
      value: (2025 - i).toString(),
    }))
  );

  const sanitize = (text: string) => {
    return text.trim().replace(/[<>&"'`]/g, ""); // uklanja potencijalno opasne karaktere
  };

  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (looksLikeEmail.test(password)) {
      return "Password must not look like an email address.";
    }

    return null; // valid
  };

  const handleRegister = async () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!first_name || !last_name || !email || !birthYear) {
      alert("Please fill out all required fields.");
      return;
    }
    try {
      const response = await fetch(
        "https://15e8e85bd6ff.ngrok-free.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: sanitize(first_name),
            last_name: sanitize(last_name),
            email: sanitize(email),
            password: password, // ostaje isto jer se već validira
            birth_year: parseInt(birthYear),
          }),
        }
      );

      const text = await response.text();
      // console.log("Raw response:", text);
      const data = JSON.parse(text);
      if (response.ok) {
        router.push({
          pathname: "/verifyCode",
          params: { email }, // ovde prosleđuješ email
        });
      } else {
        alert(`Greška: ${data.message}`);
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Došlo je do greške prilikom registracije.");
    }
  };
  return (
    <SafeAreaView style={styles.registerDesign}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={50}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
                    <Image
                      style={styles.logo}
                      source={require("./assets/images/TriathlonForgeLogo.png")}
                      resizeMode="cover"
                    />
                  </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter Name"
              style={styles.textbox}
              value={first_name}
              onChangeText={setName}
              placeholderTextColor="#888"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Surname</Text>
            <TextInput
              placeholder="Enter Surname"
              style={styles.textbox}
              value={last_name}
              onChangeText={setSurname}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              style={styles.textbox}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#888"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter Password"
              style={styles.textbox}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Repeat Password</Text>
            <TextInput
              placeholder="Repeat Password"
              style={styles.textbox}
              secureTextEntry
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Birth Year</Text>
            <DropDownPicker
              open={open}
              value={birthYear}
              items={items}
              setOpen={setOpen}
              setValue={setBirthYear}
              setItems={setItems}
              placeholder="Select Birth Year"
              style={{
                backgroundColor: "white",
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                height: 50,
              }}
              textStyle={{
                fontSize: 16,
                color: "#000",
              }}
              dropDownContainerStyle={{
                borderColor: "#ccc",
                borderRadius: 8,
              }}
              listMode="MODAL" // <-- rešenje za ScrollView grešku
            />
          </View>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.alreadyHaveAccount}>
              Already have account? Sign in now
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.login}>SIGN UP</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterDesign;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  registerDesign: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
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
  inputWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "capitalize",
    color: "#000",
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  textbox: {
    borderRadius: 4,
    backgroundColor: "#fff",
    borderColor: "#a6a6a6",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  loginButton: {
    marginTop: 20,
    width: 145,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#0077b3",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Inter-Regular",
  },
  alreadyHaveAccount: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#0077B3",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
