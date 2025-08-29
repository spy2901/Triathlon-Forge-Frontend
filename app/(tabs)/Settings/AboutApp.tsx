import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from "react-native";

const Section = ({ icon, title, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={22} color="#007AFF" style={styles.icon} />
      <Text style={styles.heading}>{title}</Text>
    </View>
    <Text style={styles.paragraph}>{children}</Text>
  </View>
);
export default function AboutAppScreen() {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons size={28} name="arrow-back-outline" color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>About TriathlonForge</Text>

      <Section icon="flag-outline" title="Purpose of the App">
        TriathlonForge is designed for runners and triathletes who want to
        track, analyze, and improve their training. By connecting with your
        STRAVA or Garmin profile, the app provides detailed activity insights
        and personalized recommendations to help you reach peak performance.
      </Section>

      <Section icon="people-outline" title="Who is the App For">
        • Runners and triathletes of all levels{"\n"}• Athletes who want to
        monitor progress over time{"\n"}• Users looking for data-driven training
        support
      </Section>

      <Section icon="log-in-outline" title="How Data is Entered">
        Users log in with their STRAVA or Garmin account. The app automatically
        imports activity data—no manual entry required.
      </Section>

      <Section icon="bar-chart-outline" title="How Data is Processed">
        Imported activities are analyzed to extract key metrics such as:
        {"\n"}• Distance{"\n"}• Pace / Speed{"\n"}• Duration{"\n"}• Calories
        burned{"\n"}• Average heart rate
      </Section>

      <Section icon="analytics-outline" title="Results of Data Processing">
        • Monthly reports with distance trends, pace variations, and summaries
        {"\n"}• Yearly progress reports to track long-term improvements{"\n"}•
        Charts and visualizations for performance insights
      </Section>

      <Section icon="lock-closed-outline" title="Data Privacy">
        User data is not shared with third parties. Activities can only be
        shared if the user chooses to post them on social media.
      </Section>

      <Section icon="person-circle-outline" title="User Profiles">
        Each user has a profile with personal information such as:
        {"\n"}• Name & birth year{"\n"}• Average heart rate across activities
        {"\n"}• Number of activities completed{"\n"}• Charts of progress (pace,
        speed, cadence, etc.)
      </Section>

      <Section icon="help-circle-outline" title="How the App Works">
        1. Open the app{"\n"}
        2. Log in with your STRAVA linked account{"\n"}
        3. Activities load automatically{"\n"}
        4. Select an activity to view distance, pace, duration, calories, and
        heart rate stats{"\n"}
        5. Use built-in calculators (pace & BMI){"\n"}
        6. Explore monthly and yearly reports
      </Section>

      <Section icon="flame-outline" title="Slogan">
        Forge Your Best Performance – Track, Analyze, Improve.
      </Section>

      <Section icon="heart-outline" title="Contact Us">
        <Text style={styles.paragraph}>
          For support or feedback, contact us at:
        </Text>

        {/* Mail */}
        <View style={styles.contactContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#007AFF"
            style={styles.contactIcon}
          />
          <View style={styles.linkWrapper}>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("mailto:app@triathlonforge.com")}
            >
              app@triathlonforge.com
            </Text>
          </View>
        </View>

        {/* Website */}
        <View style={styles.contactContainer}>
          <Ionicons
            name="globe-outline"
            size={20}
            color="#007AFF"
            style={styles.contactIcon}
          />
          <View style={styles.linkWrapper}>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://triathlonForge.com/contact")
              }
            >
              triathlonforge.com
            </Text>
          </View>
        </View>
      </Section>
      <View style={{marginTop: 25}}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginLeft: 30, // da se text poravna ispod naslova sa ikonicom
  },
  list: {
    marginLeft: 12,
    marginTop: 25,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 4,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "flex-start", // linkovi počinju od vrha
    marginLeft: 35,
    marginBottom: 25,
  },
  contactIcon: {
    marginRight: 8,
    marginTop: 2, // da ikonice budu blago poravnate sa tekstom
  },
  linkWrapper: {
    marginTop: 0, // opcionalno, kontrolišeš vertikalni razmak unutar wrapper-a
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
    fontSize: 16,
    lineHeight: 22, // da tekst ima malo više visine
  },
});
