// External Modules.
import React, { Component } from 'react';
import {
    Alert,
    ScrollView
} from 'react-native';
// My Modules.
import DayWeatherCard from '../../Containers/day-weather-card';
import * as weatherService from '../../../services/weather';

export default class Today extends Component {
    /**
     * Initialize the Today component.
     * 
     * @constructor.
     * @param {*} props: parent data.
     */
    constructor(props) {
        super(props);
        this.state = {
            position: {
                latitude: this.props.latitude,
                longitude: this.props.longitude
            },
            todayWeatherData: {},
            fetchingData: false
        };
    };

    /**
     * Set the state of the component.
     * * successful save the new state.
     * ! error the weather service failed.
     * 
     * @method componentDidMount.
     */
    async componentDidMount() {
        try {
            let todayWeatherData = await weatherService.getTodayWeather(this.state.position.latitude, this.state.position.longitude);
            this.setState({
                todayWeatherData,
                fetchingData: true
            });
        } catch(err) {
            Alert.alert(
                'Error',
                `${err.message}`,
                { cancelable: false }
            );
        }
    };

    /**
     * Show the component.
     * 
     * @method render.
     * @return {*}: return the component to render.
     */
    render() {
        //? check if there is data.
        if(this.state.fetchingData) {
            //* show the today weather.
            return (
                <ScrollView>
                    <DayWeatherCard
                        position={this.state.position}
                        todayWeatherData={this.state.todayWeatherData}
                    />
                </ScrollView>
            );
        } else {
            //! not show nothing.
            return null;
        }
    };
};