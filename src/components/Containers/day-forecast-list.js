// External Modules.
import React, { Component } from 'react';
import {
    ScrollView,
    View
} from 'react-native';
import {
    Badge,
    ListItem,
    Text
} from 'react-native-elements';
// My Modules.
import TitleCard from './title-card';
import * as helpers from '../../utils/helpers';
import * as weather from '../../utils/weather';
import iconsPath from '../../utils/icons-path';

export default class DayForecastList extends Component {
    /**
     * Initialize the DayForecastList component.
     * 
     * @constructor.
     * @param {*} props: parent data.
     */
    constructor(props) {
        super(props);
        this.state = {
            tomorrowWeatherData: {},
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
            tomorrowWeatherData: weather.parseTomorrowForecastWeatherData(this.props.tomorrowWeatherData),
            fetchingParentData: true
        });
    };

    /**
     * Determine if it is night to return the corresponding icon.
     * 
     * @method isNight.
     * @param {*} data: data forecasted.
     * @return {*}: return the corresponding icon.
     */
    isNight(data) {
        if(data.icon.length == 2 && helpers.isNight(data.hour)) {
            return iconsPath[data.icon[1]];
        } else {
            return iconsPath[data.icon[0]];
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
        if(this.state.fetchingParentData) {
            //* show the list of the data forecasted.
            return (
                <ScrollView>
                    <TitleCard
                        city={this.state.tomorrowWeatherData.city}
                        country={this.state.tomorrowWeatherData.country}
                        day={this.state.tomorrowWeatherData.day}
                    />
                    <View style={{ marginTop: 20 }}>
                        {
                            this.state.tomorrowWeatherData.tomorrowForecast.map((l, i) => (
                                <ListItem
                                    key={i}
                                    leftAvatar={{ source: this.isNight(l) }}
                                    title={l.hour}
                                    topDivider={true}
                                    rightElement={
                                        <View style={{ width: 115 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                {
                                                    parseInt(l.temperature) < 16 ?
                                                        (<Badge status="primary" containerStyle={{ marginRight: 10 }} value={l.temperature}/>)
                                                    :
                                                        15 < parseInt(l.temperature) && parseInt(l.temperature) < 26 ?
                                                            (<Badge status="warning" containerStyle={{ marginRight: 10 }} value={l.temperature}/>)
                                                        :
                                                            (<Badge status="error" containerStyle={{ marginRight: 10 }} value={l.temperature}/>)
                                                }
                                                <Text>{l.mainDescription}</Text>
                                            </View>
                                            <View>
                                                <Text>{l.windSpeed}</Text>
                                            </View>
                                        </View>
                                    }
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            );
        } else {
            //! not show nothing.
            return null;
        }
    };
};