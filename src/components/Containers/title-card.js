// External Modules.
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Card,
    Text
} from 'react-native-elements';

export default class TitleCard extends Component {
    /**
     * Initialize the TitleCard component.
     * 
     * @constructor.
     * @param {*} props: parent data.
     */
    constructor(props) {
        super(props);
        this.state = {
            fetchingParentData: false
        };
    };

    /**
     * Set the state of the component.
     * 
     * @method componentDidMount.
     */
    componentDidMount() {
        this.setState({ fetchingParentData: true });
    };

    /**
     * Show the component.
     * 
     * @method render.
     * @return {*}: return the component to render.
     */
    render() {
        //? check if there is data.
        if(this.state.fetchingParentData) {
            //* show the screen title.
            return (
                <Card>
                    <View style={styles.centeredElementsContainer}>
                        <Text h4>{this.props.city}, {this.props.country}</Text>
                        <Text h4>{this.props.day}</Text>
                    </View>
                </Card>
            );
        } else {
            //! not show nothing.
            return null;
        }
    };
};

const styles = StyleSheet.create({
    centeredElementsContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});