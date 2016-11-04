import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Alert,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import SiteScene from './SiteScene';
import PasswordScene from './PasswordScene';

export default class GuestSiteScene extends Component {

  constructor(props) {
    super(props);
    
    // 2 page
    this.state = {
      page: 1,
      site: ''
    }
  }

  goBack() {
    this.setState({
      page: 1
    })
  }

  toNext(site) {
    this.setState({
      ...this.state,
      page: 2,
      site
    })
  }

  render() {

    const { page, site } = this.state;

    return (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.back} onPress={this.goBack.bind(this)}>
              { page==2 ? ' ← ' : ' ' }
            </Text>
          </View>
          {page==1 && <SiteScene toNext={this.toNext.bind(this)}/>}
          {page==2 && <PasswordScene site={site}/>}
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

AppRegistry.registerComponent('GuestSiteScene', () => GuestSiteScene);
