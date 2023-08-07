import React, {useEffect} from 'react';
import {ViewStyle} from 'react-native';
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';
import {AllCheckActions, useAllCheck, useDispatchAllCheck} from './context';

type CheckboxType = {
  inactiveStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  disable?: boolean;
  dataLength: number;
};

const AllCheckBox = ({
  inactiveStyle,
  containerStyle,
  text,
  textStyle,
  disable,
  dataLength,
}: CheckboxType) => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatchAllCheck();
  const allcheck: any = useAllCheck();

  // update all check state and dispatch to allcheck reducer
  useEffect(() => {
    if (checked) {
      dispatch(AllCheckActions.Change_All_Check_State(true));
    } else {
      dispatch(AllCheckActions.Change_All_Check_State(false));
    }
  }, [checked]);

  // if data length is equal checkboxs length, change all check with force change, otherwise, change all chekc without forece change
  useEffect(() => {
    if (dataLength === allcheck.checkboxs.length) {
      setChecked(true);
    } else {
      setChecked(false);
      dispatch(AllCheckActions.Change_All_Check_Not_Force_Change(false));
    }
  }, [allcheck.checkboxs]);

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
      {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
    </Pressable>
  );
};

export default React.memo(AllCheckBox, (pre, next) => {
  return JSON.stringify(pre) === JSON.stringify(next);
});

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  container: {
    borderWidth: 1,
    borderRadius: 11,
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
