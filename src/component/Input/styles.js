import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#C2C2C2',
        borderWidth: 1,
        borderRadius: 7,
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 12
    },
    textInput:{
        flex: 1,
        fontSize: 16,
    },
    icon:{
        width: 23,
        height: 23,
    }
})

export default styles;