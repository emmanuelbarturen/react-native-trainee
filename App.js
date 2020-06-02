import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});


export default class App extends Component {
    state = {
        lat: 37.78825,
        lng: -122.4324
    };

    constructor(props) {
        super(props);


    }

    autoLocation() {
        Geolocation.getCurrentPosition(info => {
            console.log('obteniendo información del GPS', info);
            this.setState({lat: info.coords.latitude, lng: info.coords.longitude})
        })
    }

    render() {
        return (<View>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                </MapView>

            </View>
            <Text style={{textAlign: 'center', marginTop: 450, marginBottom: 20}}>GPS Latitud:{this.state.lat},
                Longitud:{this.state.lng}</Text>
            <Button onPress={() => this.autoLocation()} title={'AutoLocation'}/>

        </View>);
    }
}
