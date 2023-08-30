import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
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
import RechargeHistory from './src/screens/RechargeHistory';
import Sales from './src/screens/Sales/Sales_1/index';
import Sales_2 from './src/screens/Sales/Sales_2';
import Sales_3 from './src/screens/Sales/Sales_3';
import Walk from './src/screens/Walk';
import OverView from './src/screens/OverView';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import UpdateAddress2 from './src/screens/UpdateAddressScreen2';
import Warehouse from './src/screens/Warehouse';
import Cart from './src/screens/Cart';
import 'react-native-gesture-handler';
import Menu from './src/screens/Menu';
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
import ProfileAdmin from './src/screens/ProfileAdmin';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import DetailProductPoint from './src/screens/DetailProductPoint';
import CartPoint from './src/screens/CartPoint';
import PaymentPoint from './src/screens/PaymentPoint';
import CreateOrderPoint from './src/screens/CreateOrderPoint';
import ProductSupplier from './src/screens/ProductSupplier';
import WalletHistory from './src/screens/WalletHistory';
import CustomerBank from './src/screens/CustomerBank';
import WalletMoney from './src/screens/WalletMoney';
import WalletPoint from './src/screens/WalletPoint';
import CodeScan from './src/screens/CodeScan';
import MyQR from './src/screens/MyQR';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='MainTab'>
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
          <Stack.Screen name="TranferMoneyTwo" component={TranferMoneyTwo} />
          <Stack.Screen name="SuccPayment" component={SuccPayment} />
          <Stack.Screen name="SearchProduct" component={SearchProduct} />
          <Stack.Screen name="SearchRecent" component={SearchRecent} />
          <Stack.Screen name="CustomerInformation" component={CustomerInformation} />
          <Stack.Screen name="UpdateAddress1" component={UpdateAddress1} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="CreateOrder" component={CreateOrder} />
          <Stack.Screen name="CreateOrderPoint" component={CreateOrderPoint} />
          <Stack.Screen name="DetailOrder" component={DetailOrder} />
          <Stack.Screen name="DetailProduct" component={DetailProduct} />
          <Stack.Screen name="DetailProductPoint" component={DetailProductPoint} />
          <Stack.Screen name="CartPoint" component={CartPoint} />
          <Stack.Screen name="Detail_User" component={Detail_User} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="InforTranfer" component={InforTranfer} />
          <Stack.Screen name="WalletMoney" component={WalletMoney} />
          <Stack.Screen name="WalletPoint" component={WalletPoint} />
          <Stack.Screen name="OverView" component={OverView} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentPoint" component={PaymentPoint} />
          <Stack.Screen name="RechargeHistory" component={RechargeHistory} />
          <Stack.Screen name="Sales" component={Sales} />
          <Stack.Screen name="Sales_2" component={Sales_2} />
          <Stack.Screen name="Sales_3" component={Sales_3} />
          <Stack.Screen name="Walk" component={Walk} />
          <Stack.Screen name="WithdrawHistory" component={WithdrawHistory} />
          <Stack.Screen name='MainTab' component={MainTab} />
          <Stack.Screen name='UpdateAddress2' component={UpdateAddress2} />
          <Stack.Screen name='ProductSupplier' component={ProductSupplier} />
          <Stack.Screen name='WalletHistory' component={WalletHistory} />
          <Stack.Screen name='CustomerBank' component={CustomerBank} />
          <Stack.Screen name='QRCodeTab' component={QRCodeTab} />
          <Stack.Screen name='CodeScan' component={CodeScan} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

};

const MainTab = () => {
  return (
    <Tab.Navigator tabBar={(prop) => <MyTabBar {...prop} />} screenOptions={tabOptions} >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Warehouse" component={Warehouse} />
      <Tab.Screen name="Supplier" component={Supplier} />
      <Tab.Screen name="Order" component={Menu} />
      <Tab.Screen name="ProfileAdmin" component={ProfileAdmin} />
    </Tab.Navigator>
  );
};

const QRCodeTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CodeScan" component={CodeScan} options={{
        title: 'Quét QR', tabBarIcon: ({ focused }) => (
          <Image
            source={require('./src/assets/qr.png')} // Thay đổi đường dẫn đến hình icon của bạn
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: focused ? '#005AA9' : 'gray', // Tuỳ chỉnh màu tùy theo trạng thái focus
              padding: 5, // Điều chỉnh khoảng cách giữa icon và viền tab
            }}
          />
        ),
      }} />
      <Tab.Screen name="MyQR" component={MyQR} options={{
        title: 'QR của tôi', tabBarIcon: ({ focused }) => (
          <Image
            source={require('./src/assets/Rectangle344.png')} // Thay đổi đường dẫn đến hình icon của bạn
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
              tintColor: focused ? '#005AA9' : 'gray', // Tuỳ chỉnh màu tùy theo trạng thái focus
              padding: 5, // Điều chỉnh khoảng cách giữa icon và viền tab
            }}
          />
        ),
      }} />
    </Tab.Navigator >
  );
};


const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
};

const MyTabBar: React.FunctionComponent<BottomTabBarProps> =
  ({ state, navigation }) => {
    let image: any;

    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          switch (route.name) {
            case "Home":
              image = require('./src/assets/Rectangle347.png');
              break;
            case "Warehouse":
              image = require('./src/assets/Rectangle348.png');
              break;
            case "Supplier":
              image = require('./src/assets/Rectangle335.png');
              break;
            case "Order":
              image = require('./src/assets/Rectangle336.png');
              break;
            case "ProfileAdmin":
              image = require('./src/assets/Rectangle344.png');
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
              style={[styles.tabBarButton,
              ]}
              android_ripple={{
                color: "navy",
              }}
            >
              <AnimateButton isFocused={isFocused} image={image} />
            </Pressable>
          );
        })}
      </View >
    );
  };

type AnimateButtonType = {
  isFocused: boolean,
  image: any,
};

const AnimateButton: React.FunctionComponent<AnimateButtonType> =
  ({ isFocused, image }) => {

    const opacityValue = useSharedValue(0);

    const animate = useAnimatedStyle(() => {
      const opacity = withTiming(
        opacityValue.value,
        {
          duration: 350,
          easing: Easing.cubic
        }
      );

      return {
        opacity,
      };
    });


    React.useEffect(() => {
      if (isFocused) opacityValue.value = 1;
      else {
        opacityValue.value = 0;
      }
    }, [isFocused]);

    return (
      <Animated.View style={[
        styles.tabBarIconBackground,
        { backgroundColor: isFocused ? "white" : "transparent" },
        isFocused ? animate : { opacity: 1 }
      ]}>
        <Image source={image} style={[styles.tabBarIcon,
        { tintColor: isFocused ? "#005AA9" : "white", }]} />
      </Animated.View>
    );
  };


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: "#005AA9",
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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
