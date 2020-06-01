import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
    constructor(props) {
        super(props);
        Geolocation.getCurrentPosition(info => console.log('obteniendo información del GPS', info))
    }

    render() {
        return (<View>
            <Text>GPS:</Text>
        </View>);
    }
}
