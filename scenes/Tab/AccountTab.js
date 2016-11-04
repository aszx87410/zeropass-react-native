import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableOpacity
} from 'react-native';

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
      dataSource: ds.cloneWithRows(settingList)
    }
  }

  onPress(data) {
    //url
  }

  render() {

    let that = this;

    const press = (data) => {
      return function(){
        that.onPress(data);
      }
    }

    const getRow = (data) => {
      return (
        <TouchableOpacity style={styles.row} onPress={press(data)}>
          <Text style={styles.text}>{data}</Text>
        </TouchableOpacity>
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
