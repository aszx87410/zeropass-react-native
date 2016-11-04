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

export default class HelpTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  onGoClick() {
    const { navigator } = this.props;
    
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image source={require('../../img/bg.png')} style={styles.bg} />
        </View>

        <Image source={require('../../img/logo-white.png')} style={styles.image}/>

        <Text style={styles.text}>
          0pass let you easily create a strong password.
          Only you know your password.
        </Text>


        <View style={styles.btnGroup}>
          <Button style={styles.btnSignIn} textStyle={{fontSize: 18, color: 'white'}}>
            Email us
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

  text: {
    color: 'white',
    alignSelf: 'center',
    width: 300
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

AppRegistry.registerComponent('HelpTab', () => HelpTab);