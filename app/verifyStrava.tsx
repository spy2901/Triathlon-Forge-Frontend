import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const ConnectStrava = () => {
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Image
          style={styles.logo}
          resizeMode="cover"
          source={require("./assets/images/TriathlonForgeLogo.png")}
        />

        <TouchableOpacity onPress={() => router.push("/StravaWebViewScreen")}>
          <Image
            style={styles.connectButton}
            resizeMode="contain"
            source={require("./assets/stravaAssets/btn_strava_connect_with_orange.png")}
          />
        </TouchableOpacity>

        <Image
          style={styles.poweredBy}
          resizeMode="contain"
          source={require("./assets/stravaAssets/api_logo_pwrdBy_strava_horiz_gray.png")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 999,
    marginBottom: 40,
  },
  connectButton: {
    width: 247,
    height: 50,
    marginBottom: 30,
  },
  poweredBy: {
    width: 193,
    height: 36,
    bottom: 0,
    position: "absolute",
    left: 0,
  },
});

export default ConnectStrava;
