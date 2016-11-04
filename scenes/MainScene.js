import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackAndroid
} from 'react-native';
import Button from 'apsl-react-native-button'

import GuestLoginScene from './GuestLoginScene';
import UserLoginScene from './UserLoginScene';
import UserSignUpScene from './UserSignUpScene'

export default class MainScene extends Component {

  constructor(props) {
    super(props);

    const {navigator} = this.props;

    
    BackAndroid.addEventListener('hardwareBackPress', function() {
        //navigator.pop();
        return true;
    });
    
  }



  toNext(data) {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push(data)
    }
  }

  onGuestClick() {
    this.toNext({
      name: 'GuestLoginScene',
      component: GuestLoginScene,
    });
  }

  onJoinClick() {
    this.toNext({
      name: 'UserSignUpScene',
      component: UserSignUpScene
    })
  }

  onSignInClick() {
    this.toNext({
      name: 'UserLoginScene',
      component: UserLoginScene,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image source={require('../img/bg.png')} style={styles.bg} />
        </View>

        <Image source={require('../img/logo-white.png')} style={styles.image}/>
        <Text style={styles.text}>Only you have your password</Text>
        <View style={styles.btnGroup}>
          <Button style={styles.btnGuest} textStyle={{fontSize: 18, color: 'white'}} onPress={this.onGuestClick.bind(this)}>
            Use as guest
          </Button>

          <Button style={styles.btnSignIn} textStyle={{fontSize: 18, color: 'white'}} onPress={this.onSignInClick.bind(this)}>
            Sign in
          </Button>
        </View>
        <Text style={styles.textJoin} onPress={this.onJoinClick.bind(this)}>Join now</Text>
  
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1  
  },

  btnGuest: {
    backgroundColor: 'grey',
    borderWidth: 0,
    padding: 10,
    width: 130
  },

  btnSignIn: {
    backgroundColor: '#48baeb',
    borderWidth: 0,
    padding: 20,
    width: 130,
    marginLeft: 10
  },

  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100
  },

  touch: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  image: {
    width: 300,
    height: 500,
    alignSelf: 'center',
    resizeMode: 'contain'
  },

  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0  
  },

  bg: {
    flex: 1,
    width: null,
    height: null,

    resizeMode: "cover"
  },

  text: {
    alignSelf: 'center',
    color: '#fff',
    marginTop: -170,
    fontSize: 25
  },

  textJoin: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    marginBottom: 60
  }

});

AppRegistry.registerComponent('MainScene', () => MainScene);