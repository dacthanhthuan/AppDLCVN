import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 14,
        height: '100%'
    },
    title: {
        fontSize: 20,
        color: '#005AA9',
        width: '100%',
        textAlign: 'center',
    },
    container_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    imgSetting: {
        width: 25,
        height: 25,
        marginTop: 10,
    },
    container_2: {
        height: 100,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
        padding: 10,
    },
    imgSupplier: {
        width: 65,
        height: 65,
    },
    container_3: {
        width: '84%',
        marginLeft: 20,
        height: 60,
    },
    container_4: {
        flexDirection: 'row',
        width: '80%',
        marginLeft: 20,
    },
    name: {
        color: '#000000',
        fontSize: 16,
    },
    detail: {
        marginTop: 3,
        color: '#000000',
        fontSize: 13,
        fontWeight: '300'
    },
    quantity: {
        color: '#005AA9',
        fontSize: 13,
        width: 100,
        fontWeight: '300',
    },
    city: {
        color: '#000000',
        fontSize: 13,
        fontWeight: '300',
        marginLeft: 60,
    },
});

export default styles;