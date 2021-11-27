import {
	SET_TAB,
	SET_TAB_VALUE
} from '../type'

export const setTab = ({tab}) => {
	return {type: SET_TAB, payload: tab}
}

export const setDate = (date) => {
	return {
		type: SET_TAB_VALUE,
		payload: {
			day: date.day,
			month: date.month, 
			year: date.year,
		}
	}
}