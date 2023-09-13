import {memo, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';

type ShopIdListProps = {
  data: Array<any>;
  onChosen?: (shopId: string | number | undefined) => void;
};

const ShopIdList = memo(function ({data, onChosen}: ShopIdListProps) {
  const list = [{id: -1, name: 'Tất cả chi nhánh'}, ...data];
  const [selectedItem, setSelectedItem] = useState(list[0]);

  // event handler: handle on chosen shop
  const handleOnChosen = (item: any) => {
    setSelectedItem(item);

    if (typeof onChosen == 'function') {
      onChosen(item);
    }
  };

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentList}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={list}
      renderItem={({item}) => (
        <ShopIdItem
          label={item.name}
          isSelected={JSON.stringify(item) === JSON.stringify(selectedItem)}
          onPress={() => handleOnChosen(item)}
        />
      )}
      removeClippedSubviews
      initialNumToRender={5}
    />
  );
});

export default ShopIdList;

type ShopIdItemProps = {
  label: string;
  isSelected?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
};

const ShopIdItem = memo(function ({
  label,
  onPress,
  isSelected,
}: ShopIdItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, isSelected ? styles.itemSelected : null]}>
      <Text style={styles.itemLabel}>{label}</Text>
    </TouchableOpacity>
  );
});
