import request from '../../axios'
import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST,HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAILURE, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL } from '../actionTypes';

export const getPopularVideos = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST
        })

        const {data} = await request.get("/videos", 
            {
                params: {
                    part: "snippet,contentDetails,statistics",
                    chart: "mostPopular",
                    regionCode:"IN",
                    maxResults: 20,
                    pageToken:getState().homeVideos.nextPageToken,
                }
            }
        )

        console.log(data);
        //# data: {items: {contentDetails, snippet, statistics}}

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category:"All"
            }
        })

        
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message 
        })
        
    }
}


export const getVideoByCategory = (keyword) => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST
        })

        const {data} = await request.get("/search", 
            {
                params: {
                    part: "snippet",
                    maxResults: 20,
                    pageToken:getState().homeVideos.nextPageToken,
                    q: keyword,
                    type:"video"
                }
            }
        ) 

        console.log(data);
        //# data: {items: {contentDetails, snippet, statistics}}

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category:keyword
            }
        })

        
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message 
        })
        
    }
}

export const getVideoById = (id) => async dispatch => {
    try {
        dispatch({
            type: SELECTED_VIDEO_REQUEST
        })

        const {data} = await request("/videos", {
            params:{
                part:"snippet,statistics",
                id:id
            }
        })

        dispatch({
            type:SELECTED_VIDEO_SUCCESS,
            payload:data.items[0]
        })

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: SELECTED_VIDEO_FAILURE,
            payload:error.message
        })
    }
}

export const getRelatedVideos = (id) => async dispatch => {
    try {

        dispatch({
            type: RELATED_VIDEO_REQUEST
        })

        const {data} = await request("/search", {
            params:{
                part:"snippet",
                relatedToVideoId:id,
                maxResults:15,
                type:"video"
            }
        })

        dispatch({
            type:RELATED_VIDEO_SUCCESS,
            payload:data.items
        })

    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getVideoBySearch = (keyword) => async (dispatch) => {
    try {

        dispatch({
            type: SEARCH_VIDEO_REQUEST
        })

        const {data} = await request.get("/search", 
            {
                params: {
                    part: "snippet",
                    maxResults: 20,
                    q: keyword,
                    type:"video, channel"
                }
            }
        ) 

        console.log(data);
        //# data: {items: {contentDetails, snippet, statistics}}

        dispatch({
            type: SEARCH_VIDEO_SUCCESS,
            payload: data.items
        })

        
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: SEARCH_VIDEO_FAIL,
            payload: error.message 
        })
        
    }
}

export const getVideosBySubscriptions = () => async (dispatch,getState) => {
    try {

        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_REQUEST
        })

        const {data} = await request("/subscriptions", {
            params: {
                part:"snippet, contentDetails",
                mine:true
           
            },
            headers: {
                Authorization: `Bearer ${getState().auth?.accessToken}`
            }
        })

        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
            payload: data.items

        })

        console.log(data);

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: SUBSCRIPTIONS_CHANNEL_FAIL,
            payload: error.response.data
        })
        
        
    }
}