import {SafeAreaView} from 'react-native';
import styles from './styles';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import ShopIdList from '../../component/ReportCEO/ShopIdList';
import ReportSummary from '../../component/ReportCEO/ReportSummary';
import ReportChart from '../../component/ReportCEO/ReportChart';
import {ScrollView} from 'react-native';
import ReportFilter from '../../component/ReportCEO/ReportFilter';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  RPCEOChart,
  RPCEOShopId,
  RPCEOSummary,
} from '../../redux/actions/reportCeoActions';

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

export default function ReportCEO() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const session_token = useSelector((s: any) => s.user.session_token);
  const shopId = useSelector((s: any) => s.reportCEO.shopId);
  const summary = useSelector((s: any) => s.reportCEO.summary);
  const summaryLoading = useSelector((s: any) => s.reportCEO.summaryLoading);
  const chart = useSelector((s: any) => s.reportCEO.chart);
  const chartLoading = useSelector((s: any) => s.reportCEO.chartLoading);

  const [filterVisible, setFilterVisible] = useState(false);
  const [choseDate, setChoseDate] = useState(`${month + 1} - ${year}`);
  const [chartType, setChartType] = useState<any>('month');
  const [choseShopId, setChoseShopId] = useState<any>('');

  // event handler: open filter
  const handleOpenFilter = useCallback(() => {
    setFilterVisible(true);
  }, []);

  // event handler: close filter
  const handleCloseFilter = useCallback(() => {
    setFilterVisible(false);
  }, []);

  // event handler: apply filter
  const handleApplyFilter = useCallback(
    (item: any) => {
      const month = item.month != 0 ? item.month : '';
      const year = item.year;

      setFilterVisible(false);

      setChoseDate(`${month} - ${year}`);

      dispatch(RPCEOSummary.start(session_token, choseShopId, month, year));
    },
    [choseShopId],
  );

  // event handler: chosen shop
  const handleOnChosenShop = useCallback(
    (item: any) => {
      let shopId = item.id == -1 ? '' : item.id;
      const [month, year] = choseDate.split('-');

      setChoseShopId(shopId);

      dispatch(
        RPCEOSummary.start(session_token, shopId, month.trim(), year.trim()),
      );
      dispatch(RPCEOChart.start(session_token, shopId, chartType, ''));
    },
    [choseDate, chartType],
  );

  // event handler: chosen chart type
  const handleOnChosenChartType = useCallback(
    (item: any) => {
      let type = item.value;

      setChartType(item.value);

      dispatch(RPCEOChart.start(session_token, choseShopId, type, ''));
    },
    [choseShopId],
  );

  // side effect: run once after initial rendering
  useEffect(() => {
    dispatch(RPCEOShopId.start(session_token));
    dispatch(RPCEOSummary.start(session_token, '', month + 1, year));
    dispatch(RPCEOChart.start(session_token, '', 'month', ''));
  }, []);

  // check is filter year
  const isYear = () => {
    const [m, y] = choseDate.split(' - ');

    if (m) {
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Báo Cáo Bán Hàng"
        iconLeft={require('../../assets/Arrow1.png')}
        iconRight={require('../../assets/filter.png')}
        onPressLeft={() => navigation.goBack()}
        containerStyle={styles.header}
        onPressRight={handleOpenFilter}
        showCartBadge={undefined}
        iconRightStyle={styles.filterIcon}
      />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <ShopIdList data={shopId} onChosen={handleOnChosenShop} />

        <ReportSummary
          loading={summaryLoading}
          data={summary?.group_product}
          from={summary?.from}
          isYear={isYear()}
        />

        <ReportChart
          data={chart}
          loading={chartLoading}
          chartType={chartType}
          onChosenType={handleOnChosenChartType}
        />

        <ReportFilter
          visible={filterVisible}
          onCloseFilter={handleCloseFilter}
          onApplyFilter={handleApplyFilter}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
