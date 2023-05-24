import {useState, useEffect} from 'react';
import {View, StatusBar, Text} from 'react-native';
import Header from '../../component/Header';
import styles from './styles';
import CheckBoxGroup from '../../component/UpdateAddress2/CustomCheckBoxGroup';
import SplashScreen from 'react-native-splash-screen';
import RadioButton from '../../component/RadioButton';
import {fetchData, button} from './data';
import ChooseItem from '../../component/UpdateAddress2/ChooseItem';

const left = require('../../assets/UpdateAddress/Arrow1.png');

const UpdateAddress2 = ({navigation}) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [buttonSelect, setButtonSelect] = useState();
  const [isFetched, setisFetched] = useState(false);

  const selectedItem = item => {
    switch (item.type) {
      case 'province':
        button[0] = {...item, value: 'provinces', title: item.name};
        button[1] = {value: 'districts', title: 'Quận/Huyện'};
        button[2] = {value: 'wards', title: 'Phường/Xã'};
        setisFetched(!isFetched);
        return;
      case 'district':
        button[1] = {...item, value: 'districts', title: item.name};
        button[2] = {value: 'wards', title: 'Phường/Xã'};
        setisFetched(!isFetched);
        return;
      case 'ward':
        button[2] = {...item, value: 'wards', title: item.name};
        setisFetched(!isFetched);
        return;
    }
  };

  useEffect(() => {
    fetchData(buttonSelect).then(res => {
      setData(res);
    });
    buttonSelect?.value === 'provinces'
      ? setTitle('Tỉnh/Thành phố')
      : buttonSelect?.value === 'districts'
      ? setTitle('Quận/Huyện')
      : setTitle('Phường/Xã');
  }, [buttonSelect]);

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
        selected={value => {
          setButtonSelect(value);
        }}
        checkNum={1}
        forceRender={isFetched}
      />
      <Text style={styles.title}>{title}</Text>
      <RadioButton
        data={data}
        renderButton={({item, isSelected}) => (
          <ChooseItem isSelected={isSelected} item={item} />
        )}
        activeContButtonStyle={styles.activeText}
        inActiveContButtonStyle={styles.inActiveText}
        buttonStyle={styles.buttonText}
        containerStyle={styles.containerText}
        onSelect={selectedItem}
      />
    </View>
  );
};

export default UpdateAddress2;
