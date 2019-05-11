// External Modules.
import React, { Component } from 'react';
import { Alert } from 'react-native';
// My Modules.
import DayForecastList from '../../Containers/day-forecast-list';
import * as weatherService from '../../../services/weather';

export default class Tomorrow extends Component {
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
            tomorrowWeatherData: {},
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
            let tomorrowWeatherData = await weatherService.getForecastWeather(this.state.position.latitude, this.state.position.longitude);
            this.setState({
                tomorrowWeatherData,
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
            //* show the tomorrow forecast.
            return (
                <DayForecastList
                    position={this.state.position}
                    tomorrowWeatherData={this.state.tomorrowWeatherData}
                />
            );
        } else {
            //! not show nothing.
            return null;
        }
    };
};