// app/(tabs)/settings.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { createThemedStyles, HEALTH_CONFIG } from "../../constants/styles";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE, fetchRecords } from "../../lib/api";

export default function SettingsScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { isDarkMode, setIsDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);

  const handleCheckConnection = async () => {
    setIsScanning(true);
    try {
      const res = await fetch(`${API_BASE}/`);
      setIsConnected(res.ok);
    } catch {
      setIsConnected(false);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.screenContainerPadded}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Device Connectivity</Text>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: isConnected
                  ? HEALTH_CONFIG.Healthy.color
                  : HEALTH_CONFIG.Bacterial.color,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {isConnected ? "Connected to Raspberry Pi" : "Pi unreachable"}
          </Text>
        </View>

        {isConnected ? (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: HEALTH_CONFIG.Bacterial.color },
            ]}
            onPress={() => setIsConnected(false)}
          >
            <Text
              style={[
                styles.buttonText,
                { color: HEALTH_CONFIG.Bacterial.textColor },
              ]}
            >
              DISCONNECT
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleCheckConnection}
            disabled={isScanning}
          >
            <Text style={styles.buttonText}>
              {isScanning ? "CHECKING..." : "CHECK CONNECTION"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appearance</Text>
        <View style={styles.settingRow}>
          <Text style={styles.statusText}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#767577", true: "#88C0D0" }}
            thumbColor={isDarkMode ? "#2E3440" : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
}
