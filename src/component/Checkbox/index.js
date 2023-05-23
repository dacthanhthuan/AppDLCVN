import React, { useState } from "react";
import { Pressable, View } from "react-native";
import styles from "./style";



const Checkbox = () => {
    const [ischecked, setChecked] = useState(false);
    const check1 = () => {
        setChecked(value => !value);
    };
    return (
        <Pressable onPress={check1} style={[styles.container, ischecked ? styles.checkedBox : {}]}>
            {ischecked ? <View style={styles.innerSquare} /> : null}
        </Pressable>
    )
};

export default React.memo(Checkbox);