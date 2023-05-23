import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Warehouse from './src/screens/Warehouse';
import Cart from './src/screens/Cart';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotLogin" component={NotLogin} />
        <Stack.Screen name="Bottom" component={Bottom} />
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
      </Stack.Navigator>
    </NavigationContainer>
  )

};

const Bottom = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Warehouse" component={Warehouse} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
