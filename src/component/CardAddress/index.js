import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from './styles';
import Checkbox from '../Checkbox';

const CardAddress = ({ numberAddress, address, onPress }) => {


    const [check, setCheck] = useState(false)

    const onPressCheck = () => {
        setCheck(value => !value)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Địa chỉ giao hàng</Text>
            <View style={styles.header}>
                <Checkbox check={check} onPress={onPressCheck} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.numberAddress}>{numberAddress}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={{ fontSize: 13, color: '#005AA9' }}>Sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.line}></View>
        </View>
    )
}

export default React.memo(CardAddress);
