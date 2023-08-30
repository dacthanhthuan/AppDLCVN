import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    buttonTouchable: {
        alignItems: 'center'
    },
    icon: {
        width: 26,
        height: 26,
        tintColor: '#FFFFFF'
    },
    text: {
        width: 90,
        color: '#FFFFFF',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    customMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    customMarker: {
        width: 250,
        height: 250,
        borderColor: '#FFFFFF', // Border color
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default styles;