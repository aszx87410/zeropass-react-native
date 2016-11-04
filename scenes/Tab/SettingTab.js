import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  
} from 'react-native';

const settingList = [
  'Notification',
  'Accounts',
  'Password Mangager',
  'Others'
]

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class SettingTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(settingList)
    }
  }

  render() {


    const getRow = (data) => {
      return (
        <View style={styles.row}>
          <Text style={styles.text}>{data}</Text>
        </View>
      )
    }

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
    color: 'black',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa'
  },

  row: {
    backgroundColor: '#eee'
  }
});

AppRegistry.registerComponent('SettingTab', () => SettingTab);
