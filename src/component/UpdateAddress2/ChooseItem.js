import { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const check = require('../../assets/UpdateAddress/Rectangle263.png');

const ChooseItem = ({ item, onPress, isSelected }) => {
  return (
    <TouchableOpacity style={{ marginBottom: 8, }} onPress={() => onPress(item)}>
      <Text style={styles.text}>{item.name}</Text>
      {isSelected ? (
        <Image source={check} style={styles.imageTextCheck} />
      ) : null}
      <View style={[styles.line, { borderColor: isSelected ? '#005AA9' : '#C2C2C2' }]}></View>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  imageTextCheck: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: '2%',
  },

  text: {
    fontSize: 14,
    color: 'black',
  },
  line: {
    width: '100%',
    borderColor: '#C2C2C2',
    borderWidth: 1,
    marginTop: 4
  }
});

export default memo(ChooseItem, (pre, next) => {
  JSON.stringify(pre.item) === JSON.stringify(next.item);
});
