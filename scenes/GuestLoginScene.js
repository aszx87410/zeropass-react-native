import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert
} from 'react-native';
import Button from 'apsl-react-native-button'

import GuestSiteScene from './GuestSiteScene';


export default class GuestLoginScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordAgain: ''
    }
  }

  onGoClick() {
    const { navigator } = this.props;
    const { password, passwordAgain } = this.state;
    if(!password) {
      return;
    }
    if(password!==passwordAgain) {
      Alert.alert('Please type the same password');
      return;
    }
    if(navigator) {
      navigator.push({
        name: 'GuestSiteScene',
        component: GuestSiteScene,
        params: {
          password: password
        }
      })
    }
  }

  // to sign in page
  onClick() {

  }

  render() {
    const {password, passwordAgain} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image source={require('../img/bg.png')} style={styles.bg} />
        </View>

        <Image source={require('../img/key.png')} style={styles.image}/>
        <Text style={styles.text}>Enter your password</Text>
        <TextInput style={styles.textInput}
          onChangeText={ (password) => {this.setState({password})}}
          placeholder='password'
          secureTextEntry
          placeholderTextColor='rgba(255,255,255,0.5)'
          underlineColorAndroid='rgba(1,1,1,0)'
          autoCorrect={false}
          value={password} />

        <TextInput style={styles.textInput}
          onChangeText={ (passwordAgain) => {this.setState({passwordAgain})}}
          placeholder='retype password'
          secureTextEntry
          placeholderTextColor='rgba(255,255,255,0.5)'
          underlineColorAndroid='rgba(1,1,1,0)'
          autoCorrect={false}
          value={passwordAgain} />

        <View style={styles.btnGroup}>
          <Button style={styles.btnSignIn} textStyle={{fontSize: 18, color: 'white'}} onPress={this.onGoClick.bind(this)}>
            Go
          </Button>
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.textBottom}>Already have an account? </Text>
          <Text style={[styles.textBottom, {color: '#48baeb'}]} onClick={this.onClick.bind(this)}>Sign in</Text>
        </View>
      
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },

  textBottom: {
    fontSize: 17,
    color: '#fff',
  },

  textWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  textInput: {
    alignSelf: 'center',
    height: 40,
    width: 250,
    marginTop: 30,
    color: 'white',
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.6)'
  },

  btnSignIn: {
    backgroundColor: '#48baeb',
    borderWidth: 0,
    padding: 20,
    width: 250,
  },

  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },

  image: {
    width: 100,
    height: 200,
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
    fontSize: 23
  }

});

AppRegistry.registerComponent('GuestLoginScene', () => GuestLoginScene);