import React, { useMemo } from "react";
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { createThemedStyles } from "../../constants/styles";
import { useTheme, ThemeProvider } from "../../context/ThemeContext";
import { BarChart } from "react-native-chart-kit";
import { useLocalSearchParams } from "expo-router";
import { HEALTH_CONFIG } from "../../constants/styles";
import { useRecords } from "../../lib/useRecords";

export default function AnalyticsScreen() {
  const { isDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);
  const { records, loading, refresh } = useRecords(true); // live refresh
  const { data } = useLocalSearchParams();

  // Parse navigation data or fall back to live records
  const parsedData = useMemo(() => {
    try {
      return data ? JSON.parse(data) : records;
    } catch {
      return records;
    }
  }, [data, records]);

  // Count totals
  const counts = parsedData.reduce(
    (acc, item) => {
      acc[item.class] = (acc[item.class] || 0) + 1;
      return acc;
    },
    { Fungal: 0, Bacterial: 0, Healthy: 0 }
  );

  const chartData = {
    labels: ["Fungal", "Bacterial", "Healthy"],
    datasets: [
      {
        data: [counts.Fungal, counts.Bacterial, counts.Healthy],
        colors: [
          (opacity = 1) => HEALTH_CONFIG.Fungal.color,
          (opacity = 1) => HEALTH_CONFIG.Bacterial.color,
          (opacity = 1) => HEALTH_CONFIG.Healthy.color,
        ],
      },
    ],
  };

  return (
    <ThemeProvider>
      <ScrollView style={[styles.screenContainer, { padding: 20 }]}>
        <Text
          style={[
            styles.resultBannerText,
            { textAlign: "center", marginBottom: 20 },
          ]}
        >
          Classification Summary
        </Text>

        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={250}
          yAxisLabel=""
          fromZero={true}
          withCustomBarColorFromData={true}
          flatColor={false}
          chartConfig={{
            backgroundColor: isDarkMode ? "#4C566A" : "#FFFFFF", // match card background
            backgroundGradientFrom: isDarkMode ? "#4C566A" : "#FFFFFF",
            backgroundGradientTo: isDarkMode ? "#4C566A" : "#FFFFFF",
            decimalPlaces: 0,
            color: (opacity = 1) => (isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`),
            labelColor: (opacity = 1) => (isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`),
            barPercentage: 1.2,
            propsForLabels: { fontSize: 13, fontWeight: "600" },
            propsForBackgroundLines: { strokeDasharray: "", strokeWidth: 0.3},
          }}
          style={{
            borderRadius: 10,
            marginVertical: 10

          }}
        />

        <View style={styles.card}>
          <Text
            style={[
              styles.statusText,
              { color: HEALTH_CONFIG.Fungal.color, fontWeight: "bold" },
            ]}
          >
            Fungal: {counts.Fungal}
          </Text>
          <Text
            style={[
              styles.statusText,
              { color: HEALTH_CONFIG.Bacterial.color, fontWeight: "bold" },
            ]}
          >
            Bacterial: {counts.Bacterial}
          </Text>
          <Text
            style={[
              styles.statusText,
              { color: HEALTH_CONFIG.Healthy.color, fontWeight: "bold" },
            ]}
          >
            Healthy: {counts.Healthy}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20, marginBottom: 40 }]}
          onPress={refresh}
        >
          <Text style={styles.buttonText}>Refresh Analytics</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemeProvider>
  );
}
