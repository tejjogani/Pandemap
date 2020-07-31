import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet'
import LocationsTabView from './LocationsTabView';
import DetailsSheet from './DetailsSheet';

export default class LocationsBottomSheet extends Component {
    constructor(props) {
      super(props);
      this.mainSheetRef = React.createRef();
      this.detailsSheetRef = React.createRef();
      this.updateRoute = props.updateRoute;
      this.toggleModal = props.toggleModal;

      this.state = {
        showDetails: false,
        details: {},
      }
    }
    
    renderInner = () => (
      <View style={styles.panel}>
        <LocationsTabView 
          showDetails={this.showDetails}
          toggleModal={this.toggleModal}
        />
      </View>
    )
  
    showDetails = (details) => {
      this.setState({showDetails: true});
      this.setState({details: details});
      this.updateRoute(details.route);

      this.detailsSheetRef.current.snapTo(1);
    }

    renderDetailsView = () => {
      if (this.state.showDetails) {
        return (
          <DetailsSheet details={this.state.details} />
        )
      }
    }
  
    renderHeader = () => (
      <View style={styles.panelHeader}>
        <View style={styles.pullIcon} />
      </View>
    )
  
    fall = new Animated.Value(1)
  
    render() {
      return (
        <>
          <View style={styles.sheetContainer}>
            <BottomSheet
              ref={this.mainSheetRef}
              snapPoints={[65, 300, viewportHeight - 210]}
              renderContent={this.renderInner}
              renderHeader={this.renderHeader}
              enabledInnerScrolling={false}
              initialSnap={1}
              enabledBottomInitialAnimation={true}
            />
            <Animated.View
              style={{
                alignItems: 'center',
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
              }}
            >
            </Animated.View>
          </View>
  
          <View style={styles.sheetContainer}>
            <BottomSheet
              ref={this.detailsSheetRef}
              snapPoints={[0, 199, 365]}
              renderContent={this.renderDetailsView}
              renderHeader={this.renderHeader}
              initialSnap={0}
              enabledBottomInitialAnimation={true}
              onOpenStart={() => this.mainSheetRef.current.snapTo(0)}
              onCloseEnd={() => {
                this.updateRoute();
                this.mainSheetRef.current.snapTo(1);
              }}
              callbackThreshold={0.5}
            />
            <Animated.View
              style={{
                alignItems: 'center',
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
              }}
            >
            </Animated.View>
          </View>
        </>
      )
    }
}

const viewportHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    sheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 1,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    panel: {
        height: viewportHeight - 175, //Dimensions.get('window').height * 0.7,
        padding: 0,
        backgroundColor: '#fff', 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
        // shadowColor: '#000000',
        // shadowOffset: { width: 0, height: -13 },
        // shadowRadius: 7,
        // shadowOpacity: 0.07,
        height: 5,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    pullIcon: {
        height: 4,
        width: 50,
        backgroundColor: 'rgb(223, 227, 240)',
        borderRadius: 50
    },
});