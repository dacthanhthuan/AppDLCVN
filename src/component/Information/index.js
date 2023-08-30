import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import styles from './style';
import Line from '../Line';

const Information = ({ title, textOne, valueOne, textTwo, valueTwo, textThree, valueThree }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Line />
      <View style={styles.containerTitle}>
        <Image style={styles.icon} source={require('../../assets/imgOder/Rectangle_230.png')} />
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{textOne}</Text>
        <Text style={styles.text}>{valueOne}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{textTwo}</Text>
        <Text style={[styles.text, { color: '#005AA9' }]}>{valueTwo}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>{textThree}</Text>
        {
          title == 'Thông tin cho bạn' ? (
            <Text style={[styles.textColorComission, { color: '#0FA027' }]}>{valueThree}</Text>
          ) : (
            <Text style={[styles.textColor, { color: '#0FA027' }]}>{valueThree}</Text>
          )
        }
      </View>
    </SafeAreaView>
  );
};

export default Information;
