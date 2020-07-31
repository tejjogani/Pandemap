import React from "react";
import { View, StyleSheet} from "react-native";

export default CrowdingIndicator = ({crowdingLevel}) => {
    var color = '#ec483f';
    if (crowdingLevel <= 0.33) {
      color = '#65d974';
    } else if (crowdingLevel <= 0.66) {
      color = '#f8cd46';
    }
  
    return (
        <View style={styles.container}>
          <View style={{backgroundColor: color, flex: crowdingLevel}} />
          <View style={{backgroundColor: '#f0f0f0', flex: 1 - crowdingLevel}} />
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 6,
        borderRadius: 10,
        overflow: 'hidden'
    }
});