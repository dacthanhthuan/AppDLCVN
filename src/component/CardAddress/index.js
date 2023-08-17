import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './styles';
import Checkbox from '../Checkbox';

const CardAddress = ({
  numberAddress,
  address,
  onPress,
  isDefault = false,
  checked,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Địa chỉ giao hàng</Text>
      <View style={styles.header}>
        <Checkbox check={checked} disable />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.numberAddress}>{numberAddress}</Text>
          {/* <TouchableOpacity onPress={onPress}>
            <Text style={{fontSize: 13, color: '#005AA9'}}>Sửa</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={styles.address}>{address}</Text>
      {isDefault ? <Text style={styles.default}>Mặc định</Text> : null}
      <View style={styles.line}></View>
    </View>
  );
};

export default React.memo(CardAddress);
