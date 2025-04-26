import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ActivityMap from "@/components/ActivityMap";

// Sample data for quota stats
const quotaData = [
  { label: "SMS", used: 0, total: 50 },
  { label: "EMAIL", used: 346, total: 1000 },
  { label: "DEVICE", used: 45, total: 50 },
  { label: "CONTACT", used: 4, total: 10 },
  { label: "TRIGGER", used: 480, total: 500 },
  { label: "Dashboard Widget", used: 3, total: 10 },
  { label: "REPORT", used: 17, total: 70 },
];

// Sample data for device activity
const deviceActivity = [
  { name: "VI MIXER", lastActivity: "17/08/23 @ 03:00:08 am" },
  { name: "VI CUTTER", lastActivity: "17/08/23 @ 03:00:08 am" },
  { name: "AGITATOR MIXER 1", lastActivity: "17/08/23 @ 03:00:08 am" },
  { name: "NAS TANK", lastActivity: "17/08/23 @ 03:00:08 am" },
  { name: "BLENDER 09", lastActivity: "17/08/23 @ 03:00:08 am" },
];

export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Map Section */}
      {/* <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>Interactive Map View</Text>
      </View> */}

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Account Quota Stats</Text>
        {quotaData.map((item, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <View style={styles.statBarContainer}>
              <LinearGradient
                colors={["#3B82F6", "#60A5FA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.statBar,
                  { width: `${(item.used / item.total) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.statValue}>
              {item.used}/{item.total}
            </Text>
          </View>
        ))}
      </View>

      {/* Activity Sections */}
      <View style={styles.activitiesContainer}>
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <View style={styles.activityHeaderIcon}>
              <Text style={styles.activityIconText}>📊</Text>
            </View>
            <Text style={styles.activityTitle}>Trigger/Report Activity</Text>
          </View>
          <View style={styles.activityContent}>
            <ActivityMap />
          </View>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <View style={styles.activityHeaderIcon}>
              <Text style={styles.activityIconText}>📱</Text>
            </View>
            <Text style={styles.activityTitle}>Device Activity</Text>
          </View>
          <View style={styles.activityContent}>
            {deviceActivity.map((device, index) => (
              <View key={index} style={styles.deviceItem}>
                <View style={styles.deviceStatusDot} />
                <View>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceLastActivity}>
                    Last Activity: {device.lastActivity}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    padding: 16,
  },
  mapContainer: {
    height: 200,
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholder: {
    fontSize: 16,
    color: "#64748B",
  },
  statsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    width: 120,
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    borderRadius: 4,
  },
  statValue: {
    width: 80,
    fontSize: 14,
    color: "#4B5563",
    textAlign: "right",
    fontWeight: "500",
  },
  activitiesContainer: {
    flexDirection: "column",
    gap: 16,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  activityHeaderIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  activityContent: {
    padding: 16,
  },
  activitySubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  activityInfo: {
    fontSize: 14,
    color: "#4B5563",
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  deviceStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 12,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  deviceLastActivity: {
    fontSize: 12,
    color: "#6B7280",
  },
});
