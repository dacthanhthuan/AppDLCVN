import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    bottomSheet: {
        justifyContent: "flex-end",
        margin: 0,
    },
    bottomSheetContent: {
        height: height - 500 / 2,
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Montserrat'
    },
    value: {
        alignItems: 'center',
        fontSize: 24,
        color: '#005AA9',
        textAlign: 'center',
    },
    messContainer: {
        height: 104,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#C2C2C2',
    },
    textMessage: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        fontSize: 16,
        color: '#000000'
    },
    messInput: {
        color: '#000000',
        padding: 10,
    }
});

export default styles;
