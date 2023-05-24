import React, { useState } from "react";
// import React from "react";
import { Pressable, View } from "react-native";
import styles from "./styles";

const Checkbox_1 = ({ checked, onPress, check }) => {
    // const [ischecked, setChecked] = useState(false);
    // const check1 = () => {
    //     setChecked(value => !value);
    // };
    return (
        <Pressable onPress={onPress} style={[styles.container, checked || check ? styles.checkedBox : {}]}>
            {checked || check? <View style={styles.innerSquare} /> : null}
        </Pressable>
    )
};

export default React.memo(Checkbox_1);

import style from "./style";
export const Checkbox_2 = () => {
    const [ischecked, setChecked] = useState(false);
    const check1 = () => {
        setChecked(value => !value);
    };
    return (
        <Pressable onPress={check1} style={[style.container, ischecked ? style.checkedBox : {}]}>
            {ischecked ? <View style={style.innerSquare} /> : null}
        </Pressable>
    )
};