/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import CustomRouter from './src/routes/custom-router';

export default class App extends Component {
  render() {
    return (
			<CustomRouter />
		);
  };
};