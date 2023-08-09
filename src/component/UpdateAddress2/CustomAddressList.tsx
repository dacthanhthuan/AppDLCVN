import {Pressable, Text, View, FlatList, FlatListProps} from 'react-native';
import {memo, useState, useEffect} from 'react';
import ChooseItem from './ChooseItem';
import {
  useAddressCheckBox,
  useAddressCheckBoxDispatch,
} from './AddressCheckBox/context';
import {useSelector} from 'react-redux';

interface CustomRadioButtonProps extends FlatListProps<any> {}

const AddressList = (props: CustomRadioButtonProps) => {
  const addressCheckbox = useAddressCheckBox();
  const location = useSelector((state: any) => state.location);
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (addressCheckbox.buttonSelect) {
      // city
      case 'city': {
        setData(location.city);
        break;
      }

      // district
      case 'district': {
        setData(location.district);
        break;
      }

      // ward
      case 'ward': {
        setData(location.ward);
        break;
      }
    }
  }, [addressCheckbox, location]);

  useEffect(() => {
    setData(location.city);
  }, []);

  return (
    <FlatList
      {...props}
      data={data}
      style={{height: '100%'}}
      renderItem={({item}) => <ChooseItem item={item} />}
      ListEmptyComponent={<Text>Không có dữ liệu</Text>}
      removeClippedSubviews={true}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={11}
    />
  );
};

export default memo(AddressList);
