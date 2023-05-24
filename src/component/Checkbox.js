import React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';

const Checkbox = ({
  onChecked,
  inactiveStyle,
  containerStyle,
  text,
  textStyle,
  check,
  disable,
}) => {
  const [checked, setChecked] = React.useState();

  React.useEffect(() => {
    onChecked ? onChecked(checked) : null;
  }, [checked]);

  React.useEffect(() => {
    check ? setChecked(true) : setChecked(false);
  }, [check]);

  return (
    <Pressable
      disabled={disable ? true : false}
      onPress={() => {
        setChecked(!checked);
      }}
      style={[styles.pressable, containerStyle]}>
      <View
        style={[styles.container, checked ? styles.checkedBox : inactiveStyle]}>
        {checked ? <View style={styles.innerSquare} /> : null}
      </View>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default React.memo(Checkbox);

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
  },

  container: {
    borderWidth: 1,
    borderRadius: 180,
    borderColor: '#C4C4C4',
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    flexDirection: 'row',
  },
  innerSquare: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#005AA9',
  },

  checkedBox: {
    borderColor: '#005AA9',
    borderWidth: 2,
  },

  text: {
    fontSize: 13,
    color: 'black',
    marginLeft: 15,
    alignSelf: 'center',
  },
});
