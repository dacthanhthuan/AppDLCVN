import { StyleSheet } from 'react-native';

const Style_CreateOrder = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        height: '100%',
    },
    icon: {
        width: 30,
        height: 30,
    },
    view_1: {
        flexDirection: "row",
        marginLeft: 10,
        justifyContent: "space-between"
    },
    text_1: {
        fontSize: 16,
        color: '#000000',
    },
    text_2: {
        fontSize: 13,
        color: '#005AA9',
    },
    text_3: {
        fontSize: 13,
        color: '#000000',
        fontWeight: '300'
    },
    view_2: {
        marginLeft: 10,
        height: 75,
        justifyContent: "space-between",
        marginTop: 15,
    },
    text_4: {
        fontSize: 13,
        color: '#000000',
    },
    flatlist: {
        flexDirection: 'row',
        marginTop: 20,
    },
    view_3: {
        marginLeft: 10,
    },
    title_1: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 10,
    },
});

export default Style_CreateOrder;