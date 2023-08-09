import React, {useState, useEffect, useCallback} from 'react';
import styles from './styles';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import Header from '../../component/Header';
import Input from '../../component/Input';
import Product from '../../component/Home/Product';
import {WINDOW_WIDTH, nomarlizeVietNamese} from '../../MyGlobal';
import {useSelector} from 'react-redux';
import LoadingOverlay from '../../component/LoadingOverlay';
import LottieView from 'lottie-react-native';
import assets from '../../assets';

const SearchProduct = ({navigation, route}) => {
  const productData = useSelector(state => state.product.data);
  const [filterProduct, setFilterProduct] = useState([]);
  const [keyword, setKeyword] = useState(route.params?.text || '');
  const [searching, setSearching] = useState(true);

  let debounceTimeout;

  //debounce setting keyword
  const debounceSetkeyword = useCallback(
    keyword => {
      // clear timeout whenever this function is invoked
      clearTimeout(debounceTimeout);

      // if keyword's length is greater 0 then debouncing setKeyword,
      // otherwise setKeyword immediately
      if (keyword.length > 0) {
        debounceTimeout = setTimeout(() => {
          let pData = [];
          productData.map(item => {
            pData = [...pData, ...item];
          });

          let filter = pData.filter(item => {
            return nomarlizeVietNamese(item?.product_name).includes(
              nomarlizeVietNamese(keyword),
            );
          });

          setFilterProduct(filter);
          setSearching(false);
        }, 300);
      } else {
        let pData = [];
        productData.map(item => {
          pData = [...pData, ...item];
        });

        setFilterProduct(pData);
      }
    },
    [productData],
  );

  // feature search
  useEffect(() => {
    debounceSetkeyword(keyword);
  }, [keyword]);

  return searching ? (
    <LoadingOverlay />
  ) : (
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
        onChangeText={setKeyword}
        value={keyword}
        onFocus={() => {
          setKeyword('');
        }}
      />

      <Text
        style={{
          marginTop: 25,
          color: '#000000',
          fontSize: 16,
          fontWeight: '400',
          paddingBottom: 10,
        }}>
        {filterProduct.length} sản phẩm phù hợp
      </Text>

      <FlatList
        style={{width: WINDOW_WIDTH}}
        data={filterProduct}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.unique_id)}
        ListHeaderComponent={<View style={{marginTop: 20}}></View>}
        ListEmptyComponent={
          <LottieView
            style={{width: 250, height: 250, alignSelf: 'center'}}
            source={assets.LottieAnimation.not_found}
            loop
            autoPlay
          />
        }
        renderItem={({item}) => <Product item={item} />}
      />
    </SafeAreaView>
  );
};

export default React.memo(SearchProduct);
