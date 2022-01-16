import axiosService from '../utils/axiosService'

export const FETCH_NASA_POST = '@post/fetch-nasa';
export const RESET_NASA_DATA = '@post/reset-nasa';
export const IS_FETCHING = '@post/fetching';
export const IS_LOADING = '@post/loading';
export const SET_FETCH_SUCESS = '@post/fetch-nasa-sucess';

export const NASA_API = 'w7bxzmB1Bnh36v7pDamcnqjpcJ1HRWPaZHATWDI1';
export const NASA_BASE_URI = 'https://api.nasa.gov/planetary/apod'

export function setFetchSucess(boolean) {
    return async (dispatch) => {
        await dispatch({
            type: SET_FETCH_SUCESS,
            payload: boolean
        });
    };
}


export function resetNasaData() {
    return async (dispatch) => {
        await dispatch({
            type: RESET_NASA_DATA
        });
    };
}

export function setIsFetching(boolean) {

    return async (dispatch) => {
        await dispatch({
            type: IS_FETCHING,
            payload: boolean
        });
    };
}


export function setIsLoading(boolean) {

    return async (dispatch) => {
        await dispatch({
            type: IS_LOADING,
            payload: boolean
        });
    };
}

export function fetchNASA() {
    return async dispatch => {
        try {
            dispatch(resetNasaData());
            dispatch(setIsFetching(true));
            dispatch(setIsLoading(true));
            
            const response = await axiosService.sendRequest('get',
                NASA_BASE_URI,
                null,
                { "Content-Type": "application/json" },
                { api_key: NASA_API }
                )
            dispatch({
                type: FETCH_NASA_POST,
                payload: response
            });

            setTimeout(() => {
                dispatch({
                    type: SET_FETCH_SUCESS,
                    payload: false
                });
              }, 2000)

           
        } catch (error) {
            throw error;
        }
    };
}
