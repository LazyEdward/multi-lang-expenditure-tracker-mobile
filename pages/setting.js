import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Alert, BackHandler, NativeModules } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	getColor,
	getLanguage,
} from '../redux/reducer/setting'

import {
	setColor,
	setLanguage,
} from '../redux/action/setting'

import {
	setLoading
} from '../redux/action/loading'

import { persistor } from '../redux/store';

const Setting = ({ navigation }) => {

	const LANGUAGE = {
		ENGLISH: 'English',
		CHINESE: 'Chinese',
	}

	const COLORS = {
		BLUE: '#3f50b5',
		PINK: '#e65e79',
	}

	const dispatch = useDispatch();

	const {
		baseColor,
		language,
	} = useSelector(state => ({
		baseColor: getColor(state.setting),
		language: getLanguage(state.setting),
	}))

	const changeColor = (color) => {
		dispatch(setColor({color: color}));
	}

	const alertClearData = () => {
		Alert.alert(
			"Clear Data",
			"Are you sure to clear all data?",
			[
			  {
				text: "Cancel",
				onPress: () => console.log(),
				style: "cancel"
			  },
			  {
				text: "OK",
				onPress: async() => {
					dispatch(setLoading(true))

					persistor.purge().then(() => {
						NativeModules.DevSettings.reload();
					})
				},
				style: 'destructive'
			  }
			],
			{ cancelable: false }
		  );		
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scroll} keyboardShouldPersistTaps='always'>
				<View style={styles.blocksContainer}>
					<Text style={styles.text}>color</Text>
					<View style={styles.blocksContainer}>
						<TouchableHighlight style={[styles.blocks, { backgroundColor: COLORS.BLUE}]} underlayColor={COLORS.BLUE + 'CC'} onPress={() => changeColor(COLORS.BLUE)}>
							<Text/>
						</TouchableHighlight>
						<TouchableHighlight style={[styles.blocks, { backgroundColor: COLORS.PINK}]} underlayColor={COLORS.PINK + 'CC'} onPress={() => changeColor(COLORS.PINK)}>
							<Text/>
						</TouchableHighlight>
					</View>
				</View>
				<View style={styles.hr}/>
				<View style={styles.blocksContainer}>
					<Text style={styles.text}>Language</Text>
					<View style={styles.blocksContainer}>
						<TouchableHighlight style={{padding: 5, borderRadius: 5}} underlayColor={baseColor + 'CC'} onPress={() => alert('not implemented')}>
							<Text style={[styles.text, { color: baseColor }]}>{language}</Text>
						</TouchableHighlight>
					</View>
				</View>
				<View style={styles.hr}/>
				<TouchableHighlight style={{borderRadius: 5}} underlayColor={'#ffffff00'} onPress={() => alertClearData()}>
				<View style={styles.blocksContainer}>
						<Text style={styles.text}>Clear Data</Text>
				</View>
				</TouchableHighlight>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	hr: {
		marginTop: '5%',
		marginBottom: '5%',
		borderBottomColor: '#787878',
		borderBottomWidth: 1,
	},
	container: {
		flex: 1,
		paddingLeft: '5%',
		paddingRight: '5%',
		//   alignItems: 'center',
		// justifyContent: 'space-between',
	},
	scroll: {
		width: '100%',
		flex: 1,
	},	
	blocksContainer: {
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	blocks: {
		marginLeft: 10,
		width: 30,
		height: 30,
		borderRadius: 5
	},
	text: {
		color: '#787878',
		fontSize: 18
	}
  });

export default Setting;