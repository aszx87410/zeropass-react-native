import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button'
import GuestPasswordScene from './GuestPasswordScene';
import store from '../store';
import {normalizeUrl} from '../utils';
import API from '../API';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class GuestSiteScene extends Component {

  constructor(props) {
    super(props);
    
    this.onPress = this.onPress.bind(this);
    this.inputText = this.inputText.bind(this);
    this.state = {
      name: '',
      dataSource: ds.cloneWithRows([])
    }
  }

  async inputText(text) {

    let source = [];
    if(text=='') {
      this.setState({
        name: ''
      })
      return;
    } 

    this.setState({
      name: text
    })

    // api call
    let domains = [];
    try {
      domains = await API.getDomains(text);
      
    } catch(error) {
      console.error(error);
    }

    for(let domain of domains) {
      source.push(domain.domain);
    }
  
    this.setState({
      dataSource: ds.cloneWithRows(source),
    })
  }

  onContinueClick() {
    const {name} = this.state;
    this.toNextScene(name);
  }

  toNextScene(data) {
    const { navigator, password } = this.props;
    if(!data) {
      return;
    }
    
    if(navigator) {
      navigator.push({
        name: 'GuestPasswordScene',
        component: GuestPasswordScene,
        params: {
          site: normalizeUrl(data),
          password
        }
      })
    }
  }
  onPress(data) {
    this.toNextScene(data);
  }

  render() {

    const {name} = this.state;

    const that = this;
    const press = (data) => {
      return function(){
        that.onPress(data);
      }
    }

    const getRow = (data) => {
      return (
        <TouchableOpacity onPress={press(data)}>
          <Text style={styles.row} >{data}</Text>
        </TouchableOpacity>
      )
    }

    var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  );

    return (
        <View style={styles.container}>
          <View style={{
            flex: 1,
            marginTop: 20
          }}>
            <Image source={require('../img/logo-reverse.png')} style={styles.image}/>
            <Text style={styles.text}>
              Enter your website
            </Text>
            <TextInput style={styles.textInput}
              onChangeText={this.inputText}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              value={name} />
            <View style={styles.list}>
              <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(rowData) => getRow(rowData)} /> 
            </View>
            <Button style={styles.btnContinue} textStyle={{fontSize: 18, color: 'white'}} onPress={this.onContinueClick.bind(this)}>
              Continue
            </Button>
          </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  btnContinue: {
    backgroundColor: '#48baeb',
    alignSelf: 'center',
    borderWidth: 0,
    padding: 20,
    width: 300,
    marginTop: 10
  },

  row: { 
    padding: 2,
    alignSelf: 'flex-start',
    width: 300,
    fontSize: 20,
    marginBottom: 2,
    padding: 10,
    backgroundColor: '#f3f3f3',
    color: '#ccc',
  },

  list: {
    marginTop: 0,
    alignSelf: 'center',
    maxHeight: 200,
    width: 300
  },

  text: {
    alignSelf: 'center',
    fontSize: 24,
    color: 'black',
    marginBottom: 15
  },

  textInput: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'rgb(78, 186, 232)',
    backgroundColor: '#f3f3f3',
    
    padding: 10,
    height: 50,
    width: 300,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 0
  },

  image: {
    alignSelf: 'center',
    width: 200,
    height: 110,
    resizeMode: 'contain',
  }
});

AppRegistry.registerComponent('GuestSiteScene', () => GuestSiteScene);
