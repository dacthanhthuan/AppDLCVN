import { StyleSheet } from 'react-native';

const Style_Statistical = StyleSheet.create({
    container: {
        width: 110,
        height: 145,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 2,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 46,
        height: 40
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 4,
    }
});

export default Style_Statistical;