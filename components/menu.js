import React, { Component } from 'react';
import { ListView } from 'react-native';

import Button from 'react-native-button';

var _navigate;
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Home', 'AnotherComponent'])
        });
    }

    _renderMenuItem(item) {
        return(
            <Button style={styles.menuItem} onPress={()=> this._onItemSelect(item)}>{item}</Button>
        );
    }

    _onItemSelect(item) {
        _navigate(item);
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(item) => this._renderMenuItem(item)}
            />
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF',
        top: 20
    },
    menuItem: {
        color: '#333',
        padding: 10,
        textAlign: 'left'
    }
}
