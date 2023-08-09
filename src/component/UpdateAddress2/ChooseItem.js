import {memo, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {
  useAddressCheckBox,
  useAddressCheckBoxDispatch,
  AddressCheckBoxActions,
} from './AddressCheckBox/context';

const check = require('../../assets/UpdateAddress/Rectangle263.png');

const ChooseItem = ({item}) => {
  const addressDispatch = useAddressCheckBoxDispatch();
  const addressCheckbox = useAddressCheckBox();
  const [isSelected, setIsSelected] = useState(
    item.id === addressCheckbox.city.id ||
      item.id === addressCheckbox.district.id ||
      item.id === addressCheckbox.ward.id,
  );

  useEffect(() => {
    setIsSelected(
      item.name === addressCheckbox.city.name ||
        item.name === addressCheckbox.district.name ||
        item.name === addressCheckbox.ward.name,
    );
  }, [
    addressCheckbox.city.name,
    addressCheckbox.district.name,
    addressCheckbox.ward.name,
  ]);

  const onSelect = useCallback(() => {
    setIsSelected(value => !value);

    if (item.city_id) {
      // district has city_id
      addressDispatch(AddressCheckBoxActions.selectListDistrict(item));
    } else if (item.district_id) {
      // ward has district_id
      addressDispatch(AddressCheckBoxActions.selectListWard(item));
    } else {
      // city
      addressDispatch(AddressCheckBoxActions.selectListCity(item));
    }
  }, [item]);

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.container, isSelected ? styles.onCheck : null]}>
      <Text style={styles.text}>{item.name}</Text>
      {isSelected ? (
        <Image source={check} style={styles.imageTextCheck} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '96%',
    backgroundColor: 'rgba(246,246,246,1)',
    marginVertical: 5,
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },

  onCheck: {
    borderBottomWidth: 2,
    borderColor: '#005aa6',
  },

  imageTextCheck: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: '5%',
  },

  text: {
    fontSize: 13,
    color: 'black',
    padding: 10,
  },
});

export default memo(ChooseItem, (pre, next) => {
  JSON.stringify(pre.item) === JSON.stringify(next.item);
});
