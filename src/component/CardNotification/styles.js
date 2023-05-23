import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
       
    },
    title: {
        fontSize: 16,
        color: '#000000'
    },
    dateTime: {
        fontSize: 13,
        color: '#C2C2C2',
        marginTop: 4
    },
    dot:{
        width: 10, 
        height: 10,
        backgroundColor: '#005AA9',
        borderRadius: 5,
        marginVertical: 4
    },
    textMoney:{
        fontSize: 14, 
        color: '#03A900' 
    },
    imgRight:{
        width: 15,
         height: 15, 
    }
})

export default styles;