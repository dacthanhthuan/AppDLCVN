import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: 175,
        paddingVertical: 8,
        paddingLeft: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 7,
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
    image: {
        width: 131,
        height: 112,
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        color: '#005AA9',
        marginTop: 22,
        width: '80%',
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