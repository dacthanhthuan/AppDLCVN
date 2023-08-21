import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import StyleSupplier from './style';
import Search from '../../component/Search';
import LottieView from 'lottie-react-native';
import assets from '../../assets';
import {useIsReady} from '../../global';
import LoadingOverlay from '../../component/LoadingOverlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  SupplierListActions,
  SupplierProductListActions,
} from '../../redux/actions/supplierActions';
import {
  riseSupplierProductsList,
  useSupplierProductsDispatch,
  SupplierProductsListProvider,
} from '../../component/SupplierProductsList/context';
import {useNavigation} from '@react-navigation/native';
import LoadmoreIndicator from '../../component/Home/LoadmoreIndicator';
import Header from '../../component/Header';

const Supplier = () => {
  const isReady = useIsReady();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const supplierProductsDispatch = useSupplierProductsDispatch();

  const supplier = useSelector(state => state.supplier.supplier);
  const supplierLoading = useSelector(state => state.supplier.supplierLoading);
  const supplierNextPage = useSelector(
    state => state.supplier.supplier_next_page,
  );
  const supplierTotalRecord = useSelector(
    state => state.supplier.supplier_total_record,
  );
  const supplierCurrentRecord = useSelector(
    state => state.supplier.supplier_current_record,
  );

  const loadingApp = useSelector(state => state.app.loading);

  const session_token = useSelector(state => state.user.session_token);
  const login = useSelector(state => state.user.login.status);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [initialRendered, setInitalRendered] = useState(true);

  // call api to get supplier list
  const getSupplierListApi = (key = '', page = 1) => {
    dispatch(
      SupplierListActions.start({
        keyword: key,
        token: session_token ? session_token : '',
        page: page,
      }),
    );
  };

  // call api to get supplier products list
  const getSupplierProductListApi = (page = 1, supplier_id) => {
    dispatch(
      SupplierProductListActions.start({
        keyword: '',
        page: page,
        supplier_id: supplier_id,
        token: session_token ? session_token : '',
      }),
    );
  };

  // initial rendered and reload after loading app domain and api
  useEffect(() => {
    if (!loadingApp) {
      dispatch(SupplierListActions.clear());
      getSupplierListApi();
    }
    setInitalRendered(false);
  }, [loadingApp, login]);

  // update supplier data
  useEffect(() => {
    setData(supplier);
    if (!supplierLoading) {
      setRefreshing(false);
      setLoadmore(false);
    }
  }, [supplier]);

  // handle refreshing
  useEffect(() => {
    if (refreshing) {
      setSearch('');
      Keyboard.dismiss();
      setLoadmore(false);
      dispatch(SupplierListActions.clear());
      getSupplierListApi();
    }
  }, [refreshing]);

  // handle loadmore
  const handleLoadmore = () => {
    if (!supplierLoading) {
      getSupplierListApi(search, supplierNextPage);
    }
  };

  // handle search
  const handleSearch = e => {
    dispatch(SupplierListActions.clear());
    getSupplierListApi(e.nativeEvent.text.trim(), 1);
  };

  // when user clear search text
  useEffect(() => {
    if (search.length == 0 && !initialRendered) {
      dispatch(SupplierListActions.clear());
      getSupplierListApi('', 1);
    }
  }, [search]);

  // render item
  const RenderItem = useCallback(({item}) => {
    return (
      <Pressable
        style={({pressed}) => [
          StyleSupplier.container_2,
          pressed ? {backgroundColor: 'rgba(194,194,194,0.3)'} : null,
        ]}
        onPress={() => {
          getSupplierProductListApi(1, item.id);
          supplierProductsDispatch(riseSupplierProductsList(item));
          // hide tabbar when supplier products is shown
          navigation.setOptions({tabBarStyle: {display: 'none'}});
        }}>
        <Image
          style={StyleSupplier.imgSupplier}
          source={
            item.logo ? {uri: item.logo} : require('../../assets/noimage.png')
          }
        />
        <View>
          <View style={StyleSupplier.container_3}>
            <Text style={StyleSupplier.name}>{item.name}</Text>
            <Text style={StyleSupplier.detail} numberOfLines={2}>
              {item.short_description}
            </Text>
          </View>
          <View style={StyleSupplier.container_4}>
            <Text style={StyleSupplier.quantity}>
              {item.total_product > 99 ? '99+' : item.total_product} sản phẩm
            </Text>
            <Text style={StyleSupplier.city}>{item.city}</Text>
          </View>
        </View>
      </Pressable>
    );
  }, []);

  return !isReady ? (
    <LoadingOverlay />
  ) : (
    <SafeAreaView style={StyleSupplier.container}>
      <Header
        iconLeft={require('../../assets/white.png')}
        text="Nhà cung cấp"
        iconRight={require('../../assets/Vector.png')}
        onPressRight={() => {
          navigation.navigate('Cart');
        }}
        showCartBadge={true}
        isWallet={true}
        containerStyle={{paddingHorizontal: 15, paddingTop: 15}}
      />
      <View style={StyleSupplier.container_1}>
        <Search
          placeholder={'Tìm nhà cung cấp'}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity>
          <Image
            style={StyleSupplier.imgSetting}
            source={require('../../assets/imgSupplier/Rectangle_313.png')}
          />
        </TouchableOpacity>
      </View>
      {search.length > 0 && data.length == 0 ? (
        <Text style={{paddingHorizontal: 15}}>Không tìm thấy nhà cung cấp</Text>
      ) : null}
      <FlatList
        data={data}
        style={{paddingHorizontal: 15}}
        contentContainerStyle={{paddingBottom: 15}}
        renderItem={RenderItem}
        initialNumToRender={6}
        ListEmptyComponent={
          supplierLoading && !refreshing ? (
            <ActivityIndicator size={'large'} color={'#005aa9'} />
          ) : !refreshing ? (
            <LottieView
              source={assets.LottieAnimation.not_found}
              loop
              autoPlay
              style={{width: 250, height: 250, alignSelf: 'center'}}
            />
          ) : null
        }
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={['white']}
            progressBackgroundColor={'#005AA9'}
            onRefresh={() => setRefreshing(true)}
          />
        }
        onEndReached={() => {
          if (supplierCurrentRecord < supplierTotalRecord) {
            setLoadmore(true);
            handleLoadmore();
          }
        }}
      />
      {loadmore ? <LoadmoreIndicator /> : null}
    </SafeAreaView>
  );
};

const SupplierWrapper = () => {
  return (
    <SupplierProductsListProvider>
      <Supplier />
    </SupplierProductsListProvider>
  );
};

export default SupplierWrapper;
