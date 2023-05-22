import {Pressable, Text, View} from 'react-native';
import {memo, useState, useEffect} from 'react';

/**
 * @data (array object [{},{},...]) list data for render button
 * (object required: {value: , title: }, value is unique)
 * @renderButton (component) React Component to display for each button (not required Pressable, Touchable)
 * @horizontal (boolean) direction for radio button (false is default)
 * @onSelect ( (value)=>() ) callback when button is select
 * * (value: value of object is selected passed from data)
 * * (if previous select is equals current select, not return)
 * @containerStyle (ViewStyle) style for container of renderButton
 * @buttonStyle (ViewStyle) style for each button
 * @checked (number) button is checked in initial render (from 1 to data.length)
 * * default (not setted) is 1
 * @activeContButtonStyle (ViewStyle) style of container when button active
 * @inActiveContButtonStyle (ViewStyle) Style of container when butotn inactive
 */
const RadioButton = ({
  data,
  renderButton,
  horizontal,
  onSelect,
  containerStyle,
  buttonStyle,
  checked,
  activeContButtonStyle,
  inActiveContButtonStyle,
}) => {
  const [select, setSelect] = useState(
    checked ? data[checked - 1].value : data[0].value,
  );

  useEffect(() => {
    onSelect ? onSelect(select) : null;
  }, [select]);

  return (
    <View
      style={[
        containerStyle,
        horizontal ? {flexDirection: 'row'} : {flexDirection: 'column'},
      ]}>
      {data.map(item => {
        return (
          <Pressable
            key={item.value}
            style={[
              buttonStyle,
              select === item.value
                ? activeContButtonStyle
                : inActiveContButtonStyle,
            ]}
            onPress={() => setSelect(item.value)}>
            {renderButton ? (
              renderButton({item, isSelected: select === item.value})
            ) : (
              <Text>{item.title}</Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default memo(RadioButton);
