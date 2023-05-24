import { StyleSheet } from 'react-native';

const Style_TranferMoneyTwo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    text_1: {
        fontSize: 16,
        color: '#000000',
    },
    viewUser: {
        padding: 5,
        marginTop: 5,
        marginBottom: 15
    },
    imgUser: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    text_2: {
        fontSize: 13,
        color: '#000000',
        width: 54,
        textAlign: 'center',
    },
    viewborder: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        padding: 15,
        marginTop: 15,
    },
    view_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingRight: 15,
    },
    view_3: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
    },
});

export default Style_TranferMoneyTwo;