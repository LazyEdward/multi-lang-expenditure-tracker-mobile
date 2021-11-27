import {
	SET_COLOR,
	SET_LANGUAGE,
	SET_DEFAULT_VIEW
} from '../type'

const DEFAULT_VIEWS = {
	"Day": "Day",
	"Month": "Month",
	"Year": "Year",
	"Setting": "Setting"
}

let initState = {
	color: '#3f50b5',
	language: 'English',
	defaultView: DEFAULT_VIEWS.Day
}

export default Setting = (state = initState, action) => {

	switch(action.type) {
		case SET_COLOR:
			return {...state, color: action.payload}
		case SET_LANGUAGE:
			return {...state, language: action.payload}
		case SET_DEFAULT_VIEW:
			return {...state, defaultView: action.payload}
		default:
			return state
	}

}

export const getColor = (state) => state.color;
export const getLanguage = (state) => state.language;
export const getDefaultView = (state) => state.defaultView;