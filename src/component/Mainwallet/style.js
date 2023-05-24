import { StyleSheet } from "react-native";

const Style_MainWallet = StyleSheet.create({
    border: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: "center",
    },
    icon: {
        height: 35,
        width: 35,
    },
    view_1: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    view_2:{
        justifyContent: "space-between",
        height: 45,
    },
    text_1: {
        fontSize: 16,
        color: '#000000',
        fontWeight: "300",
    }, 
    text_2: {
        fontSize: 13,
        color: '#000000',
        fontWeight: "300",
    }, 
    text_3: {
        fontSize: 13,
        color: '#005AA9',
    },
});

export default Style_MainWallet;