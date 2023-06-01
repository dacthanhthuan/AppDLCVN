import React from 'react';
import { TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles';

const LogoBanking = ({ logo, isSelected, onSelect }) => {

  return (
    <FlatList
      data={logo}
      horizontal
      renderItem={({ item }) => {
        const selected = isSelected === item;
        return (
          <TouchableOpacity
            onPress={() => { onSelect(item) }}
            style={[styles.container, selected ? styles.selectedItem : {}]}>
            <Image style={styles.imgBanking} resizeMode='contain' source={item} />
          </TouchableOpacity>
        )
      }} />
  );
};

export default React.memo(LogoBanking);
