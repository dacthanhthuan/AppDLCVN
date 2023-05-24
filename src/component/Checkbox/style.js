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
    }

});

export default styles;