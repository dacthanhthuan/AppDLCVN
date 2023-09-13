import {memo, useCallback, useRef, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import styles from './styles';
import {View} from 'react-native';
import Button from '../../Button';
import RowList from './RowList';

type SearchFilterModalProps = {
  visible: boolean;
  onCloseFilter?: () => void;
  onApplyFilter?: (item?: any) => void;
};

const y = new Date().getFullYear();
const m = new Date().getMonth();
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const years = [y - 3, y - 2, y - 1, y];

export default memo(function ReferralTeamSearchFilter({
  visible,
  onCloseFilter,
  onApplyFilter,
}: SearchFilterModalProps) {
  const [month, setMonth] = useState(months[m + 1]);
  const [year, setYear] = useState(y);
  const draft = useRef({
    month,
    year,
  });

  // handle on select year
  const handleOnSelectYear = useCallback((item: any) => {
    draft.current.year = item;
  }, []);

  // handle on select month
  const handleOnSelectMonth = useCallback((item: any) => {
    draft.current.month = item;
  }, []);

  // handle on apply filter
  const handleOnApplyFilter = useCallback(() => {
    setMonth(draft.current.month);
    setYear(draft.current.year);
    if (typeof onApplyFilter == 'function') {
      // callbacks
      onApplyFilter({
        month: draft.current.month,
        year: draft.current.year,
      });
    }
  }, [onApplyFilter]);

  // handle on 'Xóa' button
  const handleOnDelete = useCallback(() => {
    setMonth(months[m + 1]);
    setYear(y);

    draft.current.month = months[m + 1];
    draft.current.year = y;

    if (typeof onApplyFilter == 'function') {
      // callbacks
      onApplyFilter({
        month: months[m + 1],
        year: y,
      });
    }
  }, [onApplyFilter]);

  // event handle: close filter:
  const handleOnCloseFilter = () => {
    draft.current = {
      month,
      year,
    };

    if (typeof onCloseFilter == 'function') {
      onCloseFilter();
    }
  };

  return visible ? (
    <View style={styles.view}>
      <Pressable style={styles.outside} onPress={handleOnCloseFilter} />

      <Animated.View
        style={styles.contentView}
        entering={SlideInDown.duration(350)}
        exiting={SlideOutDown.duration(350)}>
        {/*  */}
        <View style={styles.header}>
          <TouchableOpacity hitSlop={15} onPress={handleOnDelete}>
            <Text style={styles.deleteText}>Xóa</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Sắp xếp</Text>

          <TouchableOpacity hitSlop={10} onPress={handleOnCloseFilter}>
            <Image
              style={styles.closeImage}
              source={require('../../../assets/Rectangle328.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Tháng</Text>
        <RowList
          data={months}
          defaultSelect={month}
          onChosen={handleOnSelectMonth}
        />

        <Text style={styles.title}>Năm</Text>
        <RowList
          data={years}
          defaultSelect={year}
          onChosen={handleOnSelectYear}
        />

        <Button
          text={'Áp dụng'}
          onPress={handleOnApplyFilter}
          style={undefined}
          styleText={styles.applyButton}
        />
      </Animated.View>
    </View>
  ) : null;
});
