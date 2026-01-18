import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RadioHomeScreen from '../screens/RadioHomeScreen';
import RadioChannelScreen from '../screens/RadioChannelScreen';

const Stack = createNativeStackNavigator();

export default function RadioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RadioHome" component={RadioHomeScreen} />
      <Stack.Screen name="RadioChannel" component={RadioChannelScreen} />
    </Stack.Navigator>
  );
}
