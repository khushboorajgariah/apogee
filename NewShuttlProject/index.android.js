/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Alert
} from 'react-native';
import {App} from './Android_UI/App.js';
import {Provider} from "react-redux";
import {createStore} from 'redux';
import {reducers} from './Android_UI/reducers/reducers.js';

const store = createStore(reducers);

export default class NewShuttlProject extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('NewShuttlProject', () => NewShuttlProject);
