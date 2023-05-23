import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16
    },
    listTab:{
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#F1F1F1', 
        borderRadius: 35,
        marginTop: 35,
    },
    btnTab:{
        borderRadius: 35,
        paddingHorizontal: 16,
        alignItems: 'center',
        padding: 12
    },
    btnTabActive:{
        backgroundColor: '#005AA9', 
    },
    textTab:{
        fontSize: 12,
        color: '#005AA9'
    },
    textTabActive:{
        color: '#FFFFFF', 
    }
});

export default styles;