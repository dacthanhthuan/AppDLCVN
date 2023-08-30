import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    title: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500'
    },
    viewUser: {
        marginTop: 6,
        marginBottom: 12,
        alignItems: 'center',
        width: 60
    },
    imgUser: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    textName: {
        fontSize: 13,
        color: '#000000',
        width: 60,
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 16,
        marginTop: 16
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000099',
    },
    centeredView: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 350,
        height: 180,
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 6
    },
    modalTitle: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '500',
        marginBottom: 8
    },
    textTitle: {
        fontSize: 16,
        marginTop: 8,
        color: '#000000'
    },
    button: {
        marginTop: 16,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#005AA9',
        padding: 8
    },
    textButton: {
        fontSize: 18,
        color: '#065FD4',
        fontWeight: '500'
    },
    icon: {
        width: 46,
        height: 46,
        marginLeft: 8
    }
});

export default styles;