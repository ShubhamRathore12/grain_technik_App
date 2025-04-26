import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ChevronUp, ChevronDown } from "lucide-react-native";

export default function CurrentFaultsView({
  onBack,
  onFaultCode,
}: {
  onBack: () => void;
  onFaultCode: () => void;
}) {
  const [faults, setFaults] = useState<string[]>([
    "Blower Circuit Breaker Fault",
    "Overheat Warning",
    "Sensor Malfunction",
  ]);

  const handleReset = () => {
    setFaults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CURRENT FAULTS</Text>

      <View style={styles.faultContainer}>
        <ScrollView>
          {faults.length === 0 ? (
            <Animated.View entering={FadeInDown}>
              <Text style={styles.faultText}>No faults available</Text>
            </Animated.View>
          ) : (
            faults.map((fault, index) => (
              <Animated.View
                key={`${fault}-${index}`}
                entering={FadeInDown.delay(index * 100)}
              >
                <Text style={styles.faultText}>• {fault}</Text>
              </Animated.View>
            ))
          )}
        </ScrollView>

        <View style={styles.scrollControls}>
          <TouchableOpacity style={styles.scrollBtn}>
            <ChevronUp size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.scrollBtn, { marginTop: 12 }]}>
            <ChevronDown size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>FAULT RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onFaultCode}>
          <Text style={styles.buttonText}>FAULT CODE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>FAULT LOG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0D0D0D",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2E2E2E",
    marginBottom: 16,
    letterSpacing: 1,
  },
  faultContainer: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2E2E2E",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  faultText: {
    color: "#D0D0D0",
    fontSize: 15,
    marginBottom: 10,
  },
  scrollControls: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
  },
  scrollBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 6,
    borderColor: "#444",
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2A2A2A",
    borderColor: "#4F4F4F",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 6,
    minWidth: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
