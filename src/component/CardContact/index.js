import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';

const CardContact = ({ name, phone, onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{name}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{ fontSize: 13, color: '#005AA9' }}>Sửa</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Số điện thoại</Text>
            <Text style={styles.phone}>+0{phone}</Text>
        </View>
    )
}

export default React.memo(CardContact);
