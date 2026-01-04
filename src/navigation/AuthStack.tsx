// src/navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/auth/LoginPage';
import SignUpPage from '../screens/auth/SignUpPage';
import ForgotPasswordPage from '../screens/auth/ForgotPasswordPage';
import EmailSentPage from '../screens/auth/EmailSentPage';

const Stack = createNativeStackNavigator(); 

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{ headerShown: false }} />
      <Stack.Screen name="EmailSent" component={EmailSentPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
