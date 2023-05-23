import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const DeliveryAddress = ({ city, district, ward, apartmentNumber }) => {
  return (
    <>
      <View style={{ marginLeft: 22 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.textLeft}>{city}</Text>
          <Text style={styles.textRight}>Sửa</Text>
        </View>
        <Text style={styles.textLeft}>{district}</Text>
        <Text style={styles.textLeft}>{ward}</Text>
      </View>
      <View style={styles.line}></View>
      <Text style={[styles.textLeft, { marginLeft: 25 }]}>{apartmentNumber}</Text>
    </>
  );
};

export default React.memo(DeliveryAddress);