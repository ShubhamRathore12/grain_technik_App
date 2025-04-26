import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function FaultCodeView({ onBack }: { onBack: () => void }) {
  const faultCodes = [
    { code: 1, message: "Compressor circuit breaker fault" },
    { code: 2, message: "Condenser fan door open" },
    { code: 3, message: "Blower drive fault" },
    { code: 4, message: "Blower circuit breaker fault" },
    { code: 7, message: "Three phase monitor fault" },
    { code: 8, message: "Low Pressure Fault" },
    { code: 9, message: "Ambient temp lower than set temp" },
    { code: 10, message: "Ambient temp. Over 43°C" },
    { code: 13, message: "Cond Fan circuit breaker fault" },
    { code: 14, message: "Low pressure fault : Locked" },
    { code: 16, message: "High pressure fault : Locked" },
    { code: 17, message: "Ambient temp. Over 40°C" },
    { code: 18, message: "Ambient temp. Less than 4°C" },
    { code: 19, message: "Cond Fan  TOP" },
    { code: 23, message: "Ambient Temp Sensor T2 Open" },
    { code: 24, message: "Ambient Temp Sensor T2 Short Circuit" },
    { code: 27, message: "Air Outlet Temp Sensor T0 Open" },
    { code: 28, message: "Air Outlet Temp Sensor T0 Short Circuit" },
    { code: 32, message: "Cold Air Temp Sensor T1 Open" },
    { code: 33, message: "Cold Air Temp Sensor T1 short circuit" },
    { code: 34, message: "Air After Heater Temp Sensor TH Open" },
    { code: 35, message: "Air After Heater Temp Sensor TH short circuit" },
    { code: 39, message: "High pressure fault" },
    { code: 41, message: "Heater TOP fault" },
    { code: 6, message: "Heater circuit breaker fault" },
    { code: 12, message: "Heater RCCB fault" },
    { code: 15, message: "Anti Freeze Protection" },
    { code: 44, message: "TH Air After Heater Temp more than 50 ℃" },
    {
      code: 45,
      message: "Warning : Delta value not achieved in aeration mode",
    },
    { code: 48, message: "Warning : LP transducer failure" },
    { code: 49, message: "Warning : HP transducer failure" },
  ];

  const mid = Math.ceil(faultCodes.length / 2);
  const leftCodes = faultCodes.slice(0, mid);
  const rightCodes = faultCodes.slice(mid);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAULT CODES</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.column}>
          {leftCodes.map(({ code, message }, index) => (
            <Animated.View
              key={`${code}-${message}`}
              entering={FadeInDown.delay(index * 60)}
            >
              <Text style={styles.codeText}>
                {code}. {message}
              </Text>
            </Animated.View>
          ))}
        </View>
        <View style={styles.column}>
          {rightCodes.map(({ code, message }, index) => (
            <Animated.View
              key={`${code}-${message}`}
              entering={FadeInDown.delay((index + mid) * 60)}
            >
              <Text style={styles.codeText}>
                {code}. {message}
              </Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#333",
    paddingBottom: 6,
  },
  scrollContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  codeText: {
    fontSize: 14,
    marginVertical: 6,
    color: "#DDDDDD",
  },
  backButton: {
    marginTop: 24,
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
