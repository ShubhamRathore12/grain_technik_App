import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DeviceCard from "@/components/DeviceCard";
import { Device } from "@/types";
import Colors from "@/constants/Colors";
import plc1 from "@/assets/images/1200.jpg";
import plc2 from "@/assets/images/200.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sampleDevices: Device[] = [
  {
    id: "1",
    name: "S7-1200",
    model: "PLC Controller",
    status: "Active",
    imageUrl: plc1,
  },
  {
    id: "2",
    name: "S7-200",
    model: "PLC Controller",
    status: "Active",
    imageUrl: plc2,
  },
];

const locations = ["All Locations", "Location 1", "Location 2"];
const companies = ["All Companies", "Company A", "Company B"];

export default function DevicesScreen() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  const handleDevicePress = (device: Device) => {
    console.log("Device pressed:", device);
    // Navigate to device details or perform another action
  };
  const [storedData, setStoredData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const storedValue = await AsyncStorage.getItem("value");
      if (storedValue) {
        setStoredData(JSON.parse(storedValue));
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Devices Overview</Text>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Location Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>Select Location</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedLocation}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          {isLocationDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {locations
                .filter((location) => location !== storedData?.user?.location) // ✅ Fix
                .map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedLocation(location);
                      setIsLocationDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{location}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>Select Company</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
          >
            <Text style={styles.dropdownText}>{selectedCompany}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
          {/* Company Dropdown */}
          {isCompanyDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {companies
                .filter((company) => company !== storedData?.user?.company) // ✅ Fix
                .map((company) => (
                  <TouchableOpacity
                    key={company}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCompany(company);
                      setIsCompanyDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{company}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </View>

      {/* Device List */}
      <FlatList
        data={sampleDevices}
        renderItem={({ item }) => (
          <DeviceCard device={item} onPress={handleDevicePress} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.deviceList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dropdownContainer: {
    width: "48%",
    zIndex: 10,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dropdownText: {
    fontSize: 14,
    color: "#1F2937",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#6B7280",
  },
  dropdownMenu: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 100,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1F2937",
  },
  deviceList: {
    paddingBottom: 20,
  },
});
