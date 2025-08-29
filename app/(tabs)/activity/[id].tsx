import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ActivityDetail() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<any>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
  };

  useEffect(() => {
    fetch("https://15e8e85bd6ff.ngrok-free.app/api/strava/get_activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity_id: id }),
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("Server response:", text);
        return JSON.parse(text);
      })
      .then((data) => setActivity(data.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!activity) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 10 }}>
        <Ionicons size={28} name="arrow-back-outline" color="#000" />
      </TouchableOpacity>

      <Text>Type: {activity.activity_type}</Text>
      <Text>Distance: {activity.distance} m</Text>
      <Text>Duration: {activity.duration} s</Text>
      <Text>Date: {formatDate(activity.date)}</Text>
    </View>
  );
}
