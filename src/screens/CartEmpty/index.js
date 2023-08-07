import React from 'react';
import {SafeAreaView, Text, Image} from 'react-native';
import styles from './styles';
import Button from '../../component/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

const CartEmpty = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        loop
        autoPlay
        source={assets.LottieAnimation.empty_card}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text style={{fontSize: 20, color: '#000000', marginTop: 32}}>
        Giỏ hàng của bạn đang trống
      </Text>
      <Button
        text="Mua sắm"
        onPress={() => navigation.dispatch(StackActions.pop())}
        style={{marginTop: 32, width: '90%'}}
      />
    </SafeAreaView>
  );
};

export default React.memo(CartEmpty);
