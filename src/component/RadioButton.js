import {Pressable, Text, View, FlatList} from 'react-native';
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
  extraData,
  activeContButtonStyle,
  inActiveContButtonStyle,
}) => {
  const [select, setSelect] = useState(
    checked ? data[checked - 1]?.value : data[0]?.value,
  );

  useEffect(() => {
    onSelect
      ? data.forEach(item => {
          item.value === select ? onSelect(item) : null;
        })
      : null;
  }, [select]);

  return (
    <View>
      <FlatList
        style={[
          containerStyle,
          horizontal ? {flexDirection: 'row'} : {flexDirection: 'column'},
        ]}
        data={data}
        renderItem={({item}) => (
          <Pressable
            key={item.value}
            style={({pressed}) => [
              pressed ? {opacity: 0.3} : null,
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
        )}
        removeClippedSubviews={true}
        extraData={extraData}
      />
    </View>
  );
};

export default memo(RadioButton);
