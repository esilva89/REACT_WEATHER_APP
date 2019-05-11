# React-Native-Weather-App

Weather app implemented with React Native for Android.

## Goal
The application allows get today weather information and tomorrow forecast information using the [OpenWeatherMap API](https://openweathermap.org/api).

## Requirements
1. [React-Native](https://facebook.github.io/react-native/docs/getting-started) version 0.59.5.
1. OpenWeatherMap Account. **Only if you are going to use it with the method of React Native**.
1. Smarthphone or emulator with Android.

## Installation
**Using the apk**
1. Enable on your smarthphone the "Unknown Sources" option.
1. Download the file `weather_app_vX.apk` to your phone or emulator.
1. Run the file `weather_app_vX.apk` to install the application.

**Using React Native**
1. Create an account in [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
1. Login with your account in [OpenWeatherMap](https://home.openweathermap.org/users/sign_in).
1. Go to the "API keys" tab and copy the default api key. Replace "APP_ID" in the file `src/config/keys.js` with the copied api key by placing quotation marks. [Example to use the api key](https://openweathermap.org/appid).
```javascript
export const APPID = APP_ID;
```
4. Save the changes.
5. Connect the smarthphone to PC or run emulator android. **If you connect your smarthphone remember to enable USB Debugging**.
6. Access the root folder of the project and execute the command: `npm install`.
7. Access the root folder of the project and execute the command: `react-native run-android`.

## Screenshots
![alt text](https://github.com/esilva89/REACT_WEATHER_APP/blob/master/docs/screenshot_screen_home_1.jpg?thumbnail "Screen Home")
---
![alt text](https://github.com/esilva89/REACT_WEATHER_APP/blob/master/docs/screenshot_screen_home_2.jpg "Screen Home")
---
![alt text](https://github.com/esilva89/REACT_WEATHER_APP/blob/master/docs/screenshot_screen_today.jpg "Screen Today")
---
![alt text](https://github.com/esilva89/REACT_WEATHER_APP/blob/master/docs/screenshot_screen_tomorrow.jpg "Screen Tomorrow") 
---
![alt text](https://github.com/esilva89/REACT_WEATHER_APP/blob/master/docs/screenshot_screen_forecast.jpg "Screen Forecast")

## External Packages
1. [react-native-android-location-services-dialog-box](https://www.npmjs.com/package/react-native-android-location-services-dialog-box): a react-native component for turn on the dialog box from android location services.
1. [react-native-elements](https://react-native-training.github.io/react-native-elements/docs/getting_started.html): provide an all-in-one UI kit for creating apps in react native.
1. [react-native-router-flux](https://www.npmjs.com/package/react-native-router-flux): helps users to define all the routes in one central place and navigate and communicate between different screens in an easy way.
1. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons): perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project.
1. [moment](https://www.npmjs.com/package/moment): library for parsing, validating, manipulating, and formatting dates.

## Resources
1. [country-list](https://datahub.io/core/country-list).
1. [Weather Color](https://www.iconfinder.com/iconsets/weather-color-2): elegant colored weather icons.
1. [The Weather is Nice Today](https://www.iconfinder.com/iconsets/the-weather-is-nice-today).

## Improvements
1. Implement more forecasts.
1. Implement the functionality to choose the place to know its weather.
