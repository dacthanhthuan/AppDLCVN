import { StyleSheet, Dimensions } from "react-native";

const { width: width, height: height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    text: {
        fontSize: 17,
        color: '#8B8787',
        fontWeight: "300",
    },
    textmoney: {
        fontSize: 24,
        color: '#005AA9',
        fontWeight: "400"
    },
    imgWallet: {
        width: 210,
        height: 166,
    },
    bottomsheet: {
        height: height,
        width: width,
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderColor: '#C2C2C2',
        borderRadius: 40,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    line: {
        width: 40,
        height: 5,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 20,
    },
    title: {
        fontSize: 17,
        color: '#005AA9',
        marginBottom: 10,
    },
    view: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    view_2: {
        flexDirection: "row",
        alignItems: "center"
    },
    borderIcon: {
        width: 41, height: 41,
        backgroundColor: '#F3FAFF',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 23,
        height: 23,
    },
    text_2: {
        fontSize: 15,
        color: '#101014',
        marginLeft: 15
    },
    imgArrow: {
        width: 17,
        height: 17
    }
});

export default styles;