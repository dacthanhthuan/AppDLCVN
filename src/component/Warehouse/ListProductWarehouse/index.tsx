import {memo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ProductShowmore from '../../Home/ProductShowmore';
import {formatPoint, showmoreImage} from '../../../MyGlobal';
import CardProduct from '../CardProduct';
import styles from './styles';
import CardShowmore from '../CardShowmore';

type ListProductWarehouseProps = {
  data: any;
  isShowmore: boolean;
};

const ListProductWarehouse = ({
  data,
  isShowmore = false,
}: ListProductWarehouseProps) => {
  data = isShowmore ? [...data, {}] : data;
  const img = showmoreImage;

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({item, index}) =>
        isShowmore && index === data.length - 1 ? (
          <CardShowmore name="Xem thêm..." imageSource={img} />
        ) : (
          <CardProduct
            title={item.product_name}
            categori={item.product_id}
            price={formatPoint(item.price)}
            style={undefined}
            image={{uri: item.img_1}}
            onPress={undefined}
          />
        )
      }
      removeClippedSubviews={true}
      windowSize={11}
    />
  );
};

export default memo(ListProductWarehouse, (pre, next) => {
  return JSON.stringify(pre.data) === JSON.stringify(next.data);
});
