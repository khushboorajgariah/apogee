import React, { Component } from 'react';
import Help from './compositions/help.js';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Profile from './compositions/profile.js';
import Home from './compositions/home.js';

const Drawer =  DrawerNavigator({
    Home: {screen: Home},
    Help: {screen: Help},
    Profile: {screen: Profile}
});

export const App = StackNavigator ({
    Drawer: {screen: Drawer}
});