import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 25,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        borderColor: '#C2C2C2',
        borderWidth: 1,
        padding: 10
    },
    textHeader: {
        color: '#005AA9',
        marginLeft: 10,
        fontSize: 20
    },
    image: {
        width: 49,
        height: 49
    },
    title:
    {
        fontSize: 17,
        color: '#000000',
        marginTop: 25
    }

});

export default styles;
