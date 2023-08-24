import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {formatDecimal, formatPrice} from '../../global';

const CardSurplus = ({style, onPress}) => {
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
        <Text style={styles.title}>Số dư ví chính</Text>
        <Text style={styles.value}>{formatPrice(user.lWallet[0].amount)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CardSurplus);
