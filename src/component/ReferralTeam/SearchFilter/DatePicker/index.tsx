import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {memo, useCallback, useState} from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';

type DatePickerProps = {
  defaultDate?: Date;
  placeholder: string;
  onChangeDate?: (date: Date) => void;
};

const DatePicker = memo(function ({
  placeholder,
  onChangeDate,
  defaultDate = new Date(),
}: DatePickerProps) {
  const [date, setDate] = useState(defaultDate);
  const [visible, setVisible] = useState(false);

  // handle choose date
  const handleOnChooseDate = useCallback(
    (e: DateTimePickerEvent, date?: Date) => {
      // change state after close picker
      setVisible(false);

      // if date not undefined
      if (date) {
        // set date to show input and display date picker
        setDate(date);

        // callbacks
        if (typeof onChangeDate == 'function') {
          onChangeDate(date);
        }
      }
    },
    [],
  );

  // handle show date picker
  const handleVisiblePicker = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleVisiblePicker}>
      <TextInput
        editable={false}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={date.toLocaleDateString()}
      />
      <Image
        source={require('../../../../assets/calendar.png')}
        style={styles.icon}
      />
      {visible && (
        <DateTimePicker
          value={date}
          mode={'date'}
          onChange={handleOnChooseDate}
        />
      )}
    </TouchableOpacity>
  );
});

export default DatePicker;
