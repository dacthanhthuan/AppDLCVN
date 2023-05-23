import {TextInput, StyleSheet, View, Image} from 'react-native';
import {memo} from 'react';

const InputSearch = ({style}) => {
  return (
    <View style={style}>
      <TextInput style={styles.container} placeholder="Bạn cần tìm gì?" />
      <Image
        source={require('../../assets/Home/ei_search.png')}
        style={styles.iconSearch}
        resizeMode="contain"
      />
    </View>
  );
};

export default memo(InputSearch);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginVertical: '3%',
    paddingHorizontal: 18,
    fontSize: 16,
  },

  iconSearch: {
    position: 'absolute',
    left: '80%',
    height: '40%',
  },
});
