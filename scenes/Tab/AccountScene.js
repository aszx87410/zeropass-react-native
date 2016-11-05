import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  Alert,
  Clipboard,
  TouchableOpacity,
  Linking
} from 'react-native';

//import Communications from 'react-native-communications';

import Spinner from 'react-native-loading-spinner-overlay';
import API from '../../API';
import store from '../../store';
import {getpassword} from '../../utils';

const settingList = [
  'facebook.com',
  'github.com',
  'yahoo.com',
  'garena.com'
]

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class AccountTab extends Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);

    this.state = {
      dataSource: ds.cloneWithRows([]),
      spinnerShow: false,
    }
  }

  // request for API
  async componentDidMount() {

    //Alert.alert('did mount');
    let domains = [];
    this.setState({
      spinnerShow: true
    });

    try {
      const response = await API.getInfo(store.getId());
      domains = response.domains;
      //Alert.alert(JSON.stringify(domains));
    } catch(err) {
      console.log(err);
    }

    this.setState({
      dataSource: ds.cloneWithRows(domains),
      spinnerShow: false
    })
  }

  onPress(data) {

    const {toNext} = this.props;

    //url
    let pwd = getpassword(store.getPassword(), data.domainname, data.changeID);
    Clipboard.setString(pwd);

    //Alert.alert(JSON.stringify(data));
    Alert.alert(
      data.domainname,
      'username:'+data.username,
      [
        {text: 'Open', onPress: () => {
          Linking.openURL('http://' + data.domainname).catch(err => console.error('An error occurred', err));
            //Communications.web('http://' + data.domainname);
        }},
        {text: 'Edit', onPress: () => {
          toNext(data);
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]
    )
  }

  render() {

    let that = this;

    const {spinnerShow} = this.state;

    const press = (data) => {
      return function(){
        that.onPress(data);
      }
    }

    const getRow = (data) => {
      return (
        <TouchableOpacity style={styles.row} onPress={press(data)}>
          <Text style={styles.text}>{data.domainname}</Text>
        </TouchableOpacity>
      )
    }

    //          <Spinner visible={spinnerShow} />


    return (
        <View style={styles.container}>
          <View style={{
            flex: 1,
          }}>
            <View style={styles.list}>
              <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(rowData) => getRow(rowData)} /> 
            </View>
            
          </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },

  list: {
    marginTop: 0,
    flex: 1
  },

  text: {
    fontSize: 20,
    color: '#48baeb',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa'
  },

  row: {
    backgroundColor: '#eee'
  }
});

AppRegistry.registerComponent('AccountTab', () => AccountTab);
