import React, { Component } from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

console.log(axios.request);

axios({
    url: 'https://github.com/users',
    method: 'get',
    responseType: 'json'
}).then(function (response) {
    console.log(response);
});

export default class Profile extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Profile',
        headerLeft: <Icon
            name="arrow-left"
            size={20}
            style={{paddingLeft: 20}}
            onPress={()=>{
                navigation.goBack(null);
            }}
        />
    });
    render() {
        return(
            <Text>This is the Profile Page.</Text>
        );
    }
}