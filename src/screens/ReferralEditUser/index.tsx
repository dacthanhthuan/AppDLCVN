import {SafeAreaView, Image} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import Button from '../../component/Button';
import {TextInput} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import DatePicker from '../../component/ReferralTeam/SearchFilter/DatePicker';
import GenderPicker from '../../component/GenderPicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  ReferralMemberList,
  ReferralMemberUpdateAdd,
} from '../../redux/actions/referralMemberActions';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import LoadingOverlay from '../../component/LoadingOverlay';

export default function ReferralEditUser() {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

  const session_token = useSelector((s: any) => s.user.session_token);
  const loading = useSelector((s: any) => s.referralMember.updateAddLoading);
  const message = useSelector((s: any) => s.referralMember.message);

  const {data}: any = route.params;

  const [name, setName] = useState(data.fullname);
  const [email, setEmail] = useState(data.email);
  const [mobile, setMobile] = useState(data.mobile);
  const [birthday, setBirthday] = useState<any>(null);
  const [gender, setGender] = useState(data.sex);

  const [pressed, setPressed] = useState(false);

  // event handle: update
  const handleUpdateUser = useCallback(() => {
    // update
    dispatch(
      ReferralMemberUpdateAdd.start({
        token: session_token,
        user_id: data.user_id,
        mobile: mobile,
        fullname: name,
        email: email,
        sex: gender,
        birthday: birthday,
      }),
    );

    // set pressed is true
    setPressed(true);
  }, [name, email, mobile, birthday, gender]);

  // side effect: synchronous with loading state and message
  useEffect(() => {
    // if update button is pressed
    if (pressed) {
      // if have no trouble
      if (!loading && !message) {
        setPressed(false);

        navigation.navigate('ReferralDetailMember', {
          data: {
            ...data,
            mobile: mobile,
            fullname: name,
            email: email,
            sex: gender,
            birthday: birthday,
          },
        });
      }

      // if have trouble
      if (!loading && message) {
        setPressed(false);

        // rise error
        dispatch(
          riseNormalError({
            message: 'Lỗi: ' + message,
            duration: 4000,
          }),
        );
      }
    }
  }, [loading, message, pressed]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingOverlay />}
      <Header
        text={`Cập nhật thành viên`}
        iconLeft={require('../../assets/Arrow1.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={styles.header}
        onPressRight={undefined}
        showCartBadge={undefined}
        iconRight={undefined}
      />

      <ScrollView
        style={styles.infoList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoListContent}>
        <Image
          source={
            data.avatar
              ? {uri: data.avatar}
              : require('../../assets/Rectangle312.png')
          }
          style={styles.avatar}
        />

        <TextInput
          style={styles.input}
          placeholder={'Nhập họ và tên'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder={'Nhập email'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder={'Nhập số điện thoại'}
          value={mobile}
          onChangeText={setMobile}
        />
        <GenderPicker
          placeholder="Nhập giới tính"
          defaulGender={gender}
          onChangeGender={setGender}
        />
        <DatePicker
          placeholder={'Nhập ngày sinh'}
          defaultDate={birthday}
          onChangeDate={date => setBirthday(date.toLocaleDateString())}
        />
      </ScrollView>

      <Button
        text="XÁC NHẬN"
        style={styles.button}
        onPress={handleUpdateUser}
        styleText={undefined}
      />
    </SafeAreaView>
  );
}
