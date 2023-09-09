import {SafeAreaView, Image, Text} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import Button from '../../component/Button';
import {TextInput} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import DatePicker from '../../component/ReferralTeam/SearchFilter/DatePicker';
import GenderPicker from '../../component/GenderPicker';
import {useDispatch, useSelector} from 'react-redux';
import {ReferralMemberUpdateAdd} from '../../redux/actions/referralMemberActions';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';
import LoadingOverlay from '../../component/LoadingOverlay';
import {mailCheck, passwordCheck} from '../../global';

export default function ReferralAddMember() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const session_token = useSelector((s: any) => s.user.session_token);
  const loading = useSelector((s: any) => s.referralMember.updateAddLoading);
  const message = useSelector((s: any) => s.referralMember.message);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState<any>(null);
  const [gender, setGender] = useState<any>(undefined);
  const [error, setError] = useState('');

  const [pressed, setPressed] = useState(false);

  // event handle: add member
  const handleAddMember = useCallback(() => {
    const mailE = mailCheck(email);
    const passE = passwordCheck(password);

    // check error
    if (name.length == 0) {
      setError('*Chưa nhập họ và tên');
    } else if (mailE) {
      setError('*' + mailE);
    } else if (mobile.length < 10) {
      setError('*Số điện thoại không hợp lệ');
    } else if (passE) {
      setError('*' + passE);
    } else {
      setError('');

      // add
      dispatch(
        ReferralMemberUpdateAdd.start({
          token: session_token,
          mobile: mobile,
          fullname: name,
          email: email,
          sex: gender,
          birthday: birthday,
          password: password,
        }),
      );

      // set pressed is true
      setPressed(true);
    }
  }, [name, email, mobile, birthday, gender, password]);

  // side effect: synchronous with loading state and message
  useEffect(() => {
    // if update button is pressed
    if (pressed) {
      // if have no trouble
      if (!loading && !message) {
        setPressed(false);

        navigation.dispatch(StackActions.pop());
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
        text={`Tạo thành viên mới`}
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
          source={require('../../assets/Rectangle312.png')}
          style={styles.avatar}
        />

        <Text style={styles.errorText}>{error}</Text>

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
        <TextInput
          style={styles.input}
          placeholder={'Nhập mật khẩu'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
        onPress={handleAddMember}
        styleText={undefined}
      />
    </SafeAreaView>
  );
}
