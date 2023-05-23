import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Supplier from './src/screens/Supplier';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DetailProduct from './src/screens/DetailProduct';
import Detail_User from './src/screens/DetailUser';
import CreateOrder from './src/screens/CreateOrder';
import DetailOrder from './src/screens/DetailOrder';
import Payment from './src/screens/Payment';
import InforTranfer from './src/screens/InforTranfer';
import Information from './src/component/Information';
import TranferMoneyTwo from './src/screens/TranferMoneyTwo';
import WithdrawHistory from './src/screens/WithdrawHistory';
import RechargeHistory from './src/screens/RechargeMoney';
import Sales from './src/screens/Sales/Sales_1/index';
import Sales_2 from './src/screens/Sales/Sales_2';
import Walk from './src/screens/Walk';
import WalletScreen from './src/screens/MainWallet/MainWallet_1';
import WalletScreen_2 from './src/screens/MainWallet/MainWallet_2';
import OverView from './src/screens/OverView';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
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
import CardEmpty from './src/screens/CardEmpty';
import Notifications from './src/screens/Notifications';
import SearchProduct from './src/screens/SearchProduct';
import SearchRecent from './src/screens/SearchRecent';
import CustomerInformation from './src/screens/CustomerInformation';
import AddAddress from './src/screens/AddAddress';
import UpdateAddress1 from './src/screens/UpdateAddress1';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='MainTab'>
        <Stack.Screen name="NotLogin" component={NotLogin} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="NoOrders" component={NoOrders} />
        <Stack.Screen name="Team" component={Team} />
        <Stack.Screen name="TeamThree" component={TeamThree} />
        <Stack.Screen name="CardEmpty" component={CardEmpty} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="SearchTeam" component={SearchTeam} />
        <Stack.Screen name="CustomerManagement" component={CustomerManagement} />
        <Stack.Screen name="WithDraw" component={WithDraw} />
        <Stack.Screen name="Recharge" component={Recharge} />
        <Stack.Screen name="TransferMoney" component={TransferMoney} />
        <Stack.Screen name="SuccPayment" component={SuccPayment} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="SearchRecent" component={SearchRecent} />
        <Stack.Screen name="CustomerInformation" component={CustomerInformation} />
        <Stack.Screen name="UpdateAddress1" component={UpdateAddress1} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name='MainTab' component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  )

};

// const Bottom = () => {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen name="Home" component={Home} />
      

//     </Tab.Navigator>
//   )
// }

const MainTab = () => {
  return (
    <Tab.Navigator tabBar={(prop) => <MyTabBar {...prop} />} screenOptions={tabOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Warehouse" component={Warehouse} />
      <Tab.Screen name="NhaCC" component={Home} />
      <Tab.Screen name="Notification" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
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
            case "Warehouse":
              image = require('./src/assets/Rectangle348.png')
              break;
            case "NhaCC":
              image = require('./src/assets/Rectangle335.png')
              break;
            case "Notification":
              image = require('./src/assets/Rectangle336.png')
              break;
            case "Profile":
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
