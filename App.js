import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';

export default class App extends Component {

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
                {text: "OK", onPress: () => Toast.show("OK Pressed")}
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
                    onPress: () =>  console.log("Ask me later pressed")
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {text: "OK", onPress: () => Toast.show("OK Pressed")}
            ],
            {cancelable: false}
        );

    showToast(message) {
        if (message.length > 16) {
            Toast.show(message, Toast.LONG);
        } else {
            Toast.show(message);
        }
    }

    render() {
        return <View>
            <Text>TOAST</Text>
            <Button onPress={() => this.showToast('Mensaje Corto')} title="Toast Corto"/>
            <Button
                onPress={() => this.showToast('Este es un mensaje mucho más largo por lo que se muestra en un toast extenso')}
                title="Toast Largo"/>
            <Text>************************************************************</Text>
            <Text>Confirmation</Text>
            <Button title={"Botón confirmación"}
                    onPress={this.createTwoButtonAlert}/>
            <Button
                title={"Botón confirmación + Luego"}
                onPress={this.createThreeButtonAlert}
            />
            <Text>************************************************************</Text>
        </View>;
    }

}
