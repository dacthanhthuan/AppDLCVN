import {
  TextInput,
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const InputSearch = ({style}) => {
  const navigation = useNavigation();
  return (
    <View style={style}>
      <Pressable
        style={styles.container}
        onPress={() => navigation.navigate('SearchRecent')}>
        <TextInput
          style={styles.textInput}
          placeholder="Bạn cần tìm gì?"
          editable={false}
        />
        <Image
          source={require('../../assets/Home/ei_search.png')}
          resizeMode="contain"
          style={styles.iconSearch}
        />
      </Pressable>
    </View>
  );
};

export default memo(InputSearch);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },

  textInput: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginVertical: '3%',
    paddingHorizontal: 18,
    fontSize: 16,
    height: 45,
  },

  iconSearch: {
    position: 'absolute',
    height: 40,
    width: 40,
    right: 5,
    alignSelf: 'center',
  },
});
