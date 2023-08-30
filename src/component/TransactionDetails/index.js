import React from "react"
import styles from "./styles"
import { View, Text } from "react-native"

const TransactionDetails = ({ style, name, mobile, price }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <Text style={styles.textTitle}>Người nhận</Text>
                <Text style={styles.textValue}>{name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textTitle}>Số điện thoại</Text>
                <Text style={styles.textValue}>{mobile}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textTitle}>Số tiền</Text>
                <Text style={styles.textValue}>{price}</Text>
            </View>
        </View>
    )
}

export default React.memo(TransactionDetails)