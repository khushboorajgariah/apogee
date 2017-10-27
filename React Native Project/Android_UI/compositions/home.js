import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Home',
        headerLeft: <Icon
            name="navicon"
            size={20}
            style={{paddingLeft: 20}}
            onPress={()=>{
                navigation.navigate('DrawerOpen');
            }}
        />
    });

    render() {
        const { navigate } = this.props.navigation;
        return(
            <Text>This is the Home Page.</Text>
        );
    }
}