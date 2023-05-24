import { StyleSheet } from 'react-native';

const Style_Historymoney = StyleSheet.create({
    border: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
    },
    img: {
        width: 30,
        height: 30
    },
    view_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 10,
    },
    text: {
        fontSize: 13,
        color: '#000000',
        fontWeight: '300',
    },
    view_2: {
        justifyContent: "space-between",
        height: 80,
    },
    view_3: {
        justifyContent: "space-between",
        height: 80,
        alignItems: "flex-end"
    },
});

export default Style_Historymoney;