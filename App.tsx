import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Login} />
        <Tab.Screen name="Supplier" component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

const App_1 = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={WalletScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App_1;
