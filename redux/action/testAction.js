
import {
	TEST
} from '../type'

export const setTest = ({test}) => {
	return {type: TEST, payload: test};
}