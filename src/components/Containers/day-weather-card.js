// External Modules.
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Card,
    Image,
    Text
} from 'react-native-elements';
// My Modules.
import TitleCard from './title-card';
import * as helpers from '../../utils/helpers';
import * as weather from '../../utils/weather';
import iconsPath from '../../utils/icons-path';

export default class DayWeatherCard extends Component {
    /**
     * Initialize the DayWeatherCard component.
     * 
     * @constructor.
     * @param {*} props: parent data.
     */
    constructor(props) {
        super(props);
        this.state = {
            todayWeatherData: {},
            fetchingParentData: false
        };
    };

    /**
     * Set the state of the component.
     * 
     * @method componentDidMount.
     */
    componentDidMount() {
        this.setState({
            todayWeatherData: weather.parseTodayWeatherData(this.props.todayWeatherData),
            fetchingParentData: true
        });
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
            //* show the today weather.
            return (
                <View>
                    <TitleCard
                        city={this.state.todayWeatherData.city}
                        country={this.state.todayWeatherData.country}
                        day={this.state.todayWeatherData.day}
                    />
                    <Card containerStyle={styles.centeredElementsContainer}>
                        <View style={styles.centeredElementsContainer}>
                            {
                                this.state.todayWeatherData.icon.length == 2 && helpers.isNight(this.state.todayWeatherData.hour) ?
                                    <Image
                                        style={styles.iconSize}
                                        source={iconsPath[this.state.todayWeatherData.icon[1]]}
                                    />
                                :
                                    <Image
                                        style={styles.iconSize}
                                        source={iconsPath[this.state.todayWeatherData.icon[0]]}
                                    />
                            }
                        </View>
                        <View style={styles.mbCenteredElementsContainer}>
                            <Text h4>{this.state.todayWeatherData.mainDescription}</Text>
                            <Text h4>{this.state.todayWeatherData.temperature}</Text>
                        </View>
                        <View style={styles.centeredElementsContainer}>
                            <Text style={{ fontSize: 18 }}>{this.state.todayWeatherData.detailedDescription}</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.todayWeatherData.humidity}</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.todayWeatherData.windSpeed}</Text>
                        </View>
                    </Card>
                </View>
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
    },
    mbCenteredElementsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    iconSize: {
        height: 180,
        width: 180
    }
});