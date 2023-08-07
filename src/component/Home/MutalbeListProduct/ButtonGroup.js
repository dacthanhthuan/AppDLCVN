import {Text, Image, StyleSheet} from 'react-native';
import RadioButton from '../../RadioButton';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../MyGlobal';
import {memo} from 'react';

const ButtonGroup = ({button, checked, onSelect}) => {
  return (
    <RadioButton
      checked={checked}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      data={button}
      renderButton={({item, isSelected}) => (
        <StackButton item={item} isSelected={isSelected} />
      )}
      horizontal
      onSelect={value => onSelect(value)}
      activeContButtonStyle={styles.activeButton}
    />
  );
};

const StackButton = memo(
  ({item, isSelected}) => {
    return (
      <>
        <Image
          source={item.source}
          style={styles.imageButton}
          resizeMode="contain"
        />
        <Text
          style={[styles.textButton, isSelected ? {color: '#005AA9'} : null]}
          numberOfLines={1}>
          {item.title}
        </Text>
      </>
    );
  },
  (pre, next) => JSON.stringify(pre) === JSON.stringify(next),
);

export default memo(
  ButtonGroup,
  (pre, next) =>
    JSON.stringify(pre.button) === JSON.stringify(next.button) &&
    JSON.stringify(pre.checked) === JSON.stringify(next.checked),
);

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT * 0.08,
    width: WINDOW_WIDTH * 0.94,
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginVertical: '2%',
  },

  button: {
    width: (WINDOW_WIDTH * 0.9) / 3,
    borderRadius: 5,
    borderWidth: 0.4,
    justifyContent: 'center',
    borderColor: '#8B8787',
    height: '100%',
  },

  imageButton: {
    width: '100%',
    height: '45%',
    marginBottom: 5,
  },

  textButton: {
    marginHorizontal: 2,
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
  },

  activeButton: {
    borderWidth: 1,
    borderColor: '#005AA9',
  },
});
