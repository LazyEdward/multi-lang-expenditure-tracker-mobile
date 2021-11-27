import {
	SET_COLOR,
	SET_LANGUAGE,
	SET_DEFAULT_VIEW
} from '../type'

export const setColor = ({color}) => {
	return {type: SET_COLOR, payload: color}
}

export const setLanguage = ({language}) => {
	return {type: SET_LANGUAGE, payload: language}
}

export const setDefaultView = ({defaultView}) => {
	return {type: SET_DEFAULT_VIEW, payload: defaultView}
}