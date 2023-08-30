import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#C2C2C2',
        padding: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 16,
        color: '#000000'
    },
    textValue: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500'
    }
});

export default styles;