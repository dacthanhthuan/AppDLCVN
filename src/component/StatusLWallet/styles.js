import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginBottom: 12,
        flexDirection: 'row'
    },
    text: {
        fontSize: 15,
        color: '#000000',
        paddingBottom: 2,
        padding: 8
    },
    selectedItemContainer: {
        borderBottomColor: '#005AA9',
        borderBottomWidth: 1,
    },
    selectedItem: {
        color: '#005AA9'
    }
})

export default styles;