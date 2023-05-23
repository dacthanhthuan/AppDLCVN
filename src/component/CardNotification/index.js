import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from './styles';

const CardNotifications = ({ title, time, date, money, dot }) => {
    return (
        <View style={styles.container}>
            <Image style={{ width: 30, height: 30 }} resizeMode='contain' source={require('../../assets/notifications.png')} />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.dateTime}>{time} {date}</Text>
            </View>

            <View style={{ marginRight: 16, justifyContent: 'center', alignItems: 'flex-end' }}>
                {dot ? (
                    <View style={styles.dot}>{dot}</View>
                ) : null}
                <Text style={styles.textMoney}>+{money}đ</Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center', flexDirection: 'row' }}>
                <Image style={styles.imgRight} resizeMode='contain' source={require('../../assets/vectorRight.png')} />
            </TouchableOpacity>
        </View>

    )
}

export default React.memo(CardNotifications);