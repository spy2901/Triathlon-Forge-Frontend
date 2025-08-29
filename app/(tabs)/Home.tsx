import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Activity from "../components/activity";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchActivities = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://15e8e85bd6ff.ngrok-free.app/api/strava/get_activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id, // 🔁 ovde koristiš pravi user ID (npr. iz AsyncStorage ili props)
            limit: 15,
            offset: offset,
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setActivities((prev) => [...prev, ...data.data]);
        setOffset((prev) => prev + data.limit);
        if (data.count < data.limit) setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.activity_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/activity/${item.activity_id}`)}
          >
            <Activity activity={item} />
          </TouchableOpacity>
        )}
        onEndReached={fetchActivities}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#007AFF" /> : null
        }
      />
    </View>
  );
}
