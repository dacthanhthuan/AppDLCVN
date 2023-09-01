import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';

type ShareCardProps = {
  title: string;
  link: string;
  body: string;
  qrUri?: string;
};

export default function ShareCard(props: ShareCardProps) {
  const referralInfo = useSelector((state: any) => state.referral.data);

  const handleOnShare = async () => {
    try {
      await Share.open({
        url: props.link,
        message: referralInfo.referral_content_to_copy,
        failOnCancel: false,
        type: 'url',
      });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>

      <View style={styles.linkView}>
        <View style={styles.link}>
          <Text style={styles.linkContent} numberOfLines={1}>
            {props.link}
          </Text>

          <TouchableOpacity
            style={styles.linkShareButton}
            onPress={handleOnShare}>
            <Text style={styles.linkShare}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>

        {props.qrUri && (
          <Image source={{uri: props.qrUri}} style={styles.qrcode} />
        )}
      </View>

      <Text style={styles.body}>{props.body}</Text>
    </View>
  );
}
