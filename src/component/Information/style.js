import { StyleSheet } from "react-native";

const Style_Information = StyleSheet.create({
    container_1: {
        width: '100%',
    },
    text_1: {
        fontSize: 13,
        color: '#000000',
        fontWeight: '300'
    },
    container_2: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    container_3: {
        justifyContent: "space-between",
        height: 70,
    },
    container_4: {
        justifyContent: "space-between",
        height: 70,
        alignItems: "flex-end"
    },
    price_1: {
        color: '#000000',
        fontSize: 13,
        fontWeight: '400',
    },
    price_2: {
        color: '#005AA9',
        fontSize: 13,
        fontWeight: '400'
    },
    price_3: {
        color: '#0FA027',
        fontSize: 13,
        fontWeight: '400'
    },
});

export default Style_Information;