import React, {useState, useEffect} from 'react';
import styles from './styles';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import Header from '../../component/Header';
import Input from '../../component/Input';
import Product from '../../component/Home/Product';
import {WINDOW_WIDTH} from '../../global';

const data = [
  {
    id: 1,
    source: require('../../assets/Home/Rectangle293.png'),
    title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
    idProduct: 'AUS01',
    price: 1080000,
    commission: 380000,
  },
  {
    id: 2,
    title: 'DLC Soybean Germ Formula',
    idProduct: 'AUS01',
    price: 1361000,
    commission: 380000,
    source: require('../../assets/dlcsoybean.png'),
  },
  {
    id: 3,
    title: 'DLC Red Yeast Rice Formula',
    idProduct: 'AUS01',
    price: 1089000,
    commission: 380000,
    source: require('../../assets/dlcred.png'),
  },
  {
    id: 4,
    title: 'DLC Brazil Green Propolis',
    idProduct: 'AUS01',
    price: 1361000,
    commission: 380000,
    source: require('../../assets/dlcbrazil.png'),
  },
];

const SearchProduct = ({navigation, route}) => {
  const [filteredUser, setFilteredUser] = useState(data);
  const [keywork, setKeywork] = useState(
    route.params?.text ? route.params?.text : '',
  );

  useEffect(() => {
    if (keywork?.length > 0) {
      const filteredItems = data?.filter(rec =>
        rec?.title?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase()),
      );
      setFilteredUser(filteredItems);
    } else {
      setFilteredUser(data);
    }

    console.log(filteredUser);
  }, [keywork]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/Arrow1.png')}
        text="Tìm kiếm"
        iconRight={require('../../assets/Vector.png')}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <Input
        placeholder="Tìm kiếm sản phẩm"
        onChangeText={setKeywork}
        value={keywork}
      />

      <Text
        style={{
          marginTop: 25,
          fontSize: 16,
          color: '#000000',
          fontWeight: '500',
        }}>
        Tìm thấy 25 sản phẩm
      </Text>

      <FlatList
        style={{width: WINDOW_WIDTH}}
        data={filteredUser}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item?.id)}
        ListHeaderComponent={<View style={{marginTop: 20}}></View>}
        ListEmptyComponent={
          <>
            <Text style={{textAlign: 'center'}}>No items found.</Text>
          </>
        }
        renderItem={({item}) => <Product item={item} />}
      />
    </SafeAreaView>
  );
};

export default React.memo(SearchProduct);
