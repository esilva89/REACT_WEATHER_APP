// External Modules.
import React, { Component } from 'react';
import {
    Router,
    Scene,
    Stack
} from 'react-native-router-flux';
// My Modules.
import Home from '../components/Screens/Home/home';
import Today from '../components/Screens/Today/today';
import Tomorrow from '../components/Screens/Tomorrow/tomorrow';
import Forecast from '../components/Screens/Forecast/forecast';

export default class CustomRouter extends Component {
    /**
     * Show the component.
     * 
     * @method render.
     * @return {*}: return the component to render.
     */
    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene
                        key="home"
                        component={Home}
                        renderTitle="Weather App"
                    />
                    <Scene
                        key="today"
                        component={Today}
                        renderTitle="Hoy"
                    />
                    <Scene
                        key="tomorrow"
                        component={Tomorrow}
                        renderTitle="Mañana"
                    />
                    <Scene
                        key="forecast"
                        component={Forecast}
                        renderTitle="Pronóstico extendido"
                    />
                </Stack>
            </Router>
        );
    };
};