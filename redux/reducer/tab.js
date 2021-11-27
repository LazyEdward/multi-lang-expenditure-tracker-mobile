import {
	SET_TAB,
	SET_TAB_VALUE
} from '../type'

import DateUtils from '../../utils/DateUtils'

let initState = {
	tab: 'Day',
	day: DateUtils.today.getDate(),
	month: DateUtils.today.getMonth() + 1,
	year: DateUtils.today.getFullYear()
}

export default Tab = (state = initState, action) => {

	switch(action.type) {
		case SET_TAB:
			return {...state, tab: action.payload}
		case SET_TAB_VALUE:
			return {
				...state,
				day: action.payload.day,
				month: action.payload.month, 
				year: action.payload.year, 
			}
		default:
			return state
	}

}

export const getTab = (state) => state.tab;
export const getDay = (state) => state.day;
export const getMonth = (state) => state.month;
export const getYear = (state) => state.year;