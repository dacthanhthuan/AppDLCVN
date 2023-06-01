import { StyleSheet } from 'react-native'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../global';

const styles = StyleSheet.create({
    container: {
        width: (WINDOW_WIDTH - 32) / 2,
        height: (WINDOW_HEIGHT * 0.3),
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
    },
    containerView: {
        width: '94%',
        height: '96%',
        borderRadius: 7,
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: '#FFFFFF',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 4.65,
        //Andorid
        elevation: 2,

    },
    image: {
        width: 131,
        height: 112,
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        color: '#005AA9',
        marginTop: 22,
        width: '100%',
    },
    id: {
        fontSize: 13,
        color: '#C2C2C2',
        marginTop: 7,
    },
    price: {
        fontSize: 16,
        color: '#09355C',
        marginTop: 7,
        fontWeight: '500'
    },
})

export default styles;