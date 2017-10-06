import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../stylesheet.js';
import {ListView} from "../components/listView";
import {connect} from 'react-redux';
import {actions} from "../actions/actions";

class Help extends Component {

    render() {
        return(
            <ScrollView>
                <View style={styles.appContent}>
                    <ListView list_data= {this.props.list_data} onPressHandler={this.props.onPress}/>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        list_data: state.reducer.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onPress: (index) => {
            dispatch(actions.toggleInnerContent(index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);
