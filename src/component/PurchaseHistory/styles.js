import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:
    {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        // elevation: 2
    },
    textName: {
        fontSize: 16,
        color: '#000000'
    },
    textLeft: {
        fontSize: 10,
        color: '#8B8787',
        marginTop: 6
    },
    pv: {
        fontSize: 14,
        color: '#09355C'
    },
    money: {
        fontSize: 10,
        color: '#19A538'
    }

})

export default styles;