import { Navigation } from "react-native-navigation";
import React from "react";
import {StyleSheet, Text, TouchableOpacity } from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const navigationOptions = {
	component: {
		name: 'SearchMenu',
		options: {
			animations: {
				push: {
					content: {
						alpha: {
							from: 0,
							to: 1,
							duration: 300
						}
					}
				},
				pop: {
					content: {
						alpha: {
							from: 0,
							to: 1,
							duration: 300
						}
					}
				}
			}
		}																							
	}
}

// search button displayed on explore screen
export default SearchBar = (props) => {
		return (
			<TouchableOpacity 
				style={[styles.searchBox, styles.searchShadow]} 
				onPress={() => Navigation.push(props.parentId, navigationOptions)} 
			>
				<Text style={styles.searchPlaceholder}>Where to?</Text>
				<Icon name="ios-search" size={22} color="#2962FF" style={styles.searchIcon}/>

			</TouchableOpacity>
		)
}

const styles = StyleSheet.create({
	searchBox: {
        height: 45,
        width: '90%',
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 10,
        top: 55,
        alignSelf: 'center',
		borderRadius: 7,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	searchShadow: {
		shadowColor: '#00000099',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 2,
		shadowOpacity: 5,
	},
	searchPlaceholder: {
		fontSize: 15,
		color: 'grey',
		padding: 15,
        paddingLeft: 16,
	},
	searchIcon: {
		paddingRight: 18,
		paddingTop: 11
	}
});