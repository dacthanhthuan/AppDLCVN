import React from 'react';
import {TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './styles';

const LogoBanking = ({data, isSelected, onSelect}) => {
  return (
    <FlatList
      data={data}
      horizontal
      removeClippedSubviews
      renderItem={({item}) => {
        const selected = JSON.stringify(isSelected) === JSON.stringify(item);
        return (
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
            }}
            style={[styles.container, selected ? styles.selectedItem : {}]}>
            <Image
              style={styles.imgBanking}
              resizeMode="contain"
              source={{uri: item.url}}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default React.memo(LogoBanking);
