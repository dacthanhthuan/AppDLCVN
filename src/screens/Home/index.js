import React from "react";
import styles from "./styles";
import {SafeAreaView, Text, View} from 'react-native'

const Home = () =>{
    return(
        <SafeAreaView style={styles.container}>
            <Text>Kho đổi điểm</Text>
        </SafeAreaView>
    )
}

export default React.memo(Home)