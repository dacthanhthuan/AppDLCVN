import { StyleSheet } from 'react-native';

const Style_Payment = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        height: '100%',
    },
    container_1: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 15
    },
    text_1: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    icon_1: {
        width: 25,
        height: 25,
    },
    text_2: {
        marginTop: 15,
        color: '#005AA9',
        fontSize: 16,
    },
    viewpayment: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title_1: {
        fontSize: 13,
        color: '#000000',
        marginLeft: 12
    },
    viewborder: {
        borderRadius: 4,
        borderColor: '#005AA9',
        borderWidth: 0.5,
        padding: 3,
        alignItems: 'center',
        width: 33,
        height: 19,
        marginRight: 10,
    },
    text_3: {
        fontSize: 8,
        color: '#005AA9',
    },
    icon_2: {
        marginRight: 10,
        width: 33,
        height: 19,
    },
    text_4: {
        fontSize: 13,
        fontWeight: '300',
        color: '#000000'
    },
});

export default Style_Payment;