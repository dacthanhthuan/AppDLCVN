import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderColor: '#C2C2C2',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10, 
        marginBottom: 8,
        paddingVertical: 16,
      
    },
    icon: {
        width: 20,
        height: 20, 
        marginLeft: 4
    },
    name:{
        fontSize: 16, 
        color: '#000000'
    },
    address:{
        fontSize: 13, 
        color: '#C2C2C2',
         marginTop: 4
    }
})

export default styles;