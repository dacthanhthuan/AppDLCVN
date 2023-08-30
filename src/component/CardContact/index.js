import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';

const CardContact = ({ name, phone, onPress, textAddressDefault }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.name}>{name}
                    </Text>
                    {textAddressDefault == 1 ?
                        <View style={styles.borderAddressDefault}>
                            <Text style={styles.textAddressDefault}>Mặc định</Text>
                        </View>
                        : null}
                </View>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{ fontSize: 14, color: '#005AA9' }}>Sửa</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Số điện thoại</Text>
            <Text style={styles.phone}>{phone}</Text>
        </View>
    )
}

export default React.memo(CardContact);
