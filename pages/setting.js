import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView, Alert, BackHandler, NativeModules } from 'react-native';
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

import ModalPicker from '../components/ModalPicker'

import { persistor } from '../redux/store';
import { useTranslation } from 'react-i18next';

const Setting = ({ navigation }) => {

	const LANGUAGE = [
		{key: 'English', label: 'English'},
		{key: 'Chinese', label: '中文'}
	]

	const COLORS = {
		BLUE: '#3f50b5',
		PINK: '#e65e79',
	}

	const { t } = useTranslation();
	const dispatch = useDispatch();

	const {
		baseColor,
		language,
	} = useSelector(state => ({
		baseColor: getColor(state.setting),
		language: getLanguage(state.setting),
	}))

	const getLanguageLabel = (language) => {
		let index = LANGUAGE.findIndex(lang => lang.key === language);

		if(index === -1)
			return "";

		return LANGUAGE[index].label;
	}

	const changeColor = (color) => {
		dispatch(setColor({color: color}));
	}

	const changeLanguage = (language) => {
		dispatch(setLanguage({language: language}));
	}

	const alertClearData = () => {
		Alert.alert(
			t("SETTING:CLEAR_DATA_WARNING"),
			t("SETTING:CLEAR_DATA_WARNING_MSG"),
			[
			  {
				text: t("UTILS:CANCEL"),
				style: "cancel"
			  },
			  {
				text: t("UTILS:OK"),
				onPress: () => {
					// https://github.com/rt2zz/redux-persist/issues/1015
					dispatch(setLoading(true));

					persistor.pause();
					persistor.flush().then(() => {
						persistor.purge().then(() => {
							NativeModules.DevSettings.reload();
						})
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
					<Text style={styles.text}>{t("SETTING:COLOR")}</Text>
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
					<Text style={styles.text}>{t("SETTING:LANGUAGE")}</Text>
					<View style={styles.blocksContainer}>
						<ModalPicker
							options={LANGUAGE}
							defaultValue={language}
							onSelect={changeLanguage}
							textStyle={styles.text}
							color={baseColor}
						>
							<TextInput style={{color: baseColor, fontSize: 18}}>{getLanguageLabel(language)}</TextInput>
						</ModalPicker>
					</View>
				</View>
				<View style={styles.hr}/>
				<TouchableHighlight style={{borderRadius: 5}} underlayColor={'#ffffff00'} onPress={() => alertClearData()}>
				<View style={styles.blocksContainer}>
						<Text style={styles.text}>{t("SETTING:CLEAR_DATA_WARNING")}</Text>
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
		backgroundColor: '#fff',
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