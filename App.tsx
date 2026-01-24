/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/theme';
import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import { ApolloWrapper } from './src/providers/ApolloWrapper';
import { AuthProvider } from './src/providers/AuthProvider';
import { CheckInProvider, CheckInContext } from './src/providers/CheckInProvider';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import CheckInModal from './src/components/common/CheckInModal';
import { initializeMapbox } from './src/utils/mapboxConfig';
enableScreens();

// Initialize Mapbox with access token
initializeMapbox();

function AppContent() {
  const { isModalVisible, nearbyPlaces, closeCheckInModal } = useContext(CheckInContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
      <CheckInModal
        visible={isModalVisible}
        onClose={closeCheckInModal}
        nearbyPlaces={nearbyPlaces}
      />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ApolloWrapper>
          <AuthProvider>
            <CheckInProvider>
              <PaperProvider theme={theme as any}>
                <AppContent />
              </PaperProvider>
            </CheckInProvider>
          </AuthProvider>
        </ApolloWrapper>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

