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
import {getpassword} from '../utils';

export default class GuestPasswordScene extends Component {

  constructor(props) {
    super(props);
  
    this.onPress = this.onPress.bind(this);
  }

  onPress(pwd) {
    Clipboard.setString(pwd);
    ToastAndroid.show('copied!', ToastAndroid.SHORT);
  }

  render() {

    const {site, password} = this.props;

    const getRandom = (name) => {
      let list = [];

      for(let i=0; i<name.length; i++) {
        list.push( ((name.charCodeAt(i)*7+37)%50) + 33 );
      }

      return String.fromCharCode(...list);
    }

    const pwd = getpassword(password, site, 0);

    return (
      <View style={styles.container}>
        <View>
          <Image source={require('../img/logo-reverse.png')} style={styles.image}/>
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
             <Button style={styles.btn} textStyle={{fontSize: 18, color: 'white'}} onPress={()=> this.onPress(pwd)}>
              Copy
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
    paddingTop: 20,
    backgroundColor: 'white',
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
    marginBottom: 30
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
  }
});

AppRegistry.registerComponent('GuestPasswordScene', () => GuestPasswordScene);
