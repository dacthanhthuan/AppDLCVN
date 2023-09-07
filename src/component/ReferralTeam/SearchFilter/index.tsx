import {memo, useCallback, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import styles from './styles';
import {View} from 'react-native';
import Button from '../../Button';
import SelectGroup from './SelectGroup';
import DatePicker from './DatePicker';

type SearchFilterModalProps = {
  visible: boolean;
  onCloseFilter: () => void;
  onApplyFilter: (item?: any) => void;
};

const types = [
  {
    id: 0,
    value: 'total_spent',
    name: 'Đã mua',
  },
  {
    id: 1,
    value: 'total_liabilities',
    name: 'Công nợ',
  },
];

const sorts = [
  {
    id: 0,
    value: 'ASC',
    name: 'Tăng dần',
  },
  {
    id: 1,
    value: 'DESC',
    name: 'Giảm dần',
  },
];

export default memo(function ReferralTeamSearchFilter({
  visible,
  onCloseFilter,
  onApplyFilter,
}: SearchFilterModalProps) {
  const [type, setType] = useState(types[0]);
  const [sort, setSort] = useState(sorts[0]);
  const [date, setDate] = useState(new Date());

  // handle on select type
  const handleOnSelectType = useCallback((item: any) => {
    setType(item);
  }, []);

  // handle on select sort
  const handleOnSelectSort = useCallback((item: any) => {
    setSort(item);
  }, []);

  // handle on chosen date
  const handleOnChooseDate = useCallback((date: Date) => {
    setDate(date);
  }, []);

  // handle on apply filter
  const handleOnApplyFilter = useCallback(() => {
    if (typeof onApplyFilter == 'function') {
      // callbacks
      onApplyFilter({
        type: type.value,
        sort: sort.value,
        date: date.toLocaleDateString(),
      });
    }
  }, [type, sort, date]);

  // handle on 'Xóa' button
  const handleOnDelete = useCallback(() => {
    if (typeof onApplyFilter == 'function') {
      // callbacks
      onApplyFilter({
        type: '',
        sort: '',
        date: '',
      });
    }
  }, []);
  return visible ? (
    <View style={styles.view}>
      <Pressable style={styles.outside} onPress={onCloseFilter} />

      <Animated.View
        style={styles.contentView}
        entering={SlideInDown.duration(400).easing(Easing.inOut(Easing.exp))}
        exiting={SlideOutDown.duration(400).easing(Easing.inOut(Easing.exp))}>
        {/*  */}
        <View style={styles.header}>
          <TouchableOpacity hitSlop={15} onPress={handleOnDelete}>
            <Text style={styles.deleteText}>Xóa</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Sắp xếp</Text>

          <TouchableOpacity hitSlop={10} onPress={onCloseFilter}>
            <Image
              style={styles.closeImage}
              source={require('../../../assets/Rectangle328.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Chọn kiểu</Text>
        <SelectGroup
          data={types}
          onSelect={handleOnSelectType}
          defaultId={type.id}
        />

        <Text style={styles.title}>Sắp xếp theo</Text>
        <SelectGroup
          data={sorts}
          onSelect={handleOnSelectSort}
          defaultId={sort.id}
        />

        <Text style={styles.title}>Đăng ký từ ngày</Text>
        <DatePicker
          placeholder={'Chọn ngày'}
          onChangeDate={handleOnChooseDate}
          defaultDate={date}
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
