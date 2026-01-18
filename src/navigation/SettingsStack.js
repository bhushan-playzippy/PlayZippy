import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/Settings/ProfileScreen';
import KidsProfileScreen from '../screens/Settings/KidsProfileScreen';
import LearningThemeScreen from '../screens/Settings/ParentingScreen';
import KidProfileViewScreen from '../screens/Settings/KidProfileViewScreen';
import FaqScreen from '../screens/Settings/FaqScreen';
import OrdersListScreen from '../screens/Settings/OrdersListScreen';
import OrderDetailsScreen from '../screens/Settings/OrderDetailsScreen';
import ContentSafetyScreen from '../screens/Settings/ContentSafetyScreen';
import ParentingScreen from '../screens/Settings/ParentingScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />

      {/* 🔥 THIS SCREEN HIDES TAB BAR AUTOMATICALLY */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="KidsProfile" component={KidsProfileScreen} />
      <Stack.Screen name="ContentSafety" component={ContentSafetyScreen} />

      <Stack.Screen name="Parenting" component={ParentingScreen} />

      <Stack.Screen name="KidProfileView" component={KidProfileViewScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
      <Stack.Screen name="Orders" component={OrdersListScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
}
