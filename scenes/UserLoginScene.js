import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import Button from 'apsl-react-native-button'

import UserMainScene from './UserMainScene';
import Spinner from 'react-native-loading-spinner-overlay';
import store from '../store';

export default class UserLoginScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      username: '',
      spinnerShow: false
    }
  }

  onGoClick() {
    const { navigator } = this.props;
    const { username, password } = this.state;

    //驗證帳號密碼 登入
    this.setState({
      spinnerShow: true
    })

    store.setUsername(username);

    const self = this;
    setTimeout(function(){
      self.setState({
        spinnerShow: false
      })
      if(navigator) {
      navigator.push({
        name: 'UserMainScene',
        component: UserMainScene,
        params: {
          password: password
        }
      })
    }
    }, 2000)
    
  }

  render() {
    const {password, username, spinnerShow} = this.state;
    return (
      <View style={styles.container}>
        <Spinner visible={spinnerShow} />
        <View style={styles.bgImageWrapper}>
          <Image source={require('../img/bg.png')} style={styles.bg} />
        </View>

        <Image source={require('../img/logo-white.png')} style={styles.image}/>
        <TextInput style={styles.textInput}
          onChangeText={ (username) => {this.setState({username})}}
          placeholder='username'
          placeholderTextColor='rgba(255,255,255,0.5)'
          underlineColorAndroid='rgba(1,1,1,0)'
          autoCorrect={false}
          value={username} />
        <TextInput style={styles.textInput}
          onChangeText={ (password) => {this.setState({password})}}
          placeholder='password'
          secureTextEntry
          placeholderTextColor='rgba(255,255,255,0.5)'
          underlineColorAndroid='rgba(1,1,1,0)'
          autoCorrect={false}
          value={password} />
        <View style={styles.btnGroup}>
          <Button style={styles.btnSignIn} textStyle={{fontSize: 18, color: 'white'}} onPress={this.onGoClick.bind(this)}>
            Sign in
          </Button>
        </View>

        <View style={styles.textWrapper}>
          <Text style={[styles.textBottom, {color: '#48baeb'}]}>Forgot your password?</Text>
        </View>
      
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
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
    marginTop: 20,
    color: 'white',
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.6)'
  },

  btnSignIn: {
    backgroundColor: '#48baeb',
    borderWidth: 0,
    padding: 20,
    height: 50,
    paddingTop: 23,
    width: 250,
  },

  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },

  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginTop: 30,
    marginBottom: 30
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

});

AppRegistry.registerComponent('UserLoginScene', () => UserLoginScene);