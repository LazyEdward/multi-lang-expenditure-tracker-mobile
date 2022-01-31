import React from 'react';
import { useSelector } from 'react-redux';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import {
	getColor
} from '../../redux/reducer/setting'

const Loading = () => {
	const {
		baseColor
	} = useSelector(state => ({
		baseColor: getColor(state.setting)
	}))

	return (
		<View style={styles.backgroundSplash}>
			<ActivityIndicator size='large' style={styles.loadingCircle} color={baseColor}/>
		</View>
	)
}

const styles = StyleSheet.create({
	backgroundSplash: {
	  position: 'absolute',
	  flex: 1,
	  zIndex: 1,
	  top: 0, left: 0, right: 0, bottom: 0,
	  alignItems: 'center',
	//   justifyContent: 'flex-start',
	  justifyContent: 'center',
	  backgroundColor: '#4e4e4eaa',
	},
	loadingCircle: {
		transform: [{scale: 2}]
	}
});

export default Loading;