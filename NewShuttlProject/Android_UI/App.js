import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    View
} from 'react-native';
import {Header} from './components/header.js';
import {Footer} from './components/footer.js';
import Help from './compositions/help.js';

export class App extends Component {
    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <Header/>
                <Help/>
                <Footer/>
            </View>
        );
    }
}