import {Text, Image, StyleSheet} from 'react-native';
import RadioButton from '../../RadioButton';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../global';
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

const StackButton = memo(({item, isSelected}) => {
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
});

export default memo(ButtonGroup);

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
