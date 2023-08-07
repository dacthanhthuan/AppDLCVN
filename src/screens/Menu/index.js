import React, {useState, useEffect, useCallback} from 'react';
import styles from './styles';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../../component/Header';
import SingleMenu from '../../component/SingleMenu';
import StatusMenu from '../../component/StatusMenu';
import StatusWallet from '../../component/StatusWallet';
import {FlatList} from 'react-native-gesture-handler';
import {useIsReady} from '../../MyGlobal';
import LoadingOverlay from '../../component/LoadingOverlay';

const data = [
  {
    madh: '002220321D9M',
    date: '25/03/2022',
    time: '17:40',
    goods: [
      {
        name: 'DLC Brazil Green Propolis',
        source: require('../../assets/dlcbrazil.png'),
        price: 1000000,
        producerPrice: 600000,
      },

      {
        name: 'DLC Brazil Green Propolis',
        source: require('../../assets/dlcred.png'),
        price: 700000,
        producerPrice: 400000,
      },
      {
        name: 'DLC Brazil Green Propolis',
        source: require('../../assets/dlcsoybean.png'),
        price: 1300000,
        producerPrice: 800000,
      },
      {
        name: 'DLC Brazil Green Propolis',
        source: require('../../assets/Group135.png'),
        price: 1200000,
        producerPrice: 800000,
      },
      {
        name: 'DLC Brazil Green Propolis',
        source: require('../../assets/Group135.png'),
        price: 800000,
        producerPrice: 600000,
      },
    ],
    slSp: 5,
    total: 5200000,
    producerTotal: 3200000,
    type: 'money/paying',
  },
  {
    madh: '12C220321D9M',
    date: '25/03/2022',
    time: '17:40',
    goods: [
      {
        name: 'Auslac Lactoferrin (Giá Ưu Đãi)',
        source: require('../../assets/Ellipse83.png'),
        price: 1100000,
        producerPrice: 700000,
      },
      {
        name: 'DLC Brazil Green Propolis',
        source: require('../../assets/dlcred.png'),
        price: 900000,
        producerPrice: 500000,
      },
    ],
    slSp: 2,
    total: 2000000,
    producerTotal: 1200000,
    type: 'money/delivered',
  },
  {
    madh: '002123321D9A',
    date: '25/03/2022',
    time: '17:40',
    goods: [
      {
        source: require('../../assets/Ellipse83.png'),
        name: 'Auslac Lactoferrin (Giá Ưu Đãi)',
        price: 1100000,
        producerPrice: 700000,
      },
    ],
    slSp: 1,
    total: 1100000,
    producerTotal: 700000,
    type: 'point/canceled',
  },
  {
    madh: '002123321D9A',
    date: '25/03/2022',
    time: '17:40',
    goods: [
      {
        source: require('../../assets/dlcsoybean.png'),
        name: 'Viên uống DLC Antrodia Cinnamomea',
        price: 800000,
        producerPrice: 500000,
      },
    ],
    slSp: 1,
    total: 800000,
    producerTotal: 500000,
    type: 'point/paying',
  },
];

const ALL = 'Tất cả';
const CTT = 'Chờ thanh toán';

const Menu = ({navigation}) => {
  const isReady = useIsReady();

  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedCategori, setSelectedCategori] = useState(CTT);
  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    switch (true) {
      case selectedCategory.includes('Ví VNĐ'):
        setFilterData(getFilteredData('money'));
        break;
      case selectedCategory.includes('Ví điểm'):
        setFilterData(getFilteredData('point'));
        break;
      case selectedCategory.includes('Tất cả'):
        setFilterData(getFilteredData('o'));
        break;
    }
  }, [selectedCategory, selectedCategori]);

  const filterMyData = useCallback((payingType, payingState) => {
    return data.filter(
      item => item.type.includes(payingType) && item.type.includes(payingState),
    );
  }, []);

  const getFilteredData = payingType => {
    switch (true) {
      case selectedCategori.includes('Chờ thanh toán'):
        return filterMyData(payingType, 'paying');
      case selectedCategori.includes('Hoàn thành'):
        return filterMyData(payingType, 'delivered');
      case selectedCategori.includes('Đã hủy'):
        return filterMyData(payingType, 'cancel');
    }
  };

  return !isReady ? (
    <LoadingOverlay />
  ) : (
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
        data={filterData}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <SingleMenu style={{marginHorizontal: 2}} data={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Menu);
