import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,

    },
    title: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Montserrat'
    },
    value: {
        fontSize: 24,
        color: '#005AA9',
        textAlign: 'center',
    },
    numberContainerMoney: {
        backgroundColor: '#E6EFF7',
        borderRadius: 3,
        marginLeft: 8,
        padding: 4
    },
    numberMoney: {
        fontSize: 15,
        color: '#005AA9',
        marginHorizontal: 21,
        fontWeight: '500'
    },
    card: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
        justifyContent: 'space-between',
        padding: 12
    },
    textCard: {
        fontSize: 16,
        color: '#000000'
    },
    iconLeft: {
        width: 24,
        height: 24
    },
    iconRight: {
        width: 9,
        height: 16
    }

});

export default styles;
