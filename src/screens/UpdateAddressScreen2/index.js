import { useState, useEffect } from 'react';
import { View, StatusBar, Text, FlatList } from 'react-native';
import Header from '../../component/Header';
import styles from './styles';
import CheckBoxGroup from '../../component/UpdateAddress2/CustomCheckBoxGroup';
import { button, fetchProvince, fetchDistrict, fetchWard } from './data';
import ChooseItem from '../../component/UpdateAddress2/ChooseItem';
import { useSelector } from 'react-redux';
import Button from '../../component/Button';

const left = require('../../assets/UpdateAddress/Arrow1.png');

const UpdateAddress2 = ({ navigation, route }) => {

  const previousScreen = route.params?.previousScreen;
  const itemId = route.params?.itemId;
  const itemIsDefault = route.params?.itemIsDefault;
  console.log('UPDATE2:>>', itemIsDefault);


  console.log(previousScreen);
  console.log(itemId);
  // useEffect(() => {
  //   console.log(data?.data?.session_token)
  //   console.log(item);
  // }, [])

  const { data } = useSelector((state) => state.postReducers)
  const [isData, setIsData] = useState([]);
  const [title, setTitle] = useState('');
  const [buttonSelect, setButtonSelect] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState([]);
  const [wardId, setWardId] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState([]);


  const fetchLocationData = async () => {
    let response = null;

    if (buttonSelect?.value === 'provinces') {
      response = await fetchProvince({ 'toKen': data?.data?.session_token });
    } else if (buttonSelect?.value === 'districts') {
      response = await fetchDistrict({ 'toKen': data?.data?.session_token, 'cityId': selectedItemId?.id });
    } else if (buttonSelect?.value === 'wards') {
      response = await fetchWard({ 'toKen': data?.data?.session_token, 'districtId': selectedItemId?.id });
    }

    if (response) {
      // console.log('response:>>', response);
      setIsData(response);
      setIsFetched(true);
    }
  };

  useEffect(() => {
    if (buttonSelect) {
      fetchLocationData();
    }
  }, [buttonSelect]);

  useEffect(() => {
    setTitle(buttonSelect?.title || '');
  }, [buttonSelect]);


  // Khi tích chọn sẽ lấy ra ID
  const handleItemPress = (item) => {
    setSelectedItemId(item);
    // console.log('Selected item id:', item);

    if (buttonSelect?.value === 'provinces') {
      setProvinceId(item);
      setDistrictId(null); // Reset districtId when selecting a province
      setWardId(null); // Reset wardId when selecting a province
    } else if (buttonSelect?.value === 'districts') {
      setDistrictId(item);
      setWardId(null); // Reset wardId when selecting a district
    } else if (buttonSelect?.value === 'wards') {
      setWardId(item);
    }
  };

  const navigateToDestination = async (destinationScreen) => {
    const destinationParams = {
      itemUpdate: {
        province: provinceId,
        district: districtId,
        ward: wardId,
      },
    };

    if (destinationScreen === 'UpdateAddress1') {
      destinationParams.itemId = itemId; // Thêm itemId vào các tham số chuyển tiếp
      destinationParams.itemIsDefault = itemIsDefault; // Thêm itemIsDefault vào các tham số chuyển tiếp
    }

    // if (destinationScreen === 'CustomerInformation') {
    //   try {
    //     const response = await fetchUpdateAddress({
    //       'toKen': data?.data?.session_token,
    //       'ID': item?.id,
    //       'cityId': provinceId?.id,
    //       'districtId': districtId?.id,
    //       'wardId': wardId?.id,
    //       'Address': item?.address,
    //       'Mobile': item?.mobile,
    //       'fullName': item?.fullname,
    //     });

    //     console.log('Update Address Response:', response);

    //   } catch (error) {
    //     console.log('Error updating address:', error);
    //   }
    // }

    navigation.navigate(destinationScreen, destinationParams);
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.header}
        text={'Sửa địa chỉ'}
        iconLeft={left}
        onPressLeft={() => navigation.goBack()}
      />
      <Text style={styles.title}>Chọn khu vực</Text>
      <CheckBoxGroup
        data={button}
        selected={(value) => {
          setButtonSelect(value);
          setIsFetched(false); // Reset isFetched when a new button is selected
        }}
        checkNum={1}
        forceRender={isFetched}
      />
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={isData}
        style={{ paddingHorizontal: 16, marginTop: 16 }}
        renderItem={({ item }) => {
          return (
            <ChooseItem
              item={item}
              onPress={handleItemPress}
              isSelected={item === selectedItemId}
            />
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button
        text={'Hoàn thành'}
        onPress={() => {
          if (previousScreen === 'AddAddress') {
            navigateToDestination('AddAddress');
          } else if (previousScreen === 'UpdateAddress1') {
            navigateToDestination('UpdateAddress1');
          }
        }}
      />
    </View>
  );
};

export default UpdateAddress2;