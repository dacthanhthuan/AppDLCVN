import {BarChart} from 'react-native-gifted-charts';
import styles from './styles';
import {memo, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {WINDOW_WIDTH, secondToGlobalDate} from '../../../../global';

type RPChartProps = {
  item: any;
  chartType?: 'day' | 'month' | 'quarter';
};

const RPChart = memo(
  function ({item, chartType = 'month'}: RPChartProps) {
    const [detailItem, setDetailItem] = useState<any>(undefined);
    let chartData: Array<any> = [];

    if (item) {
      let maxBar = item?.data[0]?.y;
      let minBar = item?.data[0]?.y;
      item.data.map((it: any) => {
        if (maxBar < it.y) {
          maxBar = it.y;
        }

        if (minBar > it.y) {
          minBar = it.y;
        }
      });

      chartData = [
        ...item.data.map((it: any) => {
          const value = parseInt(it.y) / 1000000;
          return {
            value: value.toFixed(2),
            label: it.x,
            frontColor:
              maxBar == it.y ? 'green' : minBar == it.y ? 'red' : '#FFC590',
          };
        }),
      ];
    }

    // event handler: on press bar
    const handleOnPress = useCallback(function (item: any) {
      setDetailItem(item);
    }, []);

    // side effect: clear detail when data has change
    useEffect(() => {
      setDetailItem(undefined);
    }, [item]);

    return (
      <View style={styles.container}>
        {item && (
          <BarChart
            data={chartData}
            height={250}
            barWidth={25}
            yAxisLabelSuffix="M"
            roundToDigits={2}
            rulesType="solid"
            initialSpacing={120}
            spacing={60}
            yAxisThickness={0}
            yAxisLabelWidth={60}
            yAxisTextStyle={styles.chartYAxisText}
            xAxisLabelTextStyle={styles.chartXAxisText}
            hideOrigin={true}
            xAxisColor={'#005aa9'}
            barBorderTopLeftRadius={10}
            barBorderTopRightRadius={10}
            onPress={handleOnPress}
            scrollToIndex={chartData.length - 1}
            isAnimated
            animationDuration={300}
          />
        )}

        {detailItem && (
          <View style={styles.detail}>
            <Text style={styles.detailDate}>{detailItem?.label}</Text>
            <Text style={styles.detailValue}>{detailItem?.value}M</Text>
          </View>
        )}

        <Text style={styles.chartTitle}>{item?.seriesName}</Text>
        <Text style={styles.chartSmallTitle}>
          Biểu đồ thống kê theo {item?.data?.length}
          {chartType == 'day'
            ? ' ngày'
            : chartType == 'month'
            ? ' tháng'
            : ' quý'}{' '}
          gần nhất
        </Text>
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default RPChart;
