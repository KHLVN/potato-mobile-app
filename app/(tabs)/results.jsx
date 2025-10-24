import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createThemedStyles, HEALTH_CONFIG } from "../../constants/styles";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { useRecords } from "../../lib/useRecords";
import { useRouter } from "expo-router";

export default function ResultsScreen() {
  const { isDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);
  const { records, loading, refresh } = useRecords(true);
  const router = useRouter();

  if (loading) {
    return (
      <View
        style={[
          styles.screenContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#F39C12" />
        <Text style={styles.statusText}>Loading records...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <View style={styles.screenContainerPadded}>
        {/* 🔄 Manual Refresh Button */}
        <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
          <TouchableOpacity
            style={[
              styles.button,
              { paddingHorizontal: 20, paddingVertical: 8 },
            ]}
            onPress={refresh}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={records}
          keyExtractor={(item) => item._id || Math.random().toString()}
          ListHeaderComponent={() => (
            <View style={styles.card}>
              <Text style={styles.resultBannerText}>Classification Results</Text>
            </View>
          )}
          renderItem={({ item }) => {
            const classColor = HEALTH_CONFIG[item.class]?.color || "#F39C12";
            return (
              <View style={styles.listItem}>
                {item.image_url ? (
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.listItemImage}
                  />
                ) : (
                  <View
                    style={[styles.listItemImage, { backgroundColor: "#ccc" }]}
                  />
                )}
                <View style={styles.listItemContent}>
                  <Text
                    style={[
                      styles.listItemHealth,
                      { color: classColor },
                    ]}
                  >
                    {item.class}
                  </Text>
                  <Text style={styles.listItemDetails}>
                    Confidence: {item.confidence.toFixed(2)}%
                  </Text>
                  <Text style={styles.listItemDate}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={[styles.button, { marginTop: 20, marginBottom: 40 }]}
              onPress={() =>
                router.push({
                  pathname: "/analytics",
                  params: { data: JSON.stringify(records) },
                })
              }
            >
              <Text style={styles.buttonText}>View Summary</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ThemeProvider>
  );
}
