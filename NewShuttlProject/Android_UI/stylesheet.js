import {
    StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
    appContent: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    headerContainer: {
        backgroundColor: '#244f8e',
        height: '10%',
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    headerContent: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 40,
        width: '80%'
    },
    question: {
        height: 60,
        paddingLeft: 20,
        textAlignVertical: 'center',
        fontSize: 20,
        width: '90%'
    },
    innerContent: {
        fontSize: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        width: '100%'
    },
    tableRowContainer: {
        borderBottomWidth:1,
        borderBottomColor: 'lightgrey'
    },
    questionContainer: {
        display:'flex',
        flexDirection:'row',
        alignItems: 'center'
    }
});
