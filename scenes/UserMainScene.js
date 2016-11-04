import React, { Component } from 'react';
import { View, StyleSheet, Image, BackAndroid } from 'react-native';
import { TabViewAnimated, TabBarTop, TabBar } from 'react-native-tab-view';

import HelpTab from './Tab/HelpTab';
import CreateTab from './Tab/CreateTab';
import SettingTab from './Tab/SettingTab';
import AccountTab from './Tab/AccountTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 10,
    alignSelf: 'center',
    resizeMode: 'center',
    marginTop: 30,
    marginBottom: 30
  },

  tab: {
    backgroundColor: '#48baeb',
  },

  icon: {
    width: 24,
    height: 24
  },

  label: {
    fontSize: 12,
    padding: 0,
    margin: 0
  }
});

const icons = {
  account: require('../img/icon_account.png'),
  edit: require('../img/icon_edit.png'),
  setting: require('../img/icon_setting.png'),
  help: require('../img/icon_help.png'),
}

export default class TabViewExample extends Component {

  constructor(props) {
    super(props);

  }

  state = {
    index: 0,
    routes: [
      { key: 'account', title: 'Account', icon: 'account'},
      { key: 'new', title: 'Create', icon: 'edit' },
      { key: 'setting', title: 'Setting', icon: 'setting' },
      { key: 'help', title: 'Help', icon: 'help' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderIcon = ({ route }) => {
    return (
      <Image
        source={icons[route.icon]}
        style={styles.icon}
        color='white'
      />
    );
  };

  _renderHeader = (props) => {
    return (
      <TabBar 
        renderIcon={this._renderIcon}
        tabStyle={styles.tab} 
        labelStyle={styles.label}
        {...props} />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'account':
        return <AccountTab />;
      case 'new':
        return <CreateTab />;
      case 'help':
        return <HelpTab />;
      case 'setting':
        return <SettingTab />;
      default:
        return null;
    }
  };

  render() {
    return (
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderFooter={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
    );
  }
}