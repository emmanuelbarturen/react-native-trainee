import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TextInput, Button } from 'react-native';


export default class App extends Component {

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
      console.log(e);

    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        console.log('Valor del elemento guardado', value);
        return value;
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }

  state = {
    data: 'nada'
  }

  saveText() {
    this.storeData(this.state.data);
    alert('Texto Guardado!');
  }

  loadText() {
    this.getData().then(value => {
      this.setState({ data: value })
    });
  }

  render() {
    return (
      <View>
        <TextInput onChangeText={text => this.setState({ data: text })} value={this.state.data} style={{ borderColor: '#000', borderWidth: 1 }} />
        <Button onPress={() => this.saveText()} title="Guardar Texto" />
        <Button onPress={() => this.loadText()} title="Cargar Texto" />

        <Text>Local Storage Example. A la firme</Text>
        <Text>DATA: {this.state.data}</Text>
      </View>
    )
  }
}
