import React, {useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../../component/Header';
import SingleMenu from '../../component/SingleMenu';
import StatusMenu from '../../component/StatusMenu';
import StatusWallet from '../../component/StatusWallet';
import {FlatList} from 'react-native-gesture-handler';

const data = [
  {
    madh: '002220321D9M',
    date: '25/03/2022',
    time: '17:40',
    images: [
      require('../../assets/dlcbrazil.png'),
      require('../../assets/dlcred.png'),
      require('../../assets/dlcsoybean.png'),
      require('../../assets/Group135.png'),
      require('../../assets/Group135.png'),
    ],
    name: 'Auslac Lactoferrin (Giá Ưu Đãi)',
    price: ' 1,100,000',
    slSp: '5',
    total: '2,000,000',
  },
  {
    madh: '002220321D9M',
    date: '25/03/2022',
    time: '17:40',
    images: [
      require('../../assets/dlcbrazil.png'),
      require('../../assets/dlcred.png'),
      require('../../assets/dlcsoybean.png'),
      require('../../assets/Group135.png'),
      require('../../assets/Group135.png'),
      require('../../assets/Group135.png'),
    ],
    name: 'Auslac Lactoferrin (Giá Ưu Đãi)',
    price: ' 1,100,000',
    slSp: '5',
    total: '2,000,000',
  },
];

const ALL = 'Tất cả';
const CTT = 'Chờ thanh toán';

const Menu = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedCategori, setSelectedCategori] = useState(CTT);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Đơn hàng"
        iconLeft={require('../../assets/Arrow1.png')}
        iconRight={require('../../assets/Rectangle366.png')}
        onPressLeft={() => navigation.goBack()}
      />

      <View style={styles.categoriContainer}>
        <StatusMenu
          categori={['Chờ thanh toán', 'Hoàn thành', 'Đã hủy']}
          selectedCatogory={selectedCategori}
          onCategoryPress={setSelectedCategori}
        />
        <StatusWallet
          categori={['Tất cả', 'Ví VNĐ', 'Ví điểm']}
          selectedCatogory={selectedCategory}
          onCategoryPress={setSelectedCategory}
        />
      </View>

      <Text style={{fontSize: 16, color: '#000000', marginVertical: 12}}>
        Đơn đã đặt
      </Text>

      <FlatList
        data={data}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <SingleMenu
              style={{marginHorizontal: 2}}
              madh={item.madh}
              date={item.date}
              time={item.time}
              imageMore={item.images}
              name={item.name}
              price={item.price}
              slSp={item.slSp}
              total={item.total}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Menu);
