import {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

function BankChoosenItem({item, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>
        {item.short} - {item.name}
      </Text>
      <Image
        source={{uri: item.icon}}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export default memo(
  BankChoosenItem,
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 2,
  },

  label: {
    maxWidth: '80%',
    fontSize: 14,
    color: 'black',
    paddingLeft: 10,
  },

  icon: {
    width: '12%',
    marginRight: 5,
  },
});
