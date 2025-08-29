import { router } from "expo-router";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const StravaWebViewScreen = () => {
  const webviewRef = useRef(null);
  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: "https://15e8e85bd6ff.ngrok-free.app/api/strava/auth" }}
        onNavigationStateChange={(navState) => {
          if (navState.url.startsWith("callback://home")) {
            const urlParams = new URLSearchParams(navState.url.split("?")[1]);
            const code = urlParams.get("code");
            console.log("Strava authorization code:", code);

            // Zatvori WebView ili idi na sledeći ekran
            router.push("/login");
          }
        }}
        originWhitelist={["*"]} // Omogućava učitavanje svih URL-ova
        startInLoadingState={true} // Prikaži loading spinner dok se učitava
        javaScriptEnabled={true} // Omogući JS, bitno za mnoge redirect-e
        domStorageEnabled={true} // Omogući DOM storage
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StravaWebViewScreen;
