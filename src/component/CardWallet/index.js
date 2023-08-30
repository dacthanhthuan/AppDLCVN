import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { formatprice, unitTimeStap } from '../../global'

const CardWallet = ({ item }) => {
    return (
        <View key={item?.id} style={styles.containerView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Thời gian:</Text>
                <Text>{unitTimeStap(item?.created_at)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Chuyển từ:</Text>
                <Text>{item?.from_fullname}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Đến:</Text>
                <Text>{item?.to_fullname}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Ghi chú:</Text>
                <Text> {item?.note}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Số tiền:</Text>
                <Text> {formatprice(item?.amount)}</Text>
            </View>

        </View>
    )
}

export default React.memo(CardWallet);

