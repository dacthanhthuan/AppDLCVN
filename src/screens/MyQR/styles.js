import { StyleSheet } from 'react-native'
import { WINDOW_WIDTH } from '../../global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    imageAvatar: {
        marginTop: 32,
        width: 50,
        height: 50,
        alignSelf: 'center',
        borderRadius: 25
    },
    textFullname: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginVertical: 16
    },
    textDescription: {
        width: WINDOW_WIDTH * 0.5,
        color: '#C2C2C2',
        textAlign: 'center',
    },
    buttonTouchable: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f5f5ef',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 26,
        height: 26,
        tintColor: '#374957'
    },
})

export default styles;