import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import CrowdingIndicator from './CrowdingIndicator';

const shortenDescription = (str) => {
  var charCount = 0;
  for (i=0; i<str.length; i++) {
    if (i > 130 && str[i] == ' ') {
      return str.slice(0, i);
    }
  }
} 

export default DetailsSheet = ({details}) => {

    return (
        <View style={[styles.detailsPanel, styles.detailsWrapper]}>
          <Text style={styles.detailsHeading}>{details.name}</Text>
          <View style={styles.summaryWrapper}>
            <Image
              style={styles.locationImage}
              source={{
                uri: details.img_url,
              }}
            />
            <View style={styles.infoWrapper}>
              <Text style={styles.summary}>
                {
                  details.category + ' · ' 
                  + details.distance + ' · ' 
                  + details.crowding * 100 + '% full'
                }
              </Text>
              <CrowdingIndicator crowdingLevel={details.crowding} />
              
              <Text style={styles.description}>
                {shortenDescription(details.description) + ' [see more on Yelp]'}
              </Text>
            </View>
          </View>
          <Text style={styles.crowdingHeader}>Crowding by time</Text>
          <View style={styles.crowdingWrapper}>
            <View style={styles.crowdingTimeWrapper}>
              <Text style={styles.crowdingTime}>12am</Text>
              <Text style={styles.crowdingTime}>2am</Text>
              <Text style={styles.crowdingTime}>4am</Text>
              <Text style={styles.crowdingTime}>6am</Text>
              <Text style={styles.crowdingTime}>8am</Text>
              <Text style={styles.crowdingTime}>10am</Text>
              <Text style={styles.crowdingTime}>12pm</Text>
              <Text style={styles.crowdingTime}>2pm</Text>
              <Text style={styles.crowdingTime}>4pm</Text>
              <Text style={styles.crowdingTime}>6pm</Text>
              <Text style={styles.crowdingTime}>8pm</Text>
              <Text style={styles.crowdingTime}>10pm</Text>
            </View>
              {details.crowdingDetails.map((week, weekKey) => {
                  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                  
                  return (
                    <View style={styles.crowdingRow} key={weekKey}>
                      <Text style={styles.dayName}>{days[weekKey]}</Text>
                      {week.map((crowdingValue, key) => {
                        
                        // color of the box
                        var color = '#2f5ec4';

                        if (crowdingValue == 0.0) {
                          color = '#EBEDEF';
                        } else if (crowdingValue <= 0.25) {
                          color = '#93d5ed';
                        } else if (crowdingValue <= 0.5) {
                          color = '#45a5f5';
                        } else if (crowdingValue <= 0.75) {
                          color = '#4285f4';
                        }

                        const today = new Date();
                        var borderWidth = 0;
                        if (weekKey == today.getDay() && key == today.getHours()) {
                          borderWidth = 2;
                        }

                        return (
                          <View 
                            style={[
                              styles.crowdingBox,
                              {
                                backgroundColor: color,
                                borderWidth: borderWidth
                              }
                            ]} 
                            key={key}
                          />
                        );
                      })}
                    </View>
                  );
              })}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsPanel: {
        height: 350,
        padding: 0,
        backgroundColor: '#fff', 
      },
      detailsWrapper: {
        padding: 15
      },
      detailsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
      },
      locationImage: {
        height: 100,
        width: 100,
        borderRadius: 7,
      },
      summaryWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15
      },
      summary: {
        color: '#777',
        marginBottom: 10
      },
      infoWrapper: {
        flex: 1,
        paddingHorizontal: 10 
      },
      description: {
        fontSize: 12,
        color: '#333',
        marginTop: 10
      },
      crowdingWrapper: {
        flex: 1,
        height: 80,
        marginBottom: 5
      },
      crowdingTimeWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 24
      },
      crowdingTime: {
        fontSize: 9,
        color: '#444',
        width: 26
      },
      dayName: {
        fontSize: 10,
        width: 24,
        color: '#444'
      },
      crowdingHeader: {
        marginBottom: 5,
        color: '#333',
        fontWeight: '600'
      },
      crowdingRow: {
        flex: 1,
        flexDirection: 'row'
      },
      crowdingBox: {
        height: 12,
        width: 11,
        margin: 1,
        borderColor: 'crimson',
      }
});