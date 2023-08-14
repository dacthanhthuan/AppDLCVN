import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './styles';

const StatusMenu = ({categori: data, selectedCatogory, onCategoryPress}) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        const selected = selectedCatogory == item.id;
        return (
          <TouchableOpacity
            onPress={() => onCategoryPress(item.id)}
            style={[
              styles.container,
              selected ? styles.selectedItemContainer : {},
            ]}>
            <Text style={[styles.text, selected ? styles.selectedItem : {}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default React.memo(StatusMenu);
