import React, {useState, useEffect} from 'react';
import styles from './styles';
import {FlatList, SafeAreaView, Text} from 'react-native';
import Header from '../../component/Header';
import Input from '../../component/Input';
import CardRecent from '../../component/CardRecent';

const data = [
  {name: 'Auslac Lactoferrin (Giá Ưu Đãi)'},
  {name: 'DLC Brazil Green Propolis'},
  {name: 'DLC Diamond Lip Balm No.1'},
];

const SearchRecent = ({navigation}) => {
  const [filteredUser, setFilteredUser] = useState(data);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword?.length > 0) {
      const filteredItems = data?.filter(rec =>
        rec?.name?.toLocaleLowerCase()?.includes(keyword?.toLocaleLowerCase()),
      );
      setFilteredUser(filteredItems);
    } else {
      setFilteredUser(data);
    }
  }, [keyword]);

  const deleteSearch = index => {
    const updatedData = filteredUser.filter((item, idx) => idx !== index);
    setFilteredUser(updatedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Tìm kiếm"
        iconRight={require('../../assets/Vector.png')}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Cart');
        }}
      />

      <Input
        placeholder="Bạn cần tìm gì"
        onChangeText={setKeyword}
        value={keyword}
        onEndEditing={({nativeEvent}) =>
          nativeEvent.text.length > 0
            ? navigation.navigate('SearchProduct', {text: nativeEvent.text})
            : null
        }
      />

      <Text
        style={{
          marginTop: 25,
          fontSize: 16,
          color: '#000000',
          fontWeight: '500',
        }}>
        Đã tìm gần đây
      </Text>

      <FlatList
        data={filteredUser}
        style={{marginTop: 15}}
        renderItem={({item, index}) => (
          <CardRecent text={item.name} onPress={() => deleteSearch(index)} />
        )}
      />
    </SafeAreaView>
  );
};

export default React.memo(SearchRecent);
