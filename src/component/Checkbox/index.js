import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image } from "react-native";
import styles from "./styles";

const Checkbox = ({ checked, onPress, check }) => {
  const [isChecked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const onCheckboxPress = () => {
    const newValue = !isChecked;
    setChecked(newValue);
    onPress && onPress(newValue);
  };

  useEffect(() => {
    if (check !== isChecked) {
      setChecked(check);
    }
  }, [check]);

  return (
    <Pressable onPress={onCheckboxPress} style={[styles.container, isChecked ? styles.checkedBox : {}]}>
      {isChecked && <View style={styles.innerSquare} />}
    </Pressable>
  );
};

export default Checkbox;


export const Checkbox_2 = ({ isSelected, onSelected, img, title, type }) => {
  return (
    <View style={styles.viewpayment}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {img ? (
          <Image style={styles.icon_2} source={img} />
        ) : (
          <View style={styles.viewborder}><Text style={styles.text_3}>{type}</Text></View>
        )}
        <Text style={styles.text_4}>{title}</Text>
      </View>
      <Pressable onPress={() => onSelected(title)} style={[styles.container, isSelected === title ? styles.checkedBox : {}]}>
        {isSelected === title ? <View style={styles.innerSquare} /> : null}
      </Pressable>
    </View>
  );
};
