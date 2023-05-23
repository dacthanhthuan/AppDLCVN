import { StyleSheet } from 'react-native';

const Style_Walk = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    viewImg: {
        alignItems: "center",
        marginTop: -62,
    },
    imgWalk: {
        width: 414,
        height: 237,
    },
    view_1: {
        alignItems: "center",
        flex: 1,
    },
    view_2: {
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginTop: -75,
        padding: 16,
    },
    view_3: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 100,
        marginBottom: 15,
    },
    after_pressing: {
        borderBottomWidth: 1,
        borderColor: '#005AA9',
    },
    textTab: {
        color: '#000000',
        fontSize: 16,
        fontWeight: "400"
    },
    pressGift: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    iconGift: {
        width: 32,
        height: 32,
        marginLeft: 10
    },
    imgCounter: {
        width: 220,
        height: 220
    },
    viewButtonStart: {
        paddingHorizontal: 120,
        marginTop: 15
    },
    viewDatetime: {
        marginTop: 30, flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 30,
        backgroundColor: '#F2F2F2',
    },
    viewborder: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        marginTop: 15,
        padding: 10,
        fontSize: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        backgroundColor: '#FFFFFF',
    }
});

export default Style_Walk;