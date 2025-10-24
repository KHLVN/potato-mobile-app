// app/(tabs)/index.jsx
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { createThemedStyles } from "../../constants/styles";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../context/ThemeContext";
import { fetchRecords } from "../../lib/api";

export default function HomeScreen() {
  const [isClassifying, setIsClassifying] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const { isDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);

  const handleStartBatch = async () => {
    setIsClassifying(true);
    try {
      const data = await fetchRecords();
      data.sort((a, b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
      setLastResult(data[0] ?? null);
    } catch (e) {
      setLastResult({ error: e.message || "Failed to reach API" });
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <ScrollView style={styles.screenContainerPadded}>
      <Text style={[styles.placeholderText, { margin: 10, fontSize: 24, fontWeight: "bold", textAlign: "center" }]}>Detect. Classify. Cultivate Better.</Text>
      <Text style={[styles.statusText, { marginBottom: 20, fontSize: 15, fontWeight: "300", textAlign: "center" }]}>Click the Button below to start classifying</Text>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={handleStartBatch} disabled={isClassifying}>
          <Text style={styles.buttonText}>
            {isClassifying ? "CHECKING..." : "START NEW BATCH"}
          </Text>
        </TouchableOpacity>
      </View>

      {lastResult && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Result</Text>
          {"error" in lastResult ? (
            <Text style={{ color: "#E57373" }}>{lastResult.error}</Text>
          ) : (
            <>
              <Text style={styles.statusText}>Class: {lastResult.class ?? "Unknown"}</Text>
              <Text style={styles.statusText}>
                Confidence: {lastResult.confidence != null ? `${Number(lastResult.confidence).toFixed(2)}%` : "—"}
              </Text>
              <Text style={styles.statusText}>
                Time: {lastResult.timestamp ? new Date(lastResult.timestamp).toLocaleString() : ""}
              </Text>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}
