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
const CustomRadioButton = ({
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
  initialNumtoRender,
  maxToRenderPerBatch,
  windowSize,
}: any) => {
  const [select, setSelect] = useState(checked ? checked - 1 : 0);

  useEffect(() => {
    onSelect ? onSelect(data[select]) : null;
  }, [select]);

  return (
    <FlatList
      style={[
        containerStyle,
        horizontal ? {flexDirection: 'row'} : {flexDirection: 'column'},
      ]}
      data={data}
      keyExtractor={(item, index) => item.type + index + new Date()}
      renderItem={({item, index}) => (
        <Pressable
          style={({pressed}) => [
            pressed ? {opacity: 0.3} : null,
            buttonStyle,
            select === index ? activeContButtonStyle : inActiveContButtonStyle,
          ]}
          onPress={() => setSelect(index)}>
          {renderButton
            ? renderButton({item, isSelected: select === index})
            : null}
        </Pressable>
      )}
      removeClippedSubviews={true}
      extraData={extraData}
      initialNumToRender={initialNumtoRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
    />
  );
};

export default memo(CustomRadioButton);
