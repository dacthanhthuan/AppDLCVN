import React from 'react';
import {SafeAreaView, Text, Image} from 'react-native';
import styles from './styles';
import Button from '../../component/Button';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

const SuccPayment = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, color: '#000000'}}>
        Thanh toán thành công
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
    </SafeAreaView>
  );
};

export default React.memo(SuccPayment);
