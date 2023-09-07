import {memo, useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import Button from '../../../Button';
import styles from './styles';
import {GestureResponderEvent} from 'react-native-modal';

type SelectGroupProps = {
  data: Array<any>;
  onSelect: (item: any) => void;
  defaultId?: number;
};

const SelectGroup = memo(
  function ({data, onSelect, defaultId = 0}: SelectGroupProps) {
    const [selectedId, setSelectedId] = useState(defaultId);

    // handle on select another item
    const handleOnSelect = useCallback(
      (item: any) => {
        if (item.id != selectedId) {
          setSelectedId(item.id);
          if (typeof onSelect == 'function') {
            onSelect(item);
          }
        }
      },
      [selectedId],
    );

    return (
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <SelectGroupItem
            text={item.name}
            isSelect={index == selectedId}
            onPress={() => handleOnSelect(item)}
          />
        )}
        removeClippedSubviews
        style={styles.list}
        contentContainerStyle={styles.contentList}
        horizontal
      />
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

type SelectGroupItemProps = {
  text: any;
  isSelect: boolean;
  onPress: (e?: GestureResponderEvent) => void;
};

const SelectGroupItem = memo(
  function ({text, isSelect, onPress}: SelectGroupItemProps) {
    return (
      <Button
        text={text}
        onPress={onPress}
        style={[isSelect ? styles.selectButton : styles.nonSelectButton]}
        styleText={[isSelect ? styles.selectText : styles.nonSelectText]}
      />
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default SelectGroup;
