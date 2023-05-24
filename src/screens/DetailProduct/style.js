import { StyleSheet } from "react-native";

const Style_Detail = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: 15,
    },
    imgProduct: {
        width: 370,
        height: 190,
    },
    container_1: {
        marginTop: 30,
        backgroundColor: '#005AA9',
        width: '25%',
        alignItems: "center",
        flexDirection: "row",
        padding: 8,
        borderRadius: 30,
    },
    textquantity: {
        flex: 1,
        textAlign: "center",
        fontSize: 17,
        color: '#FFFFFF'
    },
    imgIconPlus: {
        marginRight: 5,
        width: 8,
        height: 8,
    },
    imgIconMinus: {
        marginLeft: 5,
        width: 8,
        height: 4,
    },
    container_2: {
        marginTop: 20,
        width: '100%'
    },
    nameproduct: {
        fontSize: 16,
        color: '#000000',
    },
    price_1: {
        marginTop: 8,
        color: '#005AA9',
        fontSize: 20,
        fontWeight: 'bold'
    },
    text_1: {
        fontSize: 13,
        color: '#000000',
        marginTop: 5,
        fontWeight: '300'
    },
    title_1: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 10,
    },
    container_3: {
        width: '100%',
        marginTop: 15,
    },
    title_2: {
        fontSize: 16, 
        color: '#000000',
    },
    container_7: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },
    container_8: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 7,
        borderWidth: 1,
        padding: 10,
        borderColor: '#005AA9',
    },
    imgCart: {
        width: 30,
        height: 30,
    },
});

export default Style_Detail;