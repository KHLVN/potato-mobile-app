import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../components/icons';
import { createThemedStyles, HEALTH_CONFIG, darkTheme, lightTheme } from '../../constants/styles';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  const styles = createThemedStyles(isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.tabColor, ...styles.header },
        headerTitleStyle: { color: theme.textPrimary },
        headerTintColor: theme.textPrimary,
        tabBarStyle: { backgroundColor: theme.tabColor, ...styles.tabBar },
        tabBarActiveTintColor: theme.activeTabBar, //
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <TabBarIcon name="pie-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}