import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../stylesheet.js';
import {actions} from '../actions/actions.js';

export class ListView extends Component {
    constructor() {
        super();
        this.toggleInnerContent = this.toggleInnerContent.bind(this);
    }

    toggleInnerContent(index) {
        this.props.onPressHandler(index);
    }
    render() {
        return (
            <View>
                {this.props.list_data.map((item, index)=>
                    <View style={styles.tableRowContainer} key={index}>
                        <View style={styles.questionContainer}>
                            <Text
                                style={styles.question}
                                onPress={()=> this.toggleInnerContent(index)}
                            >
                                {item.textContent}
                            </Text>
                            <Icon
                                name={item.showInnerContent ? 'chevron-up' : 'chevron-down'}
                                size={15}/>
                        </View>
                        {item.showInnerContent ? <Text style={styles.innerContent}>{item.innerContent}</Text> : null}
                    </View>
                )}
            </View>
        );
    }
};