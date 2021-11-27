import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const DayListItem = ({value, setValue, onRemove, focus, onFocus, onBlur, borderColor}) => {

	const [isFocus, setIsFocus] = useState(false);
	
	useEffect(() => {
		if(isFocus === focus)
			return;
		setIsFocus(focus)
	}, [focus])

	return (
		<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
			<TextInput
				style={isFocus ? [styles.textInput, { borderColor: borderColor }] : styles.textInput}
				onFocus={(e) => {
					setIsFocus(true);
					if(onFocus)
						onFocus();
				}}
				onBlur={(e) => {
					setIsFocus(false);
					if(onBlur)
						onBlur();
				}}
				onChangeText={text => {
					setValue(text)
				}}
				autoFocus
				value={value}
			/>
			<TouchableOpacity style={styles.button} onPress={onRemove}>
				<Ionicons style={styles.iconButton} name="remove-circle" size={25} color={'#e83c3c'} />
			</TouchableOpacity>			
		</View>
	)
}

DayListItem.propTypes = {
	value: PropTypes.string,
	setValue: PropTypes.func,
	onRemove: PropTypes.func,
	focus: PropTypes.bool,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	borderColor: PropTypes.string
}

DayListItem.defaultProps = {
	value: '',
	setValue: null,
	onRemove: null,
	focus: false,
	onFocus: null,
	onBlur: null,
	borderColor: '#989898'
}

const styles = StyleSheet.create({
	textInput: {
		width: '80%',
		height: 40,
		borderColor: '#989898',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#fff',
		margin: 3,
		padding: 5
	},
	textInputFoucus: {
		borderColor: '#3f50b5',
	},
	iconButton: {
		margin: 5,
	}
  });

export default DayListItem;