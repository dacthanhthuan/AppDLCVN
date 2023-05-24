import {memo} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const check = require('../../assets/UpdateAddress/Rectangle263.png');

const ChooseItem = ({item, isSelected}) => {
  return (
    <View>
      <Text style={styles.text}>{item.name}</Text>
      {isSelected ? (
        <Image source={check} style={styles.imageTextCheck} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imageTextCheck: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: '5%',
  },

  text: {
    fontSize: 13,
    color: 'black',
  },
});

export default memo(ChooseItem, (pre, next) => {
  JSON.stringify(pre.item) === JSON.stringify(next.item);
});
