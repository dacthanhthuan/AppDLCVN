import { StyleSheet, Dimensions } from 'react-native';

const { width: width, height: height } = Dimensions.get('window');
const Style_WalletScreen_2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    text: {
        fontSize: 17, color: '#8B8787', fontWeight: "300"
    },
    textmoney: {
        fontSize: 24,
        color: '#005AA9',
        fontWeight: "400"
    },
    imgWallet: {
        width: 210,
        height: 166,
        marginHorizontal: -16
    },
    line: {
        marginTop: -1,
        width: width,
        height: 1,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 20,
    },
    title: {
        fontSize: 17,
        color: '#101014',
        marginBottom: 10,
    },
    view: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    view_2: {
        alignItems: "center"
    },
    borderIcon: {
        width: 117, 
        height: 87,
        backgroundColor: '#F3FAFF',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    text_2: {
        fontSize: 15,
        color: '#101014',
        fontWeight: '300',
    },
    icon: {
        width: 40,
        height: 40,
    },
});

export default Style_WalletScreen_2;