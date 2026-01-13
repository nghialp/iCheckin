/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import App from './App';
import { name as appName } from './app.json';

// Load Apollo error messages for debugging
if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

AppRegistry.registerComponent(appName, () => App);
