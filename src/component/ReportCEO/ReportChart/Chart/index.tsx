import {BarChart} from 'react-native-gifted-charts';
import styles from './styles';
import {memo, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {WINDOW_WIDTH, secondToGlobalDate} from '../../../../global';

const data = [
  {value: 8.1231, label: '1/1/2023'},
  {value: 9, label: '2/2/2023'},
  {value: 2, label: '3/3/2023'},
  {value: 3, label: '4/4/2023'},
  {value: 1, label: '5/5/2023'},
  {value: 6, label: '6/6/2023'},
  {value: 5, label: '7/7/2023'},
  {value: 9, label: '8/8/2023'},
  {value: 7, label: '8/9/2023'},
  {value: 8.4, label: '8/10/2023'},
  {value: 1.4, label: '8/11/2023'},
  {value: 5.4, label: '8/12/2023'},
];

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
            capColor={'black'}
            barBorderTopLeftRadius={10}
            barBorderTopRightRadius={10}
            renderTooltip={(item: any) => <ChartToolTip item={item} />}
            onPress={handleOnPress}
            scrollToIndex={chartData.length - 1}
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
          Biểu đồ thống kê theo{' '}
          {chartType == 'day'
            ? item?.data?.length + ' ngày'
            : chartType == 'month'
            ? item?.data?.length + ' tháng'
            : item?.data?.length + ' quý'}{' '}
          gần nhất
        </Text>
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default RPChart;

type ChartToolTipProps = {
  item: any;
};

const ChartToolTip = memo(function ({item}: ChartToolTipProps) {
  return (
    <View style={styles.tooltipView}>
      <Text style={styles.tooltipText}>{item.value}M</Text>
    </View>
  );
});
