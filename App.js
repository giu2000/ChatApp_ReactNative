import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Providers } from './src/navigation';

import { RegistrationScreen } from './src/screens';
import { LoginScreen } from './src/screens';

export default function App() {
  return (
      <Providers />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
