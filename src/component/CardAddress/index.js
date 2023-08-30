import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import CheckboxAddress from '../CheckboxAddress';

const CardAddress = ({ numberAddress, address, onPressCheck, check, showCheckbox }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Địa chỉ giao hàng</Text>
            <View style={styles.header}>
                <CheckboxAddress check={check} onPressCheck={onPressCheck} showCheckbox={showCheckbox} />
                <Text style={styles.numberAddress}>{numberAddress}</Text>
            </View>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.line}></View>
        </View>
    )
}

export default React.memo(CardAddress);
