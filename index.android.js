import React, { Component } from 'react';
import {
  BackAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import MainScene from './scenes/MainScene';

export default class zeropass extends Component {
  render() {
    var defaultName = "MainScene";
    var defaultComp = MainScene;

    return (
      <Navigator
        initialRoute={{
          name: defaultName,
          component: defaultComp
        }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          var Component = route.component;
          return (
            <View style={{flex: 1}}>
              {route.name!=='MainScene' && route.name!=='UserMainScene' &&  (<Text style={{
                position: 'absolute',
                top: 20,
                left: 10,
                color: 'rgb(78, 186, 232)',
                zIndex: 100,
                fontSize: 22,
              }} onPress={()=>{navigator.pop();}}>Back</Text>) }
              <Component {...route.params} navigator={navigator} />
            </View>
          );
        }}
      />
    )
  }
}

AppRegistry.registerComponent('zeropass', () => zeropass);
