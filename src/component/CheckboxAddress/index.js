import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import styles from "./styles";

const CheckboxAddress = ({ onPressCheck, check, showCheckbox }) => {
  // useEffect(() => {
  // console.log('check:>>', check);
  // console.log('showCheckbox:>>', showCheckbox);
  // }, [])
  return (
    <Pressable onPress={onPressCheck} style={[styles.container, check || showCheckbox == 1 ? styles.checkedBox : {}]}>
      {check || showCheckbox == 1 ? < View style={styles.innerSquare} /> : null}
    </Pressable>
  );
};

export default CheckboxAddress;
