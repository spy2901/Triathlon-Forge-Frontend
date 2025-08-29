import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Activity = ({ activity }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require("../assets/images/TriathlonForgeLogo.png")}
            style={styles.avatar}
          />
          <Text style={styles.username}>{activity.name}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(activity.date).toLocaleDateString()}
        </Text>
      </View>

      {/* Activity Info */}
      <View style={styles.info}>
        <Text style={styles.type}>{activity.activity_type}</Text>
        <Text style={styles.location}>{activity.location}</Text>
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F90FF",
    borderRadius: 12,
    padding: 10,
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  username: { fontWeight: "bold", fontSize: 16 },
  date: { fontSize: 14 },
  info: { marginTop: 5, marginBottom: 5 },
  type: { fontSize: 16, fontWeight: "600" },
  location: { fontSize: 14, color: "#555" },
  mapContainer: { height: 120, borderRadius: 12, overflow: "hidden" },
  map: { flex: 1 },
});
