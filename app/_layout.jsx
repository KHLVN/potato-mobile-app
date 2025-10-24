import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar/>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
