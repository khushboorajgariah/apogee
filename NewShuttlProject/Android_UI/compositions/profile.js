import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet
} from 'react-native';

export default class Profile extends Component {
    static navigationOptions = {
        title: 'Profile'
    }
    render() {
        return(
            <Text>This is the Profile Page.</Text>
        );
    }
}