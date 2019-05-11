// External Modules.
import React, { Component } from 'react';
import {
    Alert,
    ActivityIndicator,
    BackHandler,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
    Button,
    Card
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
// My Modules.
import * as geolocationService from '../../../services/geolocation';

export default class Home extends Component {
    /**
     * Initialize the Home component.
     * 
     * @constructor.
     * @param {*} props: parent data.
     */
    constructor(props) {
        super(props);
        this.state = {
            position: {
                latitude: 'null lat',
                longitude: 'null long'
            },
            isLocationServiceActivated: false,
            loading: false
        };
    };
    
    /**
     * Activate the location service.
     * 
     * @method componentDidMount.
     */
    async componentDidMount() {
        await this.activateLocationService();
    };

    /**
     * Check if the location service is activated and if so find the current location.
     * * successful save the new state.
     * ! error the geolocation service failed.
     * ! error the location service is disabled.
     * 
     * @method checkIsLocation.
     */
    async checkIsLocation() {
        try {
            let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "Los servicios de ubicación están desactivados y " +
                         "es necesario activarlos para que la aplicación funcione correctamente ¿Desea activarlos?",
                ok: "Si",
                cancel: "No",
                showDialog: true,
                openLocationServices: true,
                preventOutSideTouch: true,
                preventBackClick: false
            });
            //? check if the location service is activated.
            if(Object.is(check.status, "enabled")) {
                //* successful find coordinates.
                this.setState({
                    loading: true
                });
                let location = await geolocationService.findCoordinates();
                this.setState({
                    position: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    },
                    isLocationServiceActivated: true,
                    loading: false
                });
            }
        } catch(err) {
            throw err;
        }
    };

    /**
     * Activate the location service.
     * * successful activate location service.
     * ! error the geolocation service failed.
     * ! error the location service is disabled.
     * 
     * @method activateLocationService.
     */
    async activateLocationService() {
        try {
            await this.checkIsLocation();
        } catch(err) {
            //? check the error type.
            if(Object.is(err.message, "disabled")) {
                Alert.alert(
                    'Atención',
                    'Servicio de localización desactivado.',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            } else {
                this.setState({
                    loading: false
                });
                Alert.alert(
                    'Error',
                    `${err.message}`,
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            }
        }
    };

    /**
     * Close the application.
     * 
     * @method closeApp.
     */
    closeApp() {
        Alert.alert(
            'Salir',
            '¿Desea salir de la aplicación?',
            [
                { text: 'No' },
                {
                    text: 'Si',
                    onPress: () => BackHandler.exitApp()
                }
            ],
            { cancelable: false }
        );
    };

    /**
     * Redirect to the screenToday.
     * 
     * @method screenToday.
     */
    screenToday() {
        Actions.today(this.state.position);
    };

    /**
     * Redirect to the screenTomorrow.
     * 
     * @method screenTomorrow.
     */
    screenTomorrow() {
        Actions.tomorrow(this.state.position);
    };

    /**
     * Redirect to the screenForecast.
     * 
     * @method screenForecast.
     */
    screenForecast() {
        Actions.forecast(this.state.position);
    };

    /**
     * Show the component.
     * 
     * @method render.
     * @return {*}: return the component to render.
     */
    render() {
        if(this.state.isLocationServiceActivated) {
            return (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.centeredElementsContainer}>
                        <Card containerStyle={{ width: 300 }}>
                            <Button
                                title="Hoy"
                                onPress={this.screenToday.bind(this)}
                                containerStyle={[styles.topSeparation, styles.bottomSeparation]}
                            />
                            <Button
                                title="Mañana"
                                onPress={this.screenTomorrow.bind(this)}
                                containerStyle={styles.bottomSeparation}
                            />
                            <Button
                                title="Pronóstico Extendido"
                                onPress={this.screenForecast.bind(this)}
                                containerStyle={styles.bottomSeparation}
                            />
                            <Button
                                title="Salir"
                                onPress={this.closeApp.bind(this)}
                                containerStyle={styles.bottomSeparation}
                                buttonStyle={{ backgroundColor: '#b22222' }}
                            />
                        </Card>
                    </View>
                </ScrollView>
            );
        } else {
            if(this.state.loading) {
                return (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.centeredElementsContainer}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    </ScrollView>
                );
            } else {
                return (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.centeredElementsContainer}>
                            <Card containerStyle={{ width: 300 }}>
                                <Button
                                    title="Activar Ubicación"
                                    onPress={this.activateLocationService.bind(this)}
                                    containerStyle={[styles.topSeparation, styles.bottomSeparation]}
                                />
                                <Button
                                    title="Salir"
                                    onPress={this.closeApp.bind(this)}
                                    containerStyle={styles.bottomSeparation}
                                    buttonStyle={{ backgroundColor: '#b22222' }}
                                />
                            </Card>
                        </View>
                    </ScrollView>
                );
            }
        }
    };
};

const styles = StyleSheet.create({
    centeredElementsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topSeparation: {
        marginTop: 30
    },
    bottomSeparation: {
        marginBottom: 30
    }
});