import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Device } from "@/types";
import Colors from "@/constants/Colors";

interface DeviceCardProps {
  device: Device;
  onPress: (device: Device) => void;
}

export default function DeviceCard({ device, onPress }: DeviceCardProps) {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(`/device/${device.id}`);
  };

  return (
    <View style={styles.container}>
      <Image source={device.imageUrl} style={styles.image} />
      <Text style={styles.title}>{device.name}</Text>
      <Text style={styles.status}>{device.status}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewMore}>
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Download Files</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    width: "48%",
    margin: "1%",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1F2937",
  },
  status: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
});
