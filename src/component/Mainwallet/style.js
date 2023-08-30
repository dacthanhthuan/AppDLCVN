import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    border: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    icon: {
        height: 35,
        width: 35,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        marginLeft: 8,
    },
    text: {
        fontSize: 16,
        color: '#000000',
    },
    textCustomer: {
        fontSize: 16,
        color: '#005AA9',
    }
});

export default styles;