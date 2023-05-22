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
    <Tab.Navigator screenOptions={tabOptions} tabBar={(prop) => <MyTabBar {...prop} />}>
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
  tabBarStyle: { backgroundColor: "#005AA9" },
  tabBarActiveTintColor: "#005AA9",
  tabBarActiveBackgroundColor: "white",
  tabBarInactiveTintColor: "white",
  tabBarItemStyle: {
    marginHorizontal: "5%",
    marginVertical: "1%",
    height: "80%",
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  tabBarIconStyle: {
    transform: [{ rotate: '-45deg' }],
  },
}


const IconTabBar: React.FunctionComponent<Icontype> = ({ prop, routeName }) => {
  let src = './src/assets/';

  switch (routeName) {
    case "Home":
      src += 'Rectangle347.png';
      break;
    case "DoiDiem":
      src += 'Rectangle348.png';
      break;
    case "NhaCC":
      src += 'Rectangle335.png';
      break;
    case "Notification":
      src += 'Rectangle336.png';
      break;
    case "User":
      src += 'Rectangle344.png';
      break;
  }

  return (
    <Image source={require('./src/assets/Rectangle347.png')} style={{
      width: "60%", height: "60%", tintColor: prop.focused ? "#005AA9" : "white"
    }} />
  )

}


type Icontype = {
  prop: {
    focused: boolean,
    color: string,
    size: number,
  },
  routeName: string,
}

const MyTabBar: React.FunctionComponent<BottomTabBarProps> =
  ({ state, descriptors, navigation }) => {
    return (
      <View style={{ flexDirection: 'row', height: "8%", backgroundColor: "#005AA9" }}>
        {state.routes.map((route, index) => {
          let src = './src/assets/';

          switch (route.name) {
            case "Home":
              src += 'Rectangle347.png';
              break;
            case "DoiDiem":
              src += 'Rectangle348.png';
              break;
            case "NhaCC":
              src += 'Rectangle335.png';
              break;
            case "Notification":
              src += 'Rectangle336.png';
              break;
            case "User":
              src += 'Rectangle344.png';
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
              onPress={onPress}
              style={{ flex: 1, alignSelf: 'center' }}>
              <Text>{src}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
