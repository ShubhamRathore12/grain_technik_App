import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import plc1 from "@/assets/images/autos200-Photoroom.png";
import plc2 from "@/assets/images/1200auto-Photoroom.png";
import { Switch } from "react-native-gesture-handler";

const AutoView = ({ onBack, id }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isAutoAerationOn, setIsAutoAerationOn] = useState(false);

  useEffect(() => {
    if (id == 1 || id == 2) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [id]);

  // Cards based on id
  const cardData =
    id == 1
      ? [
          { label: "RH", value: "50%" },
          { label: "TH", value: "25°C" },
          { label: "HTR", value: "ON" },
          { label: "HTG", value: "ON" },
          { label: "AHT", value: "30°C" },
          { label: "T0", value: "30°C" },
          { label: "T1", value: "28°C" },
          { label: "T2", value: "26°C" },
          { label: "T1 - TH", value: "-2°C" },
          { label: "PH", value: "120 Pa" },
          { label: "PA", value: "100 Pa" },
          { label: "COND", value: "80%" },
          { label: "BLOWER", value: "60%" },
          { label: "HP", value: "120" },
          { label: "LP", value: "45" },
        ]
      : [
          { label: "TH", value: "25°C" },
          { label: "T0", value: "30°C" },
          { label: "T1", value: "28°C" },
          { label: "T2", value: "26°C" },
          { label: "T1 - TH", value: "-2°C" },
          { label: "BLOWER", value: "60%" },
          { label: "COND", value: "80%" },
          { label: "HP", value: "120" },
          { label: "LP", value: "45" },
        ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AUTO</Text>

      <Image
        source={id == 1 ? plc2 : plc1}
        style={styles.image}
        resizeMode="contain"
      />

      {(id == 1 || id == 2) && (
        <Animated.View style={[styles.cardsContainer, { opacity: fadeAnim }]}>
          {cardData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          ))}
          {id == 1 && (
            <TouchableOpacity style={styles.selectAutoCard}>
              <Text style={styles.selectAutoText}>SELECT AUTO</Text>
            </TouchableOpacity>
          )}
          {id == 2 && (
            <>
              <TouchableOpacity style={styles.startButtonCard}>
                <Text style={styles.startStopText}>START</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.stopButtonCard}>
                <Text style={styles.startStopText}>STOP</Text>
              </TouchableOpacity>

              <View style={styles.toggleCard}>
                <Text style={styles.toggleLabel}>AUTO AERATION</Text>
                <Switch
                  value={isAutoAerationOn}
                  onValueChange={(value) => setIsAutoAerationOn(value)}
                />
              </View>
            </>
          )}
        </Animated.View>
      )}

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  cardsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    width: "30%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
    textAlign: "center",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
  selectAutoCard: {
    width: "65%",
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  selectAutoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  startButtonCard: {
    width: "45%",
    backgroundColor: "#22C55E",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stopButtonCard: {
    width: "45%",
    backgroundColor: "#EF4444",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  startStopText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  toggleCard: {
    width: "65%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  backBtn: {
    backgroundColor: "#D1D5DB",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default AutoView;
