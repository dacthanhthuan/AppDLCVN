import React from 'react';
import {SafeAreaView, Text, Image} from 'react-native';
import styles from './styles';
import Button from '../../component/Button';
import LottieView from 'lottie-react-native';
import assets from '../../assets';
import {useNavigation} from '@react-navigation/native';

const SuccPayment = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, color: '#000000'}}>
        Đơn hàng đang được xử lý...
      </Text>
      <LottieView
        source={assets.LottieAnimation.delivery}
        loop
        autoPlay
        style={{
          width: 300,
          height: 300,
          alignSelf: 'center',
          margin: -50,
        }}
        speed={0.6}
      />
      <Button
        text="Đến trang chủ"
        style={{marginTop: 32, width: '90%'}}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Button
        text="Đến lịch sử đơn hàng"
        style={{marginTop: 15, width: '90%'}}
        onPress={() => {
          navigation.navigate('Order');
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(SuccPayment);
