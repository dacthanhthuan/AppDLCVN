import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

const CardProfile = ({text, image, id, style, onPress}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{flexDirection: 'row', width: '80%'}}>
        <Image style={styles.icon} source={image} />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <Text style={styles.name}>{text}</Text>
          <Text style={styles.id}>{id}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textProfile}>Xem hồ sơ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CardProfile);
