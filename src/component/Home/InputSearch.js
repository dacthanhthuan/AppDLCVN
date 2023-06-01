import {TextInput, StyleSheet, View, Image, Pressable} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const InputSearch = ({style}) => {
  const navigation = useNavigation();
  return (
    <View style={style}>
      <Pressable onPress={() => navigation.navigate('SearchRecent')}>
        <TextInput
          style={styles.container}
          placeholder="Bạn cần tìm gì?"
          editable={false}
        />
      </Pressable>
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
