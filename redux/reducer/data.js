import {
	SET_DAY_ITEM,
	SET_DAY_ITEM_DONE,
	SET_EDIT,
	CANCEL_EDIT,
} from '../type'

const initState = {
	data: {},
	editing: false,
	loading: false,
}

export default Data = (state = initState, action) => {

	switch(action.type) {
		case SET_EDIT:
			return {...state, editing: true}
		case CANCEL_EDIT:
			return {...state, editing: false}
		case SET_DAY_ITEM:
			return {...state, loading: true}
		case SET_DAY_ITEM_DONE:
			return {...state, data: action.payload, loading: false, editing: false}
		default:
			return state
	}

}

export const getData = (state) => state.data;
export const getIsEditing = (state) => state.editing;
export const getDataLoading = (state) => state.loading;