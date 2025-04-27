import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from "react-native";

import plc1 from "@/assets/images/aerationheating-Photoroom.png";
import plc2 from "@/assets/images/aerationwithheating-Photoroom.png";
import plc3 from "@/assets/images/1200aerationheating-Photoroom.png";
import plc4 from "@/assets/images/1200aerationwihtout-Photoroom.png";
import { useMachineData } from "@/hooks/useMachineData";
import { useFormat } from "@/hooks/useFormat";

export default function AerationControlView({
  mode,
  onBack,
  deviceId,
}: {
  mode: "WITHOUT_HEATING" | "WITH_HEATING";
  onBack: () => void;
  deviceId: any;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showMore, setShowMore] = useState(false);
  const { data, error, isConnected, connect, disconnect } = useMachineData();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const getImageSource = () => {
    if (mode === "WITHOUT_HEATING") {
      return deviceId == 1 ? plc4 : plc2;
    } else {
      return deviceId == 1 ? plc3 : plc1;
    }
  };

  const getDeviceDetails = () => {
    if (deviceId == 1 && mode === "WITHOUT_HEATING") {
      return {
        model: "GTPL-109",
        description: "1200L Aeration Without Heating",
      };
    } else if (deviceId == 1 && mode === "WITH_HEATING") {
      return { model: "GTPL-110", description: "1200L Aeration With Heating" };
    } else if (deviceId == 2 && mode === "WITHOUT_HEATING") {
      return {
        model: "GTPL-209",
        description: "1000L Aeration Without Heating",
      };
    } else {
      return { model: "GTPL-210", description: "1000L Aeration With Heating" };
    }
  };

  const { model, description } = getDeviceDetails();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        AERATION {mode === "WITH_HEATING" ? "WITH HEATING" : "WITHOUT HEATING"}
      </Text>

      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Animated Info Card */}
        <Animated.View style={[styles.infoCard, { opacity: fadeAnim }]}>
          <Text style={styles.infoTitle}>Device Information</Text>
          <Text style={styles.infoText}>Model: {model}</Text>
          <Text style={styles.infoText}>Description: {description}</Text>
          <Text style={styles.infoText}>
            Mode: {mode === "WITH_HEATING" ? "With Heating" : "Without Heating"}
          </Text>
          <Text style={styles.infoText}>Device ID: {deviceId}</Text>

          {/* Important fields always shown */}
          <View style={styles.row}>
            <Text style={styles.tempLabel}>TH</Text>
            <TextInput
              style={styles.tempInput}
              defaultValue={useFormat(data?.AI_TH_Act) ?? "0"}
              editable={false}
            />
            <Text style={styles.unit}>°C</Text>
          </View>

          <Text style={styles.sectionTitle}>Running Time</Text>
          <View style={styles.runningTime}>
            <TextInput
              style={styles.durationBox}
              defaultValue="0"
              editable={false}
            />
            <Text>HOURS</Text>
            <TextInput
              style={styles.durationBox}
              defaultValue={String(
                mode == "WITH_HEATING" ? data?.HEATING_MODE_Continuous_Mode : 0
              ).padStart(2, "0")}
              editable={false}
            />

            <Text>MINUTES</Text>
            <TextInput
              style={styles.durationBox}
              defaultValue={String(
                mode == "WITH_HEATING" ? data?.HEATING_MODE_Continuous_Mode : 0
              ).padStart(2, "0")}
              editable={false}
            />
          </View>

          {/* Show more fields when toggled */}
          {showMore && (
            <>
              {/* Set Duration */}
              <View style={styles.modeRow}>
                <View style={styles.durationSet}>
                  <Text>Set Duration</Text>
                  <TextInput
                    style={styles.durationValue}
                    defaultValue="0"
                    editable={false}
                  />
                  <Text>h</Text>
                </View>
              </View>

              {/* T2 */}
              <View style={styles.tempRow}>
                <Text style={styles.tempLabel}>T2</Text>
                <TextInput
                  style={styles.tempInput}
                  defaultValue={useFormat(
                    mode == "WITHOUT_HEATING"
                      ? data?.AI_AMBIANT_TEMP ?? "0.0"
                      : "00"
                  )}
                  editable={false}
                />
                <Text style={styles.unit}>°C</Text>
              </View>

              {/* Blower */}
              <View style={styles.blowerBox}>
                <Text style={styles.label}>BLOWER</Text>
                <TextInput
                  style={styles.percentBox}
                  defaultValue={`${useFormat(
                    mode == "WITHOUT_HEATING"
                      ? data?.Value_to_Display_EVAP_ACT_SPEED ?? "00"
                      : "00"
                  )}%`}
                  editable={false}
                />
              </View>
              {((mode === "WITH_HEATING" && deviceId != 2) ||
                (deviceId == 2 && mode === "WITHOUT_HEATING")) && (
                <View style={styles.row}>
                  <Text style={styles.tempLabel}>Delta</Text>
                  <TextInput
                    style={styles.tempInput}
                    defaultValue={useFormat(
                      data?.HEATING_MODE_SET_TH_FOR_HEATING_MODE ?? "00"
                    )}
                    editable={false}
                  />
                  <Text style={styles.unit}>°C</Text>
                </View>
              )}

              {deviceId == 1 && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "yellow" }]}
                >
                  <Text style={(styles.actionButtonText, { color: "black" })}>
                    Continous Mode
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {/* Show More/Less Toggle Button */}
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowMore(!showMore)}
          >
            <Text style={styles.showMoreText}>
              {showMore ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Start / Stop Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "green" }]}
        >
          <Text style={styles.actionButtonText}>AERATION START</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "darkred" }]}
        >
          <Text style={styles.actionButtonText}>AERATION STOP</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: { alignItems: "center", marginBottom: 20 },
  image: { width: "100%", height: 200, borderRadius: 8 },
  infoCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  infoText: { fontSize: 14, textAlign: "center", marginBottom: 5 },
  label: { fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  tempLabel: { fontSize: 16 },
  tempInput: {
    borderWidth: 1,
    padding: 8,
    width: 60,
    textAlign: "center",
    marginHorizontal: 8,
  },
  unit: { fontSize: 16 },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  actionButtonText: { color: "#fff", fontWeight: "bold" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20 },
  runningTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  durationBox: {
    borderWidth: 1,
    width: 50,
    padding: 6,
    textAlign: "center",
    marginHorizontal: 4,
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  durationSet: { flexDirection: "row", alignItems: "center", gap: 6 },
  durationValue: { borderWidth: 1, padding: 6, width: 40, textAlign: "center" },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  blowerBox: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  percentBox: { borderWidth: 1, padding: 8, width: 60, textAlign: "center" },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#d1d5db",
    borderRadius: 5,
    marginTop: 10,
  },
  backText: { fontWeight: "bold" },
  showMoreButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ccc",
    borderRadius: 6,
  },
  showMoreText: { fontSize: 14, fontWeight: "bold" },
});
