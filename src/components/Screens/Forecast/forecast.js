import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { Text } from 'react-native-elements';

export default class Forecast extends Component {
    render() {
        return (
            <View style={styles.centeredElementsContainer}>
                <Text
                    h4
                    h4Style={{ color: '#b22222' }}
                >No implementado</Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    centeredElementsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});