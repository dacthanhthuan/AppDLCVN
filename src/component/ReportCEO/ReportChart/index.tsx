import {ActivityIndicator, Pressable, View} from 'react-native';
import {memo} from 'react';
import ReportChartHeader from './HeaderTab';
import RPChart from './Chart';
import styles from './styles';

type ReportChartProps = {
  onChosenType?: (type: any) => void;
  data: any;
  chartType: any;
  loading?: boolean;
};

const ReportChart = memo(
  function ({onChosenType, data, loading, chartType}: ReportChartProps) {
    return (
      <View>
        <View style={loading ? styles.containerLoading : null}>
          <ReportChartHeader onChosen={onChosenType} />
          <RPChart item={data?.reve_sale} chartType={chartType} />
        </View>
        {loading && (
          <ActivityIndicator
            color={'#005aa9'}
            size="large"
            style={styles.indicatorView}
          />
        )}
      </View>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default ReportChart;
