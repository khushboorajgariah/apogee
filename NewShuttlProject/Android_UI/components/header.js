import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../stylesheet.js';

export const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Icon
                size={25}
                name='chevron-left'
                color='white'
            />
            <Text style={styles.headerContent}>Help</Text>
            <Icon
                size={25}
                name='search'
                color='white'
            />
        </View>
    );
};