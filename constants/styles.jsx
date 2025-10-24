import { StyleSheet, Platform } from "react-native";

export const darkTheme = {
  bgColor: "#3B4252",
  tabColor: "#2E3440",
  cardColor: "#4C566A",
  textPrimary: "#ECEFF4",
  textSecondary: "#F39C12",
  activeTabBar: "#f36c12ff",
};

export const lightTheme = {
  bgColor: "#FFFFFF",
  tabColor: "#f8f8f8ff",
  cardColor: "#FFFFFF",
  textPrimary: "#1F2937",
  textSecondary: "#F39C12",
  activeTabBar: "#f36c12ff",
};

export const HEALTH_CONFIG = {
  Healthy: { color: '#27C840', textColor: '#000000' },
  Bacterial: { color: '#FF5F57', textColor: '#FFFFFF' },
  Fungal: { color: '#FDB027', textColor: '#000000' },
};

export const createThemedStyles = (isDarkMode) => {
  const theme = isDarkMode ? darkTheme : lightTheme;

  return StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.bgColor,
    },
    screenContainerPadded: {
      flex: 1,
      backgroundColor: theme.bgColor,
      paddingHorizontal: 16,
      paddingTop: Platform.OS === "ios" ? 0 : 8,
    },
    screenContainerWithPadding: {
      flex: 1,
      backgroundColor: theme.bgColor,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 34,
      fontWeight: "bold",
      color: theme.textPrimary,
      marginBottom: 8,
      marginTop: Platform.OS === "ios" ? 0 : 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      marginBottom: 24,
    },
    card: {
      backgroundColor: theme.cardColor,
      borderRadius: 16,
      padding: 20,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.18 : 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    smallCard: {
      backgroundColor: theme.cardColor,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
    },
    imageContainer: {
      height: 250,
      backgroundColor: theme.tabColor,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
      overflow: "hidden",
    },
    imageRowContainer: {
      backgroundColor: theme.tabColor,
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 10,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    placeholderText: {
      color: theme.textSecondary,
      fontSize: 18,
    },
    resultBanner: {
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 20,
    },
    resultBannerText: {
      color: theme.textPrimary,
      fontSize: 20,
      fontWeight: "900",
    },
    refreshButton: {
      alignItems: "flex-end",
      marginTop: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: "#F39C12",
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    buttonText: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: "bold",
    },
    listItem: {
      flexDirection: "row",
      backgroundColor: theme.cardColor,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 10,
      marginBottom: 12,
      alignItems: "center",
    },
    listItemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 15,
      backgroundColor: theme.tabColor,
    },
    listItemContent: {
      flex: 1,
    },
    listItemHealth: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 4,
      color: theme.textPrimary,
    },
    listItemDetails: {
      fontSize: 14,
      color: theme.textPrimary,
      marginBottom: 6,
    },
    listItemDate: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    statCard: {
      backgroundColor: theme.cardColor,
      borderRadius: 12,
      marginBottom: 15,
      padding: 20,
      alignItems: "center",
      borderTopWidth: 5,
    },
    statLabel: {
      fontSize: 18,
      color: theme.textPrimary,
      fontWeight: "600",
    },
    statCount: {
      fontSize: 48,
      color: theme.textPrimary,
      fontWeight: "900",
      marginVertical: 5,
    },
    statPercentage: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.textPrimary,
      marginBottom: 15,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 25,
    },
    statusIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 10,
    },
    statusText: {
      fontSize: 16,
      color: theme.textPrimary,
    },
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: "#4446",
      paddingVertical: 8,
    },
    tabBar: {
      backgroundColor: theme.tabColor,
      borderTopWidth: 0,
      height: 90,
    },
    header: {
      backgroundColor: theme.tabColor,
      shadowOpacity: 0,
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerTitle: {
      color: theme.textPrimary,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
};
