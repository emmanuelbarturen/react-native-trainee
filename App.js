import React, {Component} from 'react';
import {View, Text, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import CustomToast from 'react-native-custom-toast';

export default class App extends Component {

    constructor() {
        super();
    }

    showDefaultToast() {
        this.refs.defaultToast.showToast('Default Toast...');
    }

    createTwoButtonAlert = () =>
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {text: "OK", onPress: () => SimpleToast.show("OK Pressed")}
            ],
            {cancelable: false}
        );

    createThreeButtonAlert = () =>
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Ask me later",
                    onPress: () => console.log("Ask me later pressed")
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {text: "OK", onPress: () => SimpleToast.show("OK Pressed")}
            ],
            {cancelable: false}
        );

    showToast(message) {
        if (message.length > 16) {
            SimpleToast.show(message, SimpleToast.LONG);
        } else {
            SimpleToast.show(message);
        }
    }

    render() {
        return <View>
            <Text>TOAST</Text>
            <Button onPress={() => this.showToast('Mensaje Corto')} title="SimpleToast Corto"/>
            <Button
                onPress={() => this.showToast('Este es un mensaje mucho más largo por lo que se muestra en un toast extenso')}
                title="SimpleToast Largo"/>
            <Text>************************************************************</Text>
            <Text>Confirmation</Text>
            <Button title={"Botón confirmación"}
                    onPress={this.createTwoButtonAlert}/>
            <Button
                title={"Botón confirmación + Luego"}
                onPress={this.createThreeButtonAlert}
            />
            <Text>************************************************************</Text>
            <TouchableOpacity onPress={this.showDefaultToast.bind(this)} activeOpacity={0.8}
                              style={styles.showToastBtn}>
                <Text style={styles.btnText}>Toast Personalizado</Text>
            </TouchableOpacity>
            <CustomToast ref="defaultToast"  backgroundColor="#28a745"  />
        </View>;
    }

}
const styles = StyleSheet.create(
    {
        container:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },

        showToastBtn:
            {
                padding: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignSelf: 'stretch',
                marginHorizontal: 25,
                marginVertical: 10
            },

        btnText:
            {
                textAlign: 'center',
                color: 'white',
                fontSize: 18
            }
    });
