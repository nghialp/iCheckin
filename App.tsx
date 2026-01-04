/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme';
import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import { ApolloWrapper } from './src/providers/ApolloWrapper';
import { AuthProvider } from './src/providers/AuthProvider';
import ErrorBoundary from './src/components/common/ErrorBoundary';
enableScreens();

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ApolloWrapper>
          <AuthProvider>
            <PaperProvider theme={theme as any}>
              <StatusBar barStyle="dark-content" />
              <AppNavigator />
            </PaperProvider>
          </AuthProvider>
        </ApolloWrapper>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

