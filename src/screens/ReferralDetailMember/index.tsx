import {SafeAreaView, Image} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActionList from '../../component/ReferralDetailMember/ActionsList';
import RDMInfoField from '../../component/ReferralDetailMember/RDMInfoField';
import {ScrollView} from 'react-native';

export default function ReferralDetailMember() {
  const navigation = useNavigation();
  const route = useRoute();

  const {data}: any = route.params;

  const handleOnEditUser = () => {
    navigation.navigate('ReferralEditUser', {data});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={`Thông tin chi tiết`}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={styles.header}
        onPressRight={handleOnEditUser}
        showCartBadge={undefined}
        iconRight={require('../../assets/useredit.png')}
      />

      <ScrollView style={styles.infoList} showsVerticalScrollIndicator={false}>
        <Image
          source={
            data.avatar
              ? {uri: data.avatar}
              : require('../../assets/Rectangle312.png')
          }
          style={styles.avatar}
        />

        <ActionList userData={data} />

        <RDMInfoField label={'Họ và tên'} body={data.fullname} />
        <RDMInfoField label={'Email'} body={data.email} />
        <RDMInfoField label={'Điện thoại'} body={data.mobile} />
        <RDMInfoField label={'Ngày sinh'} body={''} />
        <RDMInfoField
          label={'Giới tính'}
          body={data.sex ? (data.sex == 1 ? 'Nam' : 'Nữ') : ''}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
