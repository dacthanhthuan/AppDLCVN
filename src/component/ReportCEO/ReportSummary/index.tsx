import React, {memo} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ColorValue,
  GestureResponderEvent,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {formatPrice} from '../../../global';

type ReportSummaryProps = {
  data: any;
  loading: boolean;
  from: string;
  isYear: boolean;
  onChosen?: (chose: any) => void;
};

const colors = ['#005aa930', '#FF006050', '#A2678A50', '#FFBB5C80'];

const ReportSummary = memo(
  function ({
    data,
    loading,
    onChosen,
    from,
    isYear = false,
  }: ReportSummaryProps) {
    const list = [
      {
        id: 1,
        name: 'Doanh số giá lẻ',
        value: data?.total_revenue,
      },
      {
        id: 2,
        name: 'Doanh thu giá sỉ',
        value: data?.total_revenue,
      },
      {
        id: 3,
        name: 'Giá vốn',
        value: data?.total_cost,
      },
      {
        id: 4,
        name: 'Lợi nhuận',
        value:
          data?.total_revenue && data?.total_cost
            ? parseInt(data?.total_revenue) - parseInt(data?.total_cost)
            : 0,
      },
    ];

    const [fromDate, _f] = from ? from.split(' ') : ['', ''];

    const [_a, fromMonth, fromYear, _b] = fromDate
      ? fromDate.split('/')
      : ['', '', '', ''];

    return (
      <View>
        <View style={loading ? styles.containerLoading : null}>
          <Text style={styles.title}>
            {isYear ? `Năm ${fromYear}` : `Tháng ${fromMonth} - ${fromYear} `}
          </Text>

          <View style={styles.list}>
            {list.map((item, index) => {
              return (
                <ReportSummaryItem
                  key={item.id}
                  value={item.value}
                  name={item.name}
                  color={colors[index]}
                />
              );
            })}
          </View>
        </View>
        {loading && (
          <ActivityIndicator
            color={'#005aa9'}
            size="large"
            style={styles.loadingIndicator}
          />
        )}
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default ReportSummary;

type ReportSummaryItemProps = {
  value: string;
  name: string;
  color: ColorValue;
  onPress?: (e: GestureResponderEvent) => void;
};

const ReportSummaryItem = memo(function ({
  value,
  name,
  color,
}: ReportSummaryItemProps) {
  return (
    <TouchableOpacity style={[styles.item, {backgroundColor: color}]}>
      <Text style={styles.itemValue}>{formatPrice(value)}</Text>
      <Text style={styles.itemName}>{name}</Text>
      <Image
        source={require('../../../assets/grow-up.png')}
        style={styles.itemImage}
      />
    </TouchableOpacity>
  );
});
