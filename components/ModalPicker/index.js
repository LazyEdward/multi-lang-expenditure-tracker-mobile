import React from 'react';
import PropTypes from 'prop-types';
import ModalSelector from 'react-native-modal-selector'
import { TextInput, StyleSheet } from 'react-native';

const ModalPicker = ({options, defaultValue, onSelect, textStyle, color, haveCancel}) => {

	const getTextValue = (value) => {
		if(options.length < 1)
			return "";

		let index = options.findIndex(option => option.key === value);

		if(index === -1)
			return "";

		return options[index].label;
	}

	return (
		<ModalSelector
			data={options}
			selectedKey={defaultValue}
			onChange={(option) => onSelect(option.key)}
			animationType="fade"
			selectStyle={{borderWidth: 0}}
			overlayStyle={{ flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
			optionTextStyle={{color: color, fontSize: 18}}
			cancelTextStyle={{color: '#ff0000', fontSize: 18}}
			optionContainerStyle={{backgroundColor: '#ffffff'}}
			cancelContainerStyle={{backgroundColor: '#ffffff', borderRadius: 5}}			
		>
			<TextInput style={{color: color, fontSize: 18}}>{getTextValue(defaultValue)}</TextInput>
		</ModalSelector>
	)

}

const styles = StyleSheet.create({
	backgroundSplash: {
	  position: 'absolute',
	  flex: 1,
	//   zIndex: 1,
	  top: 0, left: 0, right: 0, bottom: 0,
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: 'rgba(0,0,0,0.7)',
	}
});

ModalPicker.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	defaultValue: PropTypes.string,
	textStyle: PropTypes.object,
	color: PropTypes.string,
	onSelect: PropTypes.func
}

ModalPicker.defaultProps = {
	options: [],
	defaultValue: "",
	textStyle: {},
	color: "#787878",
	onSelect: () => {}
}

export default ModalPicker;