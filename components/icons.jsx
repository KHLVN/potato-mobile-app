import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

export function TabBarIcon({ name, color }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} name={name} color={color} />;
}
