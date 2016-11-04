import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Clipboard,
  ToastAndroid 
} from 'react-native';

import Button from 'apsl-react-native-button'
import {getpassword} from '../../utils';

export default class PasswordScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

  }

  onCopy(pwd) {
    Clipboard.setString(pwd);
    ToastAndroid.show('copied!', ToastAndroid.SHORT);
  }

  onChange() {

  }

  onSave() {

  }

  render() {

    const {site, password} = this.props;
    const {username} = this.state;

    const pwd = getpassword(password, site, 0);

    return (
      <View style={styles.container}>
        <View>
          <Image source={require('../../img/logo-reverse.png')} style={styles.image}/>
          <Text style={styles.text}>
            Password for
          </Text>
          <Text style={styles.textFor}>
            {site}
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <TextInput style={styles.text1}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              value={pwd} />
             <Button style={styles.btn} textStyle={{fontSize: 18, color: 'white'}} onPress={()=> this.onCopy(pwd).bind(this)}>
              Copy
            </Button>
          </View>
          <Text style={styles.txtOr}> or </Text>
          <Button style={styles.btnChange} textStyle={{fontSize: 18, color: 'white'}} 
            onPress={this.onChange.bind(this)}>
            Change Password
          </Button>
          <View style={styles.greyDiv}>
            <Text style={styles.text}>Store username(optional)</Text>
            <TextInput style={styles.textInput}
             onChangeText={ (username) => {this.setState({username})}}
              placeholder='username'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              value={username} />
               <Button 
                style={[styles.btnChange, {width: 100, marginTop: 20}]} 
                textStyle={{fontSize: 18, color: 'white'}} 
                onPress={this.onSave.bind(this)}>
                Save
             </Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: 'white',
  },

  greyDiv: {
    backgroundColor: '#ddd',
    padding: 10,
    height: 400
  },

  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#333',
  },

  textFor: {
    alignSelf: 'center',
    fontSize: 23,
    color: '#333',
    fontWeight: '700',
    marginBottom: 10
  },

  text1: {
    alignSelf: 'center',
    fontSize: 20,
    borderWidth: 2,
    color: '#666',
    textAlign: 'left',
    borderColor: 'rgb(78, 186, 232)',
    height: 50,
    width: 200,
  },

  image: {
    alignSelf: 'center',
    width: 200,
    height: 110,
    resizeMode: 'contain',
  },

  btn: {
    backgroundColor: 'rgb(78, 186, 232)',
    height: 53,
    marginTop: 6,
    borderWidth: 0,
    borderRadius: 0,
    marginLeft: 5,
    width: 70
  },

  btnChange: {
    alignSelf: 'center',
    backgroundColor: 'rgb(78, 186, 232)',
    height: 53,
    marginTop: 3,
    borderWidth: 0,
    borderRadius: 0,
    width: 180
  },

  txtOr: {
    alignSelf: 'center',
    color: 'rgb(78, 186, 232)',
    fontSize: 20
  },

  textInput: {
    alignSelf: 'center',
    height: 40,
    width: 250,
    marginTop: 10,
    color: '#333',
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.6)'
  },
});

AppRegistry.registerComponent('PasswordScene', () => PasswordScene);
