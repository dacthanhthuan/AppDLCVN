import { StyleSheet } from 'react-native';

const Style_Header = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1000
    },
    icon: {
        width: 23,
        height: 17,
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 20,
        color: '#005AA9'
    },
});
export default Style_Header;