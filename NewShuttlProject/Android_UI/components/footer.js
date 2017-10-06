import React, { Component } from 'react';
import {
    View,
    Button
} from 'react-native';

export const Footer = () =>  {
    return(
        <View>
            <Button
                raised
                large
                color='#00acb6'
                title='Call Us' />
        </View>
    );
};