import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Keyboard, View} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  interpolate,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import Supplier from './src/screens/Supplier';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DetailProduct from './src/screens/DetailProduct';
import Detail_User from './src/screens/DetailUser';
import CreateOrder from './src/screens/CreateOrder';
import DetailOrder from './src/screens/DetailOrder';
import Payment from './src/screens/Payment';
import InforTranfer from './src/screens/InforTranfer';
import TranferMoneyTwo from './src/screens/TranferMoneyTwo';
import WithdrawHistory from './src/screens/WithdrawHistory';
import RechargeHistory from './src/screens/RechargeMoney';
import Sales from './src/screens/Sales/Sales_1/index';
import Sales_2 from './src/screens/Sales/Sales_2';
import Sales_3 from './src/screens/Sales/Sales_3';
import Walk from './src/screens/Walk';
import WalletScreen from './src/screens/MainWallet/MainWallet_1';
import WalletScreen_2 from './src/screens/MainWallet/MainWallet_2';
import OverView from './src/screens/OverView';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Home from './src/screens/Home';
import UpdateAddressMain from './src/screens/UpdateAddressScreen2';
import Warehouse from './src/screens/Warehouse';
import Cart from './src/screens/Cart';
import 'react-native-gesture-handler';
import NotLogin from './src/screens/NotLogin';
import Menu from './src/screens/Menu';
import Profile from './src/screens/Profile';
import Team from './src/screens/Team';
import SearchTeam from './src/screens/SearchTeam';
import CustomerManagement from './src/screens/CustomerManagement';
import WithDraw from './src/screens/WithDraw';
import Recharge from './src/screens/Recharge';
import TransferMoney from './src/screens/TransferMoney';
import SuccPayment from './src/screens/SuccPayment';
import NoOrders from './src/screens/NoOrders';
import TeamThree from './src/screens/TeamThree';
import CartEmpty from './src/screens/CartEmpty';
import Notifications from './src/screens/Notifications';
import SearchProduct from './src/screens/SearchProduct';
import SearchRecent from './src/screens/SearchRecent';
import CustomerInformation from './src/screens/CustomerInformation';
import AddAddress from './src/screens/AddAddress';
import UpdateAddress1 from './src/screens/UpdateAddress1';
import SingleMenu from './src/screens/Menu';
import ProfileAdmin from './src/screens/ProfileAdmin';
import PointCart from './src/screens/PointCart';

import {useSelector} from 'react-redux';
import {OrderAddressProvider} from './src/component/OrderAddressContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <OrderAddressProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="MainTab">
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="PointCart" component={PointCart} />
            <Stack.Screen name="NoOrders" component={NoOrders} />
            <Stack.Screen name="Team" component={Team} />
            <Stack.Screen name="TeamThree" component={TeamThree} />
            <Stack.Screen name="CardEmpty" component={CartEmpty} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="SearchTeam" component={SearchTeam} />
            <Stack.Screen
              name="CustomerManagement"
              component={CustomerManagement}
            />
            <Stack.Screen name="WithDraw" component={WithDraw} />
            <Stack.Screen name="Recharge" component={Recharge} />
            <Stack.Screen name="TransferMoney" component={TransferMoney} />
            <Stack.Screen name="TranferMoneyTwo" component={TranferMoneyTwo} />
            <Stack.Screen name="SuccPayment" component={SuccPayment} />
            <Stack.Screen name="SearchProduct" component={SearchProduct} />
            <Stack.Screen name="SearchRecent" component={SearchRecent} />
            <Stack.Screen
              name="CustomerInformation"
              component={CustomerInformation}
            />
            <Stack.Screen name="UpdateAddress1" component={UpdateAddress1} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="CreateOrder" component={CreateOrder} />
            <Stack.Screen name="DetailOrder" component={DetailOrder} />
            <Stack.Screen name="DetailProduct" component={DetailProduct} />
            <Stack.Screen name="Detail_User" component={Detail_User} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="InforTranfer" component={InforTranfer} />
            <Stack.Screen name="WalletScreen" component={WalletScreen} />
            <Stack.Screen name="WalletScreen_2" component={WalletScreen_2} />
            <Stack.Screen name="OverView" component={OverView} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="RechargeHistory" component={RechargeHistory} />
            <Stack.Screen name="Sales" component={Sales} />
            <Stack.Screen name="Sales_2" component={Sales_2} />
            <Stack.Screen name="Sales_3" component={Sales_3} />
            <Stack.Screen name="Walk" component={Walk} />
            <Stack.Screen name="WithdrawHistory" component={WithdrawHistory} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="UpdateAddress2" component={UpdateAddressMain} />
          </Stack.Navigator>
        </NavigationContainer>
      </OrderAddressProvider>
    </GestureHandlerRootView>
  );
};

const MainTab = () => {
  const login = useSelector((state: any) => state.user.login.status);
  return (
    <Tab.Navigator
      tabBar={prop => <MyTabBar {...prop} />}
      screenOptions={tabOptions}>
      <Tab.Screen name="Home" component={Home} />
      {login ? <Tab.Screen name="Warehouse" component={Warehouse} /> : null}
      <Tab.Screen name="Supplier" component={Supplier} />
      <Tab.Screen name="Order" component={Menu} />
      <Tab.Screen name="ProfileAdmin" component={ProfileAdmin} />
    </Tab.Navigator>
  );
};

const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
};

const MyTabBar: React.FunctionComponent<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  let image: any;

  const yAxis = useSharedValue(0);
  const height = useSharedValue(65);

  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: yAxis.value}],
      height: height.value,
    };
  });

  Keyboard.addListener('keyboardDidShow', e => {
    yAxis.value = withTiming(e.endCoordinates.height, {duration: 500});
    height.value = withTiming(0, {duration: 300});
  });

  Keyboard.addListener('keyboardDidHide', () => {
    yAxis.value = withTiming(0, {duration: 500});
    height.value = withTiming(65, {duration: 300});
  });

  return (
    <Animated.View style={[styles.tabBar, tabBarAnimatedStyle]}>
      {state.routes.map((route, index) => {
        switch (route.name) {
          case 'Home':
            image = require('./src/assets/Rectangle347.png');
            break;
          case 'Warehouse':
            image = require('./src/assets/Rectangle348.png');
            break;
          case 'Supplier':
            image = require('./src/assets/Rectangle335.png');
            break;
          case 'Order':
            image = require('./src/assets/Rectangle336.png');
            break;
          case 'ProfileAdmin':
            image = require('./src/assets/Rectangle344.png');
            break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={[styles.tabBarButton]}
            android_ripple={{
              color: 'navy',
              radius: 30,
            }}>
            <AnimateButton isFocused={isFocused} image={image} />
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

type AnimateButtonType = {
  isFocused: boolean;
  image: any;
};

const AnimateButton: React.FunctionComponent<AnimateButtonType> = ({
  isFocused,
  image,
}) => {
  const opacityValue = useSharedValue(1);

  const animate = useAnimatedStyle(() => {
    const opacity = opacityValue.value;
    return {
      opacity,
    };
  });

  React.useEffect(() => {
    if (isFocused) {
      opacityValue.value = 0;
      opacityValue.value = withTiming(1, {
        duration: 300,
        easing: Easing.cubic,
      });
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        styles.tabBarIconBackground,
        {backgroundColor: isFocused ? 'white' : 'transparent'},
        animate,
      ]}>
      <Image
        source={image}
        style={[
          styles.tabBarIcon,
          {tintColor: isFocused ? '#005AA9' : 'white'},
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#005AA9',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  tabBarIconBackground: {
    height: 40,
    width: 40,
    borderRadius: 10,
    transform: [{rotate: '45deg'}],
    justifyContent: 'center',
  },

  tabBarIcon: {
    transform: [{rotate: '-45deg'}],
    width: '63%',
    height: '63%',
    alignSelf: 'center',
  },
});

export default App;
