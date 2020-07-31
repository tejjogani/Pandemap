import React, { Component } from "react";
import { TabView, TabBar } from 'react-native-tab-view';
import { View, Text, Dimensions, StyleSheet } from "react-native";
import CategoryPage from './CategoryPage';

export default class LocationsTabView extends Component {
  constructor(props) {
    super(props);

    const summaryData = require('../../assets/sampleData/summary.json');

    var routes = []
    for (const locationGroup of summaryData) {
      routes.push({
        key: locationGroup.id,
        title: locationGroup.category
      })
    }
    
    this.state = {
      index: 0,
      routes: routes,
      renderScene: ({route}) => {
        return (
          <CategoryPage
            locations={summaryData[route.key]}
            showDetails={props.showDetails}
            toggleModal={props.toggleModal}
          />
        )
      }
    }
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.state.renderScene}
        onIndexChange={(index) => this.setState({index: index})}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={scrollingTopBar}
        style={{height: 600, flex: 1}}
      />
    );
  }
}
  
const scrollingTopBar = props => (
    <TabBar
        {...props}
        scrollEnabled={true}
        style={{backgroundColor: 'white'}}
        tabStyle={{padding: 13, width: 'auto'}}
        indicatorStyle={{ backgroundColor: 'royalblue'}}

        renderLabel={({ route, focused, color }) => (
          <Text style={{margin: 0, fontSize: 12, color: '#333'}}>
              {route.title}
          </Text>
        )}
    />
);