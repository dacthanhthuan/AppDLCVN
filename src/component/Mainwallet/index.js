import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import styles from './style';

const MainWallet = ({ money, style, onPressCustomer, title }) => {
    return (
        <SafeAreaView style={[styles.border, style]}>
            <View style={styles.leftContainer}>
                <Image style={styles.icon} source={require('../../assets/imgUser/Group_292.png')} />
                <View style={styles.leftText}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.text}>{money}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onPressCustomer}>
                <Text style={styles.textCustomer}>Thay đổi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default MainWallet;