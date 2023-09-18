import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  View,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {memo} from 'react';
import {formatPrice} from '../../global';

export default function ShipmentList() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    data,
    products,
    totalPrices,
    totalProfit,
    totalImportPrice,
    totalPriceOriginal,
    totalProfitOriginal,
    type,
  }: any = route.params;

  // event handler: onPress shipment
  const handleOnPressShipment = (shipment: any) => {
    navigation.navigate('CreateOrder', {
      chosenShipment: shipment,
      products,
      totalPrices,
      totalProfit,
      totalImportPrice,
      totalPriceOriginal,
      totalProfitOriginal,
      type,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={'Phương thức giao hàng'}
        iconLeft={require('../../assets/Arrow1.png')}
        iconRight={require('../../assets/white.png')}
        onPressLeft={() => navigation.goBack()}
        onPressRight={undefined}
        containerStyle={styles.header}
        showCartBadge={undefined}
      />

      <FlatList
        data={data}
        renderItem={({item}: any) => (
          <ListItem
            item={item}
            onPress={function (e: GestureResponderEvent) {
              handleOnPressShipment(item);
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

type ListItemProps = {
  item: any;
  onPress: (e: GestureResponderEvent) => void;
};

const ListItem = memo(function ({item, onPress}: ListItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image style={styles.itemImage} source={{uri: item.carrier_logo}} />
      <View>
        <Text style={styles.itemTitle}>{item.carrier_name}</Text>
        <Text style={styles.itemLabel}>
          Dịch vụ giao hàng:{' '}
          <Text style={styles.itemValue}>{item.service}</Text>
        </Text>
        <Text style={styles.itemLabel}>
          Chi phí dịch vụ:{' '}
          <Text style={styles.itemPrice}>{formatPrice(item.total_fee)}</Text>
        </Text>
        <Text style={styles.itemValue}>{item.expected}</Text>
      </View>
    </TouchableOpacity>
  );
});
