import {
	SET_LOADING,
	RESET
} from '../type'

const initState = {
	loading: false,
	reset: false,
}

export default Loading = (state = initState, action) => {

	switch(action.type) {
		case SET_LOADING:
			return {...state, loading: action.payload}
		case RESET:
			return {...state, loading: action.payload, reset: action.payload}
		default:
			return state
	}

}

export const getLoading = (state) => state.loading;
export const getReset = (state) => state.reset;