import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createThemedStyles } from "../../constants/styles";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../context/ThemeContext";
import {
  detectAPI,
  fetchRecords,
  triggerClassification,
  getAPIBase,
} from "../../lib/api";

export default function HomeScreen() {
  const [isClassifying, setIsClassifying] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const { isDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);

  // 🧭 Detect Raspberry Pi IP automatically
  useEffect(() => {
    detectAPI();
  }, []);

  // 🧾 Fetch the latest record
  const handleFetchLatest = async () => {
    try {
      const data = await fetchRecords();
      data.sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
      setLastResult(data[0] ?? null);
    } catch (e) {
      setLastResult({ error: e.message || "Failed to reach API" });
    }
  };

  // 📸 Trigger camera_classify.py remotely
  const handleCaptureAndClassify = async () => {
    setIsClassifying(true);
    try {
      const res = await fetch(`${getAPIBase()}/run-classify`, {
        method: "POST",
      });
      const json = await res.json();

      if (json.status === "success") {
        Alert.alert("✅ Classification Complete", json.message || "Success!");
        await handleFetchLatest(); // Refresh after capture
      } else {
        Alert.alert("⚠️ Classification Error", json.message || "Failed to classify.");
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
      Alert.alert("❌ Network Error", "Unable to contact Raspberry Pi.");
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <ScrollView style={styles.screenContainerPadded}>
      <Text
        style={[
          styles.placeholderText,
          {
            margin: 10,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          },
        ]}
      >
        Detect. Classify. Cultivate Better.
      </Text>

      <Text
        style={[
          styles.statusText,
          {
            marginBottom: 20,
            fontSize: 15,
            fontWeight: "300",
            textAlign: "center",
          },
        ]}
      >
        Click below to capture and classify a new potato
      </Text>

      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {/* === Capture & Classify Button === */}
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.button, isClassifying && { backgroundColor: "#888" }]}
          onPress={handleCaptureAndClassify}
          disabled={isClassifying}
        >
          {isClassifying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>📸 Capture & Classify</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* === Latest Result === */}
      {lastResult && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Result</Text>
          {"error" in lastResult ? (
            <Text style={{ color: "#E57373" }}>{lastResult.error}</Text>
          ) : (
            <>
              <Text style={styles.statusText}>
                Class: {lastResult.class ?? "Unknown"}
              </Text>
              <Text style={styles.statusText}>
                Confidence:{" "}
                {lastResult.confidence != null
                  ? `${Number(lastResult.confidence).toFixed(2)}%`
                  : "—"}
              </Text>
              <Text style={styles.statusText}>
                Time:{" "}
                {lastResult.timestamp
                  ? new Date(lastResult.timestamp).toLocaleString()
                  : ""}
              </Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}
