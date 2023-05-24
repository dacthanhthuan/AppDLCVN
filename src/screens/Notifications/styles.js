import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textHeader: {
        fontSize: 20,
        color: '#005AA9'
    },
    iconHeader: {
        width: 20
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    menuSelectedItem: {
        backgroundColor: '#005AA9', 
        borderRadius: 20 
        },
    textItem: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500'
    },
    textSelectedItem:{
        color: '#FFFFFF'
        
    }
})

export default styles;