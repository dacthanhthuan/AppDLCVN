import React from "react"
import { View, Text } from 'react-native'
import styles from "./styles"
const PurchaseHistory = ({ name, phone, md, dateTime, pv, money }) => {
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'flex-start', marginLeft: 6}}>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.textLeft}>{phone}</Text>
                <Text style={styles.textLeft}>Mã đơn: {md}</Text>
                <Text style={styles.textLeft}>{dateTime}</Text>
            </View>
            <View style={{alignItems: 'flex-end', marginRight: 6}}>
                <Text style={styles.pv}>{pv} PV</Text>
                <Text style={styles.money}>{money}đ</Text>
            </View>
        </View>
    )
}

export default React.memo(PurchaseHistory);