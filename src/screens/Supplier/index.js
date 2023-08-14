import React, {useState, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import StyleSupplier from './style';
import data_supplier from '../../data/data_supplier/data';
import Search from '../../component/Search';
import LottieView from 'lottie-react-native';
import assets from '../../assets';
import {useIsReady} from '../../MyGlobal';
import LoadingOverlay from '../../component/LoadingOverlay';
import {useSelector} from 'react-redux';
import LoginNow from '../LoginNow';

const Supplier = () => {
  const isReady = useIsReady();

  const login = useSelector(state => state.user.login.status);

  const [search, setSearch] = useState('');
  const Searchfuncion = data_supplier.filter(itemsearch => {
    return itemsearch.name.toLowerCase().includes(search);
  });

  const render_item = ({item}) => {
    return (
      <TouchableOpacity style={StyleSupplier.container_2}>
        <Image style={StyleSupplier.imgSupplier} source={item.img} />
        <View>
          <View style={StyleSupplier.container_3}>
            <Text style={StyleSupplier.name}>{item.name}</Text>
            <Text style={StyleSupplier.detail}>{item.detail}</Text>
          </View>
          <View style={StyleSupplier.container_4}>
            <Text style={StyleSupplier.quantity}>{item.quantity}</Text>
            <Text style={StyleSupplier.city}>{item.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return !login ? (
    <LoginNow />
  ) : !isReady ? (
    <LoadingOverlay />
  ) : (
    <SafeAreaView style={StyleSupplier.container}>
      <Text style={StyleSupplier.title}>Nhà cung cấp</Text>
      <View style={StyleSupplier.container_1}>
        <Search
          placeholder={'Tìm nhà cung cấp'}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Image
            style={StyleSupplier.imgSetting}
            source={require('../../assets/imgSupplier/Rectangle_313.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 15}}>
        {search.length > 0 && Searchfuncion.length == 0 ? (
          <Text>Không tìm thấy nhà cung cấp</Text>
        ) : null}
        <FlatList
          data={Searchfuncion}
          renderItem={render_item}
          ListEmptyComponent={
            <LottieView
              source={assets.LottieAnimation.not_found}
              loop
              autoPlay
              style={{width: 250, height: 250, alignSelf: 'center'}}
            />
          }
          // keyExtractor={(item, title) => title.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Supplier;
