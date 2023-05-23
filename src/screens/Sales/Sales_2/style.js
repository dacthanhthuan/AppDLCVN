import { StyleSheet } from 'react-native';

const Style_Sales_2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    imgChart: {
        width: 340,
        height: 220,
    },
    view_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text_1: {
        fontSize: 15,
        color: '#000000',
    },
    view_2: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    view_3: {
        paddingTop: 20,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15,
        paddingBottom: -15,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 2,
        backgroundColor: '#FFFFFF',
    }
});

export default Style_Sales_2;