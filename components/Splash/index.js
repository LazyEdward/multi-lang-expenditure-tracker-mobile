import React from 'react';
import { useSelector } from 'react-redux';

import { StyleSheet, View, Image } from 'react-native';

import {
	getColor
} from '../../redux/reducer/setting'

const Splash = () => {
	const {
		baseColor
	} = useSelector(state => ({
		baseColor: getColor(state.setting)
	}))

	return (
		<View style={[styles.backgroundSplash, { backgroundColor: baseColor}]}>
			<Image style={styles.splashImage} source={require('../../assets/logo.png')} />
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundSplash: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'flex-start',
	  backgroundColor: '#3f50b5',
	},
	splashImage: {
	  top: '10%',
	  width: '55%',
	  height: '55%',
	  resizeMode:'contain'
	}
});

export default Splash;