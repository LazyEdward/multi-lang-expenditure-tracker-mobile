import {
	SET_LOADING,
} from '../type'

let initState = {
	loading: false
}

export default Loading = (state = initState, action) => {

	switch(action.type) {
		case SET_LOADING:
			return {...state, loading: action.payload}
		default:
			return state
	}

}

export const getLoading = (state) => state.loading;