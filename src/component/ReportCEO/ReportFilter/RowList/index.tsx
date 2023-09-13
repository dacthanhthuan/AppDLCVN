import {ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {GestureResponderEvent} from 'react-native';

type RowListProps = {
  data: Array<any>;
  defaultSelect?: any;
  onChosen?: (item: any) => void;
};

const RowList = memo(
  function ({data, defaultSelect, onChosen}: RowListProps) {
    const [selectedItem, setSelectedItem] = useState(defaultSelect);
    const scrollRef = useRef<ScrollView | any>(null);
    const scrollIndex = useRef<number>(
      data.findIndex(
        (item: any) => JSON.stringify(item) === JSON.stringify(defaultSelect),
      ),
    );

    // event handler: on choose item
    const handleOnChosen = useCallback((item: any, index: number) => {
      setSelectedItem(item);

      scrollIndex.current = index;
      scrollRef.current.scrollTo({y: 0, x: scrollIndex.current * 50});

      if (typeof onChosen == 'function') {
        onChosen(item);
      }
    }, []);

    // side effect: scroll to selected item once after initial rendering
    useEffect(() => {
      scrollRef.current.scrollTo({y: 0, x: scrollIndex.current * 50});
    }, []);

    return (
      <ScrollView
        ref={scrollRef}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.contentList}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <RowListItem
            key={item}
            item={item}
            isSelected={JSON.stringify(selectedItem) === JSON.stringify(item)}
            onPress={() => handleOnChosen(item, index)}
          />
        ))}
      </ScrollView>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default RowList;

type RowListItemProps = {
  item: any;
  isSelected?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
};

const RowListItem = memo(function ({
  item,
  isSelected,
  onPress,
}: RowListItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.itemButton,
        isSelected ? styles.selectedItemButton : null,
      ]}>
      <Text
        style={[
          styles.itemLabel,
          isSelected ? styles.selectedItemLabel : null,
        ]}>
        {item == 0 ? 'Tất cả' : item}
      </Text>
    </TouchableOpacity>
  );
});
