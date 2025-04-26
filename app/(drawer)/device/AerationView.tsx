import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AerationView({
  onWithoutHeating,
  onWithHeating,
  onBack,
}: {
  onWithoutHeating: () => void;
  onWithHeating: () => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>AERATION</Text>

      <TouchableOpacity style={styles.button} onPress={onWithoutHeating}>
        <Text style={styles.buttonText}>AERATION WITHOUT HEATING</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onWithHeating}>
        <Text style={styles.buttonText}>AERATION WITH HEATING</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#d1d5db",
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: { fontWeight: "bold", color: "#000" },
  backButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#d1d5db",
    padding: 10,
    borderRadius: 6,
  },
  backText: { fontWeight: "bold" },
});
