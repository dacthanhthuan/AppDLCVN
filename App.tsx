import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';

const Tab = createBottomTabNavigator();

const App = () => {
  return <NavigationContainer>
 <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  </NavigationContainer>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
