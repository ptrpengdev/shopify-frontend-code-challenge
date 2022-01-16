import {
    FETCH_NASA_POST,
    IS_FETCHING,
    IS_LOADING,
    RESET_NASA_DATA,
    SET_FETCH_SUCESS
} from '../actions/postActions';

const initialState = {
    nasaData: null,
    fetching: false,
    loading: false,
    fetchSucess: false
};


const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_FETCH_SUCESS: {
            const payload = action.payload;
            return {
                ...state,
                fetchSucess: payload
            }
        }
        
        case RESET_NASA_DATA: {
            return {
                ...state,
                nasaData: null
            }
        }

        case FETCH_NASA_POST: {
            const payload = action.payload
            return {
                ...state,
                nasaData: payload,
                fetching: false,
                loading: false,
                fetchSucess: true
            }
        }
        case IS_FETCHING: {
            const payload = action.payload;
            return {
                ...state,
                fetching: payload
            }
        }
        case IS_LOADING: {
            const payload = action.payload;
            return {
                ...state,
                loading: payload
            }
        }
        default: {
            return state;
        }
    }
};

export default postReducer;