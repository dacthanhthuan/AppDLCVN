import React from "react";
import { Image, Text, View , TouchableOpacity} from "react-native";
import styles from "./styles";

const CardDistributor = ({ name, phone }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.icon} source={require('../../assets/Rectangle287.png')} />
                <View style={{ flexDirection: 'column', marginLeft: 12 }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>+{phone}</Text>
                </View>
            </View>
            <TouchableOpacity>
            <Image style={styles.iconRight} source={require('../../assets/Rectangle279.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(CardDistributor);