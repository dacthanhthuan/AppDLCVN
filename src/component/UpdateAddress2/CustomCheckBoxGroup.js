import RadioButton from '../RadioButton';
import Checkbox from '../Checkbox';
import { StyleSheet } from 'react-native';
import { } from 'react';

const CheckBoxGroup = ({ data, selected, checkNum, forceRender }) => {
  return (
    <RadioButton
      containerStyle={styles.container}
      data={data}
      renderButton={({ item, isSelected }) => {
        return (
          <Checkbox
            inactiveStyle={styles.checkbox}
            containerStyle={styles.checkboxview}
            text={item.title}
            check={isSelected}
            disable={true}
          />
        );
      }}
      buttonStyle={styles.buttonContainer}
      activeContButtonStyle={styles.activeButton}
      checked={checkNum}
      extraData={forceRender}
      onSelect={value => selected(value)}
    />
  );
};

export default CheckBoxGroup;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },

  checkbox: {
    borderColor: 'transparent',
    width: 22,
    height: 22,
    transform: [{ scale: 0.5 }],
    backgroundColor: '#005AA9',
    alignSelf: 'center',
  },

  checkboxview: {
    marginVertical: 5,
    paddingLeft: 15,
  },

  activeButton: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#005AA9',
  },
});
