import {SafeAreaView} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {ReferralInfo} from '../../redux/actions/referralInfoActions';
import {WINDOW_WIDTH} from '../../global';
import MyShareCard from '../../component/ShareScreen/MyCard';
import ShareCard from '../../component/ShareScreen/ShareCard';
import {ScrollView} from 'react-native';
import LoadingOverlay from '../../component/LoadingOverlay';
import {riseNormalError} from '../../redux/actions/errorHandlerActions';

const left = require('../../assets/Arrow1.png');

export default function ShareAppScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const qrShow = useSelector(
    (state: any) => state.app.data.referral_link_multiple_enabled,
  );
  const session_token = useSelector((state: any) => state.user.session_token);
  const referralInfo = useSelector((state: any) => state.referral.data);
  const referralLoading = useSelector((state: any) => state.referral.loading);
  const referralMsg = useSelector((state: any) => state.referral.message);

  // Initial render side effect
  useEffect(() => {
    if (!referralInfo) {
      dispatch(ReferralInfo.start(session_token));
    }
  }, []);

  // whenever loading referral list fail
  useEffect(() => {
    if (referralMsg) {
      dispatch(
        riseNormalError({
          duration: 5000,
          message: 'Lỗi: ' + referralMsg,
        }),
      );
    }
  }, [referralMsg]);

  return (
    <SafeAreaView style={styles.container}>
      {referralLoading && <LoadingOverlay />}
      <Header
        text={'Chia sẻ App'}
        iconLeft={left}
        iconRight={undefined}
        onPressLeft={() => navigation.goBack()}
        onPressRight={undefined}
        containerStyle={undefined}
        showCartBadge={undefined}
      />

      {referralInfo && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <RenderHTML
            contentWidth={WINDOW_WIDTH}
            source={{
              html: referralInfo.description ? referralInfo.description : '',
            }}
          />

          <MyShareCard
            title={'Mã chia sẻ của bạn'}
            code={referralInfo.promotion_code}
            body={referralInfo.promotion_description}
          />

          {referralInfo.referral_link.map((item: any) => (
            <ShareCard
              key={item.id}
              title={item.name}
              link={item.referral_link}
              body={referralInfo.referral_description}
              qrUri={
                qrShow == 1 && referralInfo.render_qrcode + item.referral_link
              }
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
