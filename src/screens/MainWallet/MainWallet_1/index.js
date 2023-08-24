import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Style_WalletScreen from './style';
import Header from '../../../component/Header';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {formatDecimal} from '../../../global';
import {WalletBankList} from '../../../redux/actions/walletActions';
import {useRoute} from '@react-navigation/native';

const WalletScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const {wallet, index} = route.params;

  const lWallet = useSelector(state => state.user.lWallet);
  const session_token = useSelector(state => state.user.session_token);
  const bankList = useSelector(state => state.wallet.bankList);

  // load bank list data
  const getBankWalletListApi = () => {
    try {
      dispatch(WalletBankList.start(session_token));
    } catch (error) {}
  };

  // get bank wallet list
  useEffect(() => {
    // if banklist is not loaded then
    if (bankList.length == 0) getBankWalletListApi();
  }, []);

  // Animation
  const {width: width, height: height} = Dimensions.get('window');
  const translateY = useSharedValue(0);
  const Max_TRANSLATE_Y = -height + 50;
  const Min_TRANSLATE_Y = -height + 535;
  const context = useSharedValue({y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, Max_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, Min_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -height / 2) {
        translateY.value = withSpring(Min_TRANSLATE_Y, {damping: 50});
      } else if (translateY.value < -height / 2) {
        translateY.value = withSpring(Max_TRANSLATE_Y, {damping: 50});
      }
    });

  useEffect(() => {
    translateY.value = withSpring(-height / 3, {damping: 50});
  }, []);

  const BottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <SafeAreaView style={Style_WalletScreen.container}>
      <Header
        onPressLeft={() => navigation.goBack()}
        iconLeft={require('../../../assets/imgSupplier/Arrow_1.png')}
        text={wallet == 'main' ? 'Ví chính' : 'Ví điểm'}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={Style_WalletScreen.text}>Số dư khả dụng</Text>
          <Text style={Style_WalletScreen.textmoney}>
            {wallet == 'main'
              ? formatDecimal.format(lWallet[0].amount) + ' VND'
              : formatDecimal.format(lWallet[1].amount) + ' Point'}
          </Text>
        </View>
        <Image
          style={Style_WalletScreen.imgWallet}
          source={require('../../../assets/imgMainwallet/Vector.png')}
        />
      </View>
      <Animated.View
        style={[{alignItems: 'center', marginTop: 300}, BottomSheetStyle]}>
        <View style={Style_WalletScreen.bottomsheet}>
          <View style={Style_WalletScreen.line}></View>
          <View style={{padding: 20}}>
            <Text style={Style_WalletScreen.title}>Chức năng ví</Text>
            {wallet == 'main' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Recharge')}
                  style={Style_WalletScreen.view}>
                  <View style={Style_WalletScreen.view_2}>
                    <View style={Style_WalletScreen.borderIcon}>
                      <Image
                        style={Style_WalletScreen.icon}
                        source={require('../../../assets/imgMainwallet/Rectangle_429.png')}
                      />
                    </View>
                    <Text style={Style_WalletScreen.text_2}>Nạp tiền</Text>
                  </View>
                  <Image
                    style={Style_WalletScreen.imgArrow}
                    source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WithDraw')}
                  style={Style_WalletScreen.view}>
                  <View style={Style_WalletScreen.view_2}>
                    <View style={Style_WalletScreen.borderIcon}>
                      <Image
                        style={Style_WalletScreen.icon}
                        source={require('../../../assets/imgMainwallet/Rectangle_430.png')}
                      />
                    </View>
                    <Text style={Style_WalletScreen.text_2}>Rút tiền</Text>
                  </View>
                  <Image
                    style={Style_WalletScreen.imgArrow}
                    source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
                  />
                </TouchableOpacity>
              </>
            )}
            {lWallet[index].is_transfer && (
              <TouchableOpacity
                onPress={() => navigation.navigate('TransferMoney')}
                style={Style_WalletScreen.view}>
                <View style={Style_WalletScreen.view_2}>
                  <View style={Style_WalletScreen.borderIcon}>
                    <Image
                      style={Style_WalletScreen.icon}
                      source={require('../../../assets/imgMainwallet/Rectangle_431.png')}
                    />
                  </View>
                  <Text style={Style_WalletScreen.text_2}>Chuyển tiền</Text>
                </View>
                <Image
                  style={Style_WalletScreen.imgArrow}
                  source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('WalletHistory')}
              style={Style_WalletScreen.view}>
              <View style={Style_WalletScreen.view_2}>
                <View style={Style_WalletScreen.borderIcon}>
                  <Image
                    style={Style_WalletScreen.icon}
                    source={require('../../../assets/imgMainwallet/Rectangle_432.png')}
                  />
                </View>
                <Text style={Style_WalletScreen.text_2}>Lịch sử</Text>
              </View>
              <Image
                style={Style_WalletScreen.imgArrow}
                source={require('../../../assets/imgMainwallet/Rectangle_424.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default WalletScreen;
