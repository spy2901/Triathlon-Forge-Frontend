import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function CalculatorScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("running"); // sport
  const [items, setItems] = useState([
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Swimming", value: "swimming" },
  ]);

  const [calculator, setCalculator] = useState("speed"); // speed ili bmi
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    let res = "";

    // Funkcija za parsiranje unosa vremena u minute
    const parseTimeInput = (str: string) => {
      if (!str) return NaN;
      str = str.trim();

      if (str.includes(":")) {
        const [min, sec] = str.split(":").map((x) => parseInt(x, 10));
        if (isNaN(min) || isNaN(sec)) {
          setResult("Invalid time format! Use min:sec.");
        }
        return min + sec / 60;
      }

      str = str.replace(",", ".");
      const num = parseFloat(str);
      if (isNaN(num)) {
        setResult("Invalid number! Please enter a numeric value.");
      }
      return num;
    };

    // Parsiranje unosa, podržava , i .
    // const t = parseFloat(time?.replace(",", "."));
    // const d = parseFloat(distance?.replace(",", "."));
    // const p = parseFloat(pace?.replace(",", "."));

    const t = parseTimeInput(time);
    const d = parseTimeInput(distance);
    const p = parseTimeInput(pace);
    // Formatiranje min/sekundi
    const formatPace = (pace: number) => {
      const minutes = Math.floor(pace);
      const seconds = Math.round((pace - minutes) * 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };
    if (calculator === "speed") {
      // TIME + DISTANCE -> speed/pace/tempo
      if (!isNaN(t) && !isNaN(d) && isNaN(p)) {
        if (d <= 0) {
          res = "Distance must be greater than 0";
        } else {
          if (value === "running") {
            const pacePerKm = t / d;
            const pacePerMile = t / (d / 1.60934);
            res = `Pace: ${formatPace(pacePerKm)} min/km | ${formatPace(
              pacePerMile
            )} min/mile`;
          } else if (value === "cycling") {
            const kmh = d / (t / 60);
            const mph = kmh * 0.621371;
            res = `Speed: ${kmh.toFixed(2)} km/h | ${mph.toFixed(2)} mph`;
          } else if (value === "swimming") {
            const tempo = t / (d * 10); // min per 100m
            res = `Tempo: ${formatPace(tempo)} min/100m`;
          }
        }
      }
      // TIME + PACE/SPEED -> distance
      else if (!isNaN(t) && !isNaN(p) && isNaN(d)) {
        if (value === "running") {
          const dist = t / p;
          res = `Distance: ${dist.toFixed(2)} km`;
        } else if (value === "cycling") {
          const dist = (t / 60) * p; // p = km/h
          const mph = p * 0.621371;
          res = `Distance: ${dist.toFixed(2)} km (Speed: ${p.toFixed(
            2
          )} km/h | ${mph.toFixed(2)} mph)`;
        } else if (value === "swimming") {
          const distKm = (t / p) * 0.1;
          res = `Distance: ${distKm.toFixed(2)} km`;
        }
      }
      // DISTANCE + PACE/SPEED -> time
      else if (!isNaN(d) && !isNaN(p) && isNaN(t)) {
        if (value === "running") {
          const tt = p * d;
          res = `Time: ${tt.toFixed(2)} min`;
        } else if (value === "cycling") {
          const tt = (d / p) * 60;
          const mph = p * 0.621371;
          res = `Time: ${tt.toFixed(2)} min (Speed: ${p.toFixed(
            2
          )} km/h | ${mph.toFixed(2)} mph)`;
        } else if (value === "swimming") {
          const tt = p * (d * 10); // vreme = tempo * (dist * 10)
          res = `Time: ${tt.toFixed(2)} min`;
        }
      } else {
        res = "Enter at least two Numeric values!";
      }
    }
    // BMI
    else if (calculator === "bmi") {
      if (!isNaN(t) && !isNaN(d)) {
        const weight = t;
        const height = d / 100;
        if (height > 0) {
          const bmi = weight / (height * height);
          res = `BMI: ${bmi.toFixed(2)} kg/m²`;
        } else {
          res = "Height must be greater than 0";
        }
      } else {
        res = "Enter weight (kg) and height (cm)";
      }
    }

    setResult(res);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Radio buttons za izbor kalkulatora */}
      <View style={styles.radioGroup}>
        <TouchableOpacity
          onPress={() => {
            setCalculator("speed");
            setResult("");
          }}
        >
          <Text
            style={calculator === "speed" ? styles.active : styles.inactive}
          >
            Speed Calculator
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCalculator("bmi");
            setResult("");
          }}
        >
          <Text style={calculator === "bmi" ? styles.active : styles.inactive}>
            BMI Calculator
          </Text>
        </TouchableOpacity>
      </View>
      {/* Dropdown za izbor sporta - prikazuje se samo za speed */}
      {calculator === "speed" && (
        <>
          <Text style={styles.label}>Select Sport:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Sport"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </>
      )}

      {/* Input polja */}
      <Text style={styles.label}>
        {calculator === "bmi" ? "Weight (kg)" : "Time (min)"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={calculator === "bmi" ? "Weight (kg)" : "Time (min)"}
        keyboardType="default"
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>
        {calculator === "bmi" ? "Height (cm)" : "Distance (km)"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={calculator === "bmi" ? "Height (cm)" : "Distance (km)"}
        keyboardType="decimal-pad"
        value={distance}
        onChangeText={setDistance}
      />

      {calculator === "speed" && (
        <>
          <Text style={styles.label}>
            {value === "running"
              ? "Pace (min/km)"
              : value === "swimming"
              ? "Tempo (min/100m)"
              : "Speed (km/h)"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={
              value === "running"
                ? "Pace (min/km)"
                : value === "swimming"
                ? "Tempo (min/100m)"
                : "Speed (km/h)"
            }
            placeholderTextColor="#888"
            keyboardType="default"
            value={pace}
            onChangeText={setPace}
          />
        </>
      )}

      {/* Dugme */}
      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {/* Rezultat */}
      {result ? <Text style={styles.result}>{result}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow: 1,
    padding: 20,
    paddingTop: 80, // 🔹 razmak od vrha
    backgroundColor: "#fff",
    justifyContent: "flex-start", // 🔹 sadržaj ide od vrha
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    marginBottom: 10,
    borderColor: "#0077B3",
  },
  dropdownContainer: {
    borderColor: "#0077B3",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 10,
  },
  active: {
    fontWeight: "bold",
    fontSize: 16,
    color: "blue",
  },
  inactive: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0077B3",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
});
