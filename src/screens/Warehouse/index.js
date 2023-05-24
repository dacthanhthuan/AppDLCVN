import React, {useState, useEffect} from 'react';
import styles from './styles';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Input from '../../component/Input';
import CardProduct from '../../component/CardProduct';
import Header from '../../component/Header';

const data = [
  {
    id: 1,
    title: 'Auslac Lactoferrin (Giá Ưu Đãi)',
    categori: 'AUS01',
    price: '1,089,000',
    image: require('../../assets/Rectangle293.png'),
  },
  {
    id: 2,
    title: 'DLC Soybean Germ Formula',
    categori: 'AUS01',
    price: '1,361,000',
    image: require('../../assets/dlcsoybean.png'),
  },
  {
    id: 3,
    title: 'DLC Red Yeast Rice Formula',
    categori: 'AUS01',
    price: '1,089,000',
    image: require('../../assets/dlcred.png'),
  },
  {
    id: 4,
    title: 'DLC Brazil Green Propolis',
    categori: 'AUS01',
    price: '1,361,000',
    image: require('../../assets/dlcbrazil.png'),
  },
];

const Warehouse = ({navigation}) => {
  const [filteredUser, setFilteredUser] = useState(data);
  const [keywork, setKeywork] = useState('');

  useEffect(() => {
    if (keywork?.length > 0) {
      const filteredItems = data?.filter(rec =>
        rec?.title?.toLocaleLowerCase()?.includes(keywork?.toLocaleLowerCase()),
      );
      setFilteredUser(filteredItems);
    } else {
      setFilteredUser(data);
    }
  }, [keywork]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconLeft={require('../../assets/white.png')}
        text="Kho đổi điểm"
        iconRight={require('../../assets/Vector.png')}
        onPressRight={() => {
          navigation.navigate('Cart');
        }}
      />
      <View style={styles.rowPoint}>
        <Text style={styles.helloText}>Chào Thái Năng !</Text>
        <View style={styles.pointContainer}>
          <Text style={styles.pointText}>5,000,000</Text>
          <Image
            style={styles.iconAvatar}
            source={require('../../assets/Rectangle312.png')}
          />
        </View>
      </View>
      <Input
        onChangeText={setKeywork}
        placeholder="Bạn cần tìm gì ?"
        value={keywork}
      />
      <Text
        style={{
          marginTop: 25,
          color: '#000000',
          fontSize: 16,
          fontWeight: '400',
        }}>
        25 sản phẩm phù hợp
      </Text>
      <FlatList
        data={filteredUser}
        numColumns={2}
        style={{marginTop: 15}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item?.id)}
        ListHeaderComponent={<View style={{marginTop: 12}}></View>}
        ListEmptyComponent={
          <>
            <Text style={{textAlign: 'center'}}>No items found.</Text>
          </>
        }
        renderItem={({item, index}) => {
          return (
            <CardProduct
              style={
                index % 2 === 0
                  ? {marginLeft: 2, marginRight: 22}
                  : {marginRight: 4}
              }
              key={item.id}
              image={item.image}
              title={item.title}
              categori={item.categori}
              price={item.price}
              onPress={() => navigation.navigate('DetailProduct')}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Warehouse);
