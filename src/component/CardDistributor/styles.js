import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#C2C2C2'
    },
    icon:{
        width: 20, 
        height: 20
    },
    name:{
        fontSize: 16,
        color: '#000000',
        marginBottom: 4
    },
    phone:{
        fontSize: 13,
        color: '#C2C2C2',
    },
    iconRight:{
        marginRight: 8,
        width: 20,
        height: 20
    }

})

export default styles;