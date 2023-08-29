import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Style_Historymoney from './style';
import {useNavigation} from '@react-navigation/native';

const HistoryMoney = ({
  img,
  datetime_1,
  money_1,
  action_1,
  status_1,
  datetime_2,
  money_2,
  action_2,
  status_2,
  style_1,
  style_2,
  style_3,
  style_4,
  data,
  isWidthDraw,
  all,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        Style_Historymoney.border,
        data.type == 1
          ? {backgroundColor: '#A8DF8E'}
          : data.type == -1
          ? {backgroundColor: '#FFBFBF'}
          : {backgroundColor: '#F5F5F5'},
      ]}
      onPress={() => {
        navigation.navigate('InforTranfer', {
          data: data,
          history: true,
          isWidthDraw,
          wallet: all,
        });
      }}>
      <Image style={Style_Historymoney.img} source={img} />
      <View style={Style_Historymoney.view_1}>
        <View style={Style_Historymoney.view_2}>
          <Text style={Style_Historymoney.text}>{datetime_1}</Text>
          <Text style={Style_Historymoney.text}>{money_1}</Text>
          <Text style={Style_Historymoney.text}>{action_1}</Text>
          <Text style={Style_Historymoney.text}>{status_1}</Text>
        </View>
        <View style={Style_Historymoney.view_3}>
          <Text style={style_1}>{datetime_2}</Text>
          <Text style={style_2}>{money_2}</Text>
          <Text style={style_3} numberOfLines={1}>
            {action_2}
          </Text>
          <Text style={style_4}>{status_2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryMoney;
