import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './styles';
import Checkbox from '../Checkbox';

const CardAddress = ({numberAddress, address, onPress, isDefault = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Địa chỉ giao hàng</Text>
      <View style={styles.header}>
        <Checkbox check={isDefault} disable />
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
      <View style={styles.line}></View>
    </View>
  );
};

export default React.memo(CardAddress);
