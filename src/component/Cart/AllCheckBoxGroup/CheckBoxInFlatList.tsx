import React, {ReactNode, memo, useEffect} from 'react';
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
  index?: number;
  children?: any;
};

const CheckboxInFlatList = ({
  inactiveStyle,
  containerStyle,
  text,
  textStyle,
  disable,
  index,
  children,
}: CheckboxType) => {
  // state check of checkbox
  const [checked, setChecked] = React.useState(false);

  // get dispatch and allcheck context
  const dispatch = useDispatchAllCheck();
  const allcheck: any = useAllCheck();

  // if unique is exist, update checkbox into allcheck context
  useEffect(() => {
    if (index !== undefined) {
      if (checked) {
        dispatch(AllCheckActions.Add_Check_Box(index));
      } else {
        dispatch(AllCheckActions.Remove_Check_Box(index));
      }
    }
  }, [checked]);

  // update checkbox check state synchronous with all_check
  useEffect(() => {
    if (allcheck.all_check && allcheck.force_change) {
      setChecked(true);
    } else if (!allcheck.all_check && allcheck.force_change) {
      setChecked(false);
    }
  }, [allcheck.all_check]);

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
      {children}
      {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
    </Pressable>
  );
};

export default CheckboxInFlatList;

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
