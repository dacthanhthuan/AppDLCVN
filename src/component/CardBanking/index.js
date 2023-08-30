import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import styles from './styles';

const CardBanking = ({ logo, isSelected, onSelect }) => {

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {logo.map((item) => {
        const selected = isSelected === item;
        return (
          <TouchableOpacity
            key={item.id} // Make sure to use a unique key
            onPress={() => { onSelect(item) }}
            style={[styles.container, selected ? styles.selectedItem : {}]}>
            <Image style={styles.imgBanking} resizeMode='contain' source={{ uri: item?.icon }} />
            <Text style={{ textAlign: 'center' }}>{item?.short}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(CardBanking);
