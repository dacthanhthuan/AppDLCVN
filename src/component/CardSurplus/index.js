import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {formatDecimal, formatPoint, formatPrice} from '../../global';

const CardSurplus = ({style, onPress, isMainWallet = true}) => {
  const user = useSelector(state => state.user);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/Rectangle326.png')}
        />
      </View>
      <View style={{flexDirection: 'column', marginLeft: 12}}>
        <Text style={styles.title}>
          Số dư ví {isMainWallet ? 'chính' : 'điểm'}
        </Text>
        <Text style={styles.value}>
          {isMainWallet
            ? formatPrice(user.lWallet[0].amount)
            : formatPoint(user.lWallet[1].amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CardSurplus);
