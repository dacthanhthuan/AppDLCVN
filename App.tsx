import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MainTab' component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


const MainTab = () => {
  return (
    <Tab.Navigator tabBar={(prop) => <MyTabBar {...prop} />} screenOptions={tabOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="DoiDiem" component={Home} />
      <Tab.Screen name="NhaCC" component={Home} />
      <Tab.Screen name="Notification" component={Home} />
      <Tab.Screen name="User" component={Home} />
    </Tab.Navigator>
  )
}


const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
}

const MyTabBar: React.FunctionComponent<BottomTabBarProps> =
  ({ state, navigation }) => {
    let image: any;

    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          switch (route.name) {
            case "Home":
              image = require('./src/assets/Rectangle347.png')
              break;
            case "DoiDiem":
              image = require('./src/assets/Rectangle348.png')
              break;
            case "NhaCC":
              image = require('./src/assets/Rectangle335.png')
              break;
            case "Notification":
              image = require('./src/assets/Rectangle336.png')
              break;
            case "User":
              image = require('./src/assets/Rectangle344.png')
              break;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={index}
              onPress={onPress}
              style={[styles.tabBarIconBackground,
              { backgroundColor: isFocused ? "white" : "transparent" }]}>
              <Image source={image} style={[styles.tabBarIcon,
              { tintColor: isFocused ? "#005AA9" : "white", }]} />
            </Pressable>
          );
        })}
      </View >
    );
  }


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: "#005AA9",
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  tabBarIconBackground: {
    height: 40,
    width: 40,
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center'
  },

  tabBarIcon: {
    transform: [{ rotate: "-45deg" }],
    width: "63%",
    height: "63%",
    alignSelf: 'center'
  }
});

export default App;
