import {
	SET_DAY_ITEM,
	SET_DAY_ITEM_DONE,
} from '../type'

let initState = {
	data: {},
	loading: false,
}

export default Data = (state = initState, action) => {

	switch(action.type) {
		case SET_DAY_ITEM:
			return {...state, loading: true}
		case SET_DAY_ITEM_DONE:
			return {...state, data: action.payload, loading: false}
		default:
			return state
	}

}

export const getData = (state) => state.data;
export const getDataLoading = (state) => state.loading;