import { CHANNEL_DETAILS__FAILURE, CHANNEL_DETAILS__REQUEST, CHANNEL_DETAILS__SUCESSS, SET_SUBSCRIPTION_STATUS } from "../actionTypes"
import request from '../../axios'


export const getChannelDetails = (id) => async dispatch => {

    try {
        
        dispatch({
            type: CHANNEL_DETAILS__REQUEST
        })
    
        const {data} = await request("/channels", {
            params: {
                part: 'snippet, statistics, contentDetails',
                id
            }
        })
    
        dispatch({
            type: CHANNEL_DETAILS__SUCESSS,
            payload: data.items[0]
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:CHANNEL_DETAILS__FAILURE,
            payload: error.response.data
        })
    }



}

export const getChannelSubStatus = id => async (dispatch,getState) => {
    try {
        const {data} = await request("/subscriptions", {
            params: {
                part:"snippet",
                forChannelId:id,
           
            },
            headers: {
                Authorization: `Bearer ${getState().auth?.accessToken}` 
            }
        })

        dispatch({
            type: SET_SUBSCRIPTION_STATUS,
            payload: data.items.length !== 0

        })

        console.log(data);

    } catch (error) {
        console.log(error.response.data);
        
        
    }
}