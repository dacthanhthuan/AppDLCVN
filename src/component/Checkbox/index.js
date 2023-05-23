import React from "react";
import { Pressable, View } from "react-native";
import styles from "./styles";


const Checkbox = ({ checked, onPress, check }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, checked || check ? styles.checkedBox : {}]}>
            {checked || check? <View style={styles.innerSquare} /> : null}
        </Pressable>
    )
};

export default React.memo(Checkbox);