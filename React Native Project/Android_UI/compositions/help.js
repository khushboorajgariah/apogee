import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Alert,
    Button,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../stylesheet.js';
import {ListView} from '../components/listView';
import {connect} from 'react-redux';
import {actions} from '../actions/actions';
import {Header} from '../components/header';
import {Footer} from '../components/footer';

class Help extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Help',
        headerStyle: {
            backgroundColor: '#244f8e'
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: <Icon
            name="arrow-left"
            size={20}
            color= 'white'
            style={{paddingLeft: 20}}
            onPress={()=>{
                navigation.goBack(null);
            }}
        />,
        headerRight: <Icon
            name="search"
        />
    });
    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={StyleSheet.absoluteFill}>
                <ScrollView>
                    <View style={styles.appContent}>
                        <ListView list_data= {this.props.list_data} onPressHandler={this.props.onPress}/>
                    </View>
                </ScrollView>
                <Footer/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        list_data: state.reducer.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPress: (index) => {
            dispatch(actions.toggleInnerContent(index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);
