import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import AccountScene from './AccountScene';
import AccountPasswordScene from './AccountPasswordScene';

export default class AccountTab extends Component {

  constructor(props) {
    super(props);
    
    // 2 page
    this.state = {
      page: 1,
      data: {}
    }
  }

  goBack() {
    this.setState({
      page: 1
    })
  }

  toNext(data) {
    this.setState({
      ...this.state,
      page: 2,
      data
    })
  }

  render() {

    const { page, data } = this.state;

    return (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.back} onPress={this.goBack.bind(this)}>
              { page==2 ? ' ← ' : ' ' }
            </Text>
          </View>
          {page==1 && <AccountScene key={parseInt(Math.random()*999)} toNext={this.toNext.bind(this)}/>}
          {page==2 && <AccountPasswordScene data={data}/>}
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

  top: {
    height: 40, 
    backgroundColor: '#48baeb'
  },

  back: {
    color: 'white',
    fontSize: 30
  }
});

AppRegistry.registerComponent('AccountTab', () => AccountTab);
