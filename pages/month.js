import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

const Month = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text>month</Text>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  alignItems: 'center',
	  justifyContent: 'flex-start',
	},
  });

export default Month;