// app/(tabs)/settings.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { createThemedStyles, HEALTH_CONFIG } from "../../constants/styles";
import { useTheme } from "../../context/ThemeContext";
import { detectAPI, fetchRecords } from "../../lib/api"; // 👈 import updated functions

export default function SettingsScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [piIp, setPiIp] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const { isDarkMode, setIsDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);

  // === Handle check connection ===
  const handleCheckConnection = async () => {
    setIsScanning(true);
    try {
      // 👇 Step 1: Auto-detect Pi’s current IP dynamically
      await detectAPI();

      // 👇 Step 2: Actually test connection
      const data = await fetchRecords();
      if (Array.isArray(data)) {
        setIsConnected(true);
        setPiIp("Detected via Flask /ip");
      } else {
        setIsConnected(false);
      }
    } catch (err) {
      console.warn("Connection error:", err);
      setIsConnected(false);
    } finally {
      setLastChecked(new Date());
      setIsScanning(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    handleCheckConnection();
  }, []);

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
            {isConnected
              ? "Connected to Raspberry Pi"
              : "Pi unreachable"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            isConnected
              ? { backgroundColor: HEALTH_CONFIG.Bacterial.color }
              : {},
          ]}
          onPress={
            isConnected
              ? () => setIsConnected(false)
              : handleCheckConnection
          }
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={[
                styles.buttonText,
                isConnected && { color: HEALTH_CONFIG.Bacterial.textColor },
              ]}
            >
              {isConnected ? "DISCONNECT" : "CHECK CONNECTION"}
            </Text>
          )}
        </TouchableOpacity>

        {lastChecked && (
          <Text style={[styles.statusText, { marginTop: 8, fontSize: 13 }]}>
            Last checked: {lastChecked.toLocaleTimeString()}
          </Text>
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
