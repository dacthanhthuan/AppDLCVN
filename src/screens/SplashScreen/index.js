import {View, Image, StatusBar} from 'react-native';
import {useEffect} from 'react';
import styles from './styles';

const logo = require('../../assets/nanogroup.png');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainTab');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;
