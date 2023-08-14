import {SafeAreaView, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '../../assets';
import Button from '../../component/Button';
import {useNavigation} from '@react-navigation/native';

export default function LoginNow() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <LottieView
        source={assets.LottieAnimation.login}
        style={{width: 300, height: 300, alignSelf: 'center'}}
        loop
        autoPlay
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          width: '80%',
          color: 'black',
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {`Đăng nhập để khám phá thêm nhiều điều thú vị`}
      </Text>
      <Button
        text={'Đăng nhập ngay'}
        onPress={() => navigation.navigate('Login')}
        style={{width: '80%', alignSelf: 'center'}}
        styleText={undefined}
      />
    </SafeAreaView>
  );
}
