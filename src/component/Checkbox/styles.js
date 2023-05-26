import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#C4C4C4',
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    innerSquare: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#005AA9',
    },
    checkedBox: {
        borderColor: '#005AA9',
        borderWidth: 2
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
    text_4: {
        fontSize: 13,
        fontWeight: '300',
        color: '#000000'
    },
    icon_2: {
        marginRight: 10,
        width: 33,
        height: 19,
    },
    viewpayment: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewpayment2: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title_1: {
        fontSize: 13,
        color: '#000000',
    },
    icon_1: {
        width: 25,
        height: 25,
    },
});

export default styles;
