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

import UserMainScene from './UserMainScene';
import Spinner from 'react-native-loading-spinner-overlay';
import store from '../store';
import API from '../API';
import {getpassword} from '../utils';

export default class UserSignUpScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      username: '',
      passwordAgain: '',
      spinnerShow: false
    }
  }

  async onGoClick() {
    const { navigator } = this.props;
    const { username, password, passwordAgain } = this.state;

    if(!username || !password) {
      return;
    }

    if(password!==passwordAgain) {
      Alert.alert('Please input the same password');
      return;
    }

    //create new member
    this.setState({
      spinnerShow: true
    })

    store.setUsername(username);
    store.setPassword(password);
    let sitePassword = getpassword(password, '0pass.com', 0);

    try {
      let response = await API.createUser(username, sitePassword);

      // store information
      //Alert.alert(JSON.stringify(response));
      if(response && response.id) {

        store.setId(response.id);
        if(navigator) {
          navigator.push({
            name: 'UserMainScene',
            component: UserMainScene,
            params: {
              password: password
            }
          })
        }
        this.setState({
          spinnerShow: false
        })
        return;
      }

    } catch(error) {
      //Alert.alert(JSON.stringify(error));
      console.error(error);
    }

    Alert.alert('Error!');
    this.setState({
      spinnerShow: false
    })

  }

  render() {
    const {password, username, passwordAgain, spinnerShow} = this.state;

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
            Sign up
          </Button>
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
    marginTop: 10,
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

AppRegistry.registerComponent('UserSignUpScene', () => UserSignUpScene);