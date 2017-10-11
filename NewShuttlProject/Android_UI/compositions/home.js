import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet
} from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    render() {
        return(
            <Text>This is the Home Page.</Text>
        );
    }
}