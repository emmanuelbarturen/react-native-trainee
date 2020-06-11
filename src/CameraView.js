import React from 'react'

import { View, TouchableOpacity, Image } from 'react-native'
import { RNCamera } from 'react-native-camera';

export default class CameraView extends React.Component{
  state = {}
  render(){
    return(
      <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'flex-end'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
         style={{width:'100%', height:'100%', position:'absolute'}}
         type={RNCamera.Constants.Type.back}
        />
        <Image
          style={{width:100,height:100}}
          source={{uri:this.state.imageUri}}
        />
        <TouchableOpacity
          style={{width:100, height:100, backgroundColor:'red', borderRadius:100}}
          onPress={async ()=>{
            // take picture
            const result = await this.camera.takePictureAsync()
            this.setState({imageUri:result.uri})
          }}
        />
      </View>
    )
  }
}
