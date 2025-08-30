import { useAuth } from "@/app/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

export default function ActivityDetail() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<any>(null);
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getUTCDate()}.${
      date.getUTCMonth() + 1
    }.${date.getUTCFullYear()}`;
  };

  useEffect(() => {
    fetch("https://51b1b8bea150.ngrok-free.app/api/strava/get_activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity_id: id }),
    })
      .then(async (res) => {
        const text = await res.text();
        //console.log("Server response:", text);
        return JSON.parse(text);
      })
      .then((data) => setActivity(data.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!activity) return <Text>Loading...</Text>;
  // Server response: {
  //   "data": {
  //     "Pace": null,
  //     "activity_id": 2,
  //     "activity_type": "Ride",
  //     "average_cadence": null,
  //     "average_watts": 61.9,
  //     "calories_burned": null,
  //     "date": "Tue, 19 Aug 2025 00:00:00 GMT",
  //     "detail_id": 2,
  //     "device_name": null,
  //     "distance": 2476.1,
  //     "duration": 574,
  //     "elevation_gain": 25.0,
  //     "gear_name": null,
  //     "heart_rate_avg": 108.9,
  //     "heart_rate_max": 127.0,
  //     "kilojoules": 35.5,
  //     "location_city": null,
  //     "location_country": null,
  //     "max_speed": 6.171,
  //     "max_watts": null,
  //     "polyline": "",
  //     "speed": 4.314,
  //     "start_lat": null,
  //     "start_lng": null,
  //     "stravaActivityID": 15550094686,
  //     "user_id": 1
  //   },
  //   "success": true
  // }

  function ActivityDevice({ type, name }) {
    let icon = "help-outline"; // default
    let label = name;

    switch (type) {
      case "run":
        icon = "walk-outline";
        break;
      case "bike":
        icon = "bicycle-outline";
        break;
      case "swim":
        icon = "water-outline"; // Ionicons ima ovaj
        break;
    }

    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginBottom: 10 }}
          >
            <Ionicons size={28} name="arrow-back-outline" color="#000" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>
                {user.name} {user.surname}
              </Text>
              <Text style={styles.date}>{formatDate(activity.date)}</Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{activity.activity_type}</Text>
          {/* <Text style={styles.location}>Belgrade</Text> */}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Stat label="Distance" value={activity.distance} />
          <Stat label="Moving Time" value={activity.duration} />
          <Stat label="Speed" value={activity.speed} />
          <Stat label="Power" value={activity.average_watts} />
          <Stat label="Elevation Gain" value={activity.elevation_gain} />
          <Stat label="Calorie Count" value="449 Cal" />
        </View>

        {/* Devices */}
        <ActivityDevice
          type={activity.activity_type}
          name="Morning Run Shoes"
        />
        <View style={styles.deviceRow}>
          <Ionicons name="watch-outline" size={20} color="black" />
          <Text style={styles.deviceText}>Garmin Edge 530</Text>
        </View>

        {/* Share buttons */}
        <Text style={styles.shareText}>Share to</Text>
        <View style={styles.shareRow}>
          <FontAwesome name="instagram" size={28} color="#E1306C" />
          <FontAwesome name="facebook" size={28} color="#3b5998" />
          <FontAwesome name="twitter" size={28} color="#1DA1F2" />
          <FontAwesome name="whatsapp" size={28} color="#25D366" />
          <FontAwesome name="telegram" size={28} color="#0088cc" />
        </View>

        {/* Powered by */}
        <Text style={styles.powered}>Powered by STRAVA</Text>
      </ScrollView>
    );
  }

  function Stat({ label, value }) {
    return (
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  userInfo: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  userName: { fontWeight: "bold", fontSize: 16 },
  date: { color: "gray", fontSize: 12, marginTop: 6 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  location: { fontSize: 16, color: "gray" },
  map: { width: "100%", height: 150, borderRadius: 8, marginBottom: 16 },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statBox: {
    width: "48%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  statValue: { fontSize: 16, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "gray" },
  deviceRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  deviceText: { marginLeft: 8, fontSize: 14 },
  shareText: { marginTop: 20, fontWeight: "bold", fontSize: 14 },
  shareRow: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
  },
  powered: { textAlign: "center", marginTop: 20, fontSize: 12, color: "gray" },
});
