// DeviceDetailsScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Settings,
  CircleAlert,
  Gauge,
  Power,
  FileInput,
  FileOutput,
  TestTube,
  ArrowLeft,
} from "lucide-react-native";
import Colors from "@/constants/Colors";
import DefaultsView from "./DefaultsView";
import DateTimeView from "./DateTimeView";
import LoggingSettingsView from "./LoggingSettingsView";
import OperatingHoursView from "./OperatingHoursView";
import AnalogView from "./AnalogView";
import OutputView from "./OutputView";
import InputView from "./InputView";
import AutoView from "./AutoView";
import AerationView from "./AerationView"; // <- new import
import AerationControlView from "./AerationControlView";
import CurrentFaultsView from "./CurrentFaultsView";
import FaultCodeView from "./FaultCodeView";
import TestSelectionView from "./TestSelectionView";
import Test1ControlView from "./Test1ControlView";
import Test2ControlView from "./Test2ControlView";

const settingsOptions = [
  "DEFAULTS",
  "DATE & TIME",
  "DATA LOG",
  "OPERATING HOURS",
];

export default function DeviceDetailsScreen() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [currentView, setCurrentView] = useState("menu");
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [animations] = useState(
    settingsOptions.map(() => new Animated.Value(1))
  );

  const [defaultsData, setDefaultsData] = useState({
    T1: 0,
    THT1: 0,
    deltaA: 0,
    hp: 0,
    autoAeration: 0,
  });

  const [plcDateTime, setPlcDateTime] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [logInterval, setLogInterval] = useState(0);
  const [operatingTime, setOperatingTime] = useState({ hours: 0, minutes: 0 });

  const fetchOperatingHours = async () => {
    try {
      const response = await Promise.resolve({ hours: 10, minutes: 25 });
      setOperatingTime(response);
    } catch {
      setOperatingTime({ hours: 0, minutes: 0 });
    }
  };

  const resetOperatingHours = async () => {
    try {
      await Promise.resolve();
      setOperatingTime({ hours: 0, minutes: 0 });
    } catch (e) {
      console.error("Reset failed", e);
    }
  };

  useEffect(() => {
    if (selectedSetting === "OPERATING HOURS") fetchOperatingHours();
  }, [selectedSetting]);

  useEffect(() => {
    if (selectedSetting === "DEFAULTS") fetchDefaultsData();
    else if (selectedSetting === "DATE & TIME") fetchDateTime();
    else if (selectedSetting === "DATA LOG") fetchLogInterval();
  }, [selectedSetting]);

  const fetchDefaultsData = async () => {
    try {
      const response = await Promise.resolve({
        T1: 1,
        THT1: 0,
        deltaA: 0,
        hp: 0,
        autoAeration: 1,
      });
      setDefaultsData(response);
    } catch (error) {
      console.error("Error fetching defaults:", error);
    }
  };

  const fetchDateTime = async () => {
    try {
      const response = await Promise.resolve({
        year: 2025,
        month: 4,
        day: 25,
        hour: 14,
        minute: 30,
        second: 45,
      });
      setPlcDateTime(response);
    } catch (err) {
      console.error("Failed to fetch date & time", err);
      setPlcDateTime({
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      });
    }
  };

  const fetchLogInterval = async () => {
    try {
      const response = await Promise.resolve({ logInterval: 5 });
      setLogInterval(response.logInterval);
    } catch (err) {
      setLogInterval(0);
    }
  };

  const handleSettingSelect = (item: string, index: number) => {
    setSelectedSetting(item);
    Animated.sequence([
      Animated.timing(animations[index], {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderSettingsView = () => {
    if (selectedSetting === "DEFAULTS")
      return (
        <DefaultsView
          defaultsData={defaultsData}
          onBack={() => setSelectedSetting(null)}
        />
      );
    if (selectedSetting === "DATE & TIME")
      return (
        <DateTimeView
          plcDateTime={plcDateTime}
          onBack={() => setSelectedSetting(null)}
        />
      );
    if (selectedSetting === "DATA LOG")
      return (
        <LoggingSettingsView
          logInterval={logInterval}
          onBack={() => setSelectedSetting(null)}
        />
      );
    if (selectedSetting === "OPERATING HOURS")
      return (
        <OperatingHoursView
          operatingTime={operatingTime}
          onReset={resetOperatingHours}
          onBack={() => setSelectedSetting(null)}
        />
      );

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.settingsTitle}>SETTINGS</Text>
        <View style={styles.settingsGrid}>
          {settingsOptions.map((item, index) => (
            <Animated.View
              key={index}
              style={[
                { transform: [{ scale: animations[index] }] },
                styles.settingsButton,
                selectedSetting === item && styles.settingsButtonActive,
              ]}
            >
              <TouchableOpacity
                style={{ width: "100%", alignItems: "center" }}
                onPress={() => handleSettingSelect(item, index)}
              >
                <Text style={styles.settingsButtonText}>{item}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return renderSettingsView();
      case "aeration_menu":
        return (
          <AerationView
            onWithoutHeating={() => setCurrentView("aeration_without")}
            onWithHeating={() => setCurrentView("aeration_with")}
            onBack={() => setCurrentView("menu")}
          />
        );
      case "aeration_without":
        return (
          <AerationControlView
            mode="WITHOUT_HEATING"
            onBack={() => setCurrentView("aeration_menu")}
            deviceId={id}
          />
        );
      case "aeration_with":
        return (
          <AerationControlView
            mode="WITH_HEATING"
            onBack={() => setCurrentView("aeration_menu")}
            deviceId={id}
          />
        );
      case "input":
        return (
          <InputView
            onBack={() => setCurrentView("menu")}
            onAnalog={() => setCurrentView("analog")}
            onOutput={() => setCurrentView("output")}
          />
        );
      case "analog":
        return <AnalogView onBack={() => setCurrentView("input")} />;
      case "output":
        return <OutputView onBack={() => setCurrentView("input")} />;
      case "auto":
        return <AutoView onBack={() => setCurrentView("menu")} id={id} />;
      case "fault":
        return (
          <CurrentFaultsView
            onBack={() => setCurrentView("menu")}
            onFaultCode={() => setCurrentView("fault_code")}
          />
        );
      case "fault_code":
        return <FaultCodeView onBack={() => setCurrentView("fault")} />;
      case "test":
        return (
          <TestSelectionView
            onBack={() => setCurrentView("menu")}
            onSelectTest1={() => setCurrentView("test1")}
            onSelectTest2={() => setCurrentView("test2")}
          />
        );
      case "test1":
        return (
          <Test1ControlView
            onBack={() => setCurrentView("test")}
            onNext={() => setCurrentView("test2")}
          />
        );
      case "test2":
        return <Test2ControlView onBack={() => setCurrentView("test")} />;

      default:
        return (
          <View style={styles.menuGrid}>
            {[
              { id: "auto", icon: Power, label: "AUTO" },
              { id: "aeration_menu", icon: Gauge, label: "AERATION" },
              { id: "fault", icon: CircleAlert, label: "FAULT" },
              { id: "settings", icon: Settings, label: "SETTINGS" },
              { id: "input", icon: FileInput, label: "INPUT" },
              { id: "output", icon: FileOutput, label: "OUTPUT" },
              { id: "test", icon: TestTube, label: "TEST" },
            ].map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => setCurrentView(item.id)}
              >
                <item.icon size={24} color={Colors.brand.primary} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
    }
  };

  const headerTitle = (() => {
    switch (currentView) {
      case "menu":
        return `SR.NO.${id}`;
      case "settings":
        return selectedSetting || "SETTINGS";
      case "aeration_menu":
        return "AERATION";
      case "aeration_without":
        return "AERATION WITHOUT HEATING";
      case "aeration_with":
        return "AERATION WITH HEATING";
      case "input":
        return "INPUT";
      case "analog":
        return "ANALOG";
      case "output":
        return "OUTPUT";
      case "auto":
        return "AUTO";
      case "fault":
        return "FAULT";
      case "test":
        return "TEST";

      default:
        return currentView.toUpperCase();
    }
  })();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (currentView === "menu") router.back();
            else {
              setSelectedSetting(null);
              setCurrentView("menu");
            }
          }}
        >
          <ArrowLeft size={24} color="#374151" />
          <Text style={styles.backButtonText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  backButton: { flexDirection: "row", alignItems: "center", padding: 8 },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  contentContainer: { padding: 16 },
  menuGrid: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  menuItem: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  settingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 20,
  },
  settingsButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
    width: "40%",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  settingsButtonActive: { backgroundColor: "#1F2937" },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
});
