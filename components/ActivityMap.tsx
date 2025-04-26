import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ActivityMap() {
  const hasTrigger = true; // Replace with your real condition
  const coordinates = {
    latitude: 28.6139, // Example: New Delhi
    longitude: 77.209,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.activityContent}>
      <Text style={styles.activitySubtitle}>ACTIVE TRIGGER</Text>

      {hasTrigger ? (
        <MapView style={styles.map} initialRegion={coordinates}>
          <Marker coordinate={coordinates} title="Trigger Location" />
        </MapView>
      ) : (
        <Text style={styles.activityInfo}>No Active Triggers Found!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activityContent: {
    flex: 1,
    padding: 10,
  },
  activitySubtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityInfo: {
    marginTop: 10,
    fontSize: 14,
  },
  map: {
    width: "100%",
    height: 300,
    marginTop: 10,
  },
});
