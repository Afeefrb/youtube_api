import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAILURE, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS } from "../actionTypes";

const initialState = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory:"All"
}

export const homeVideoReducer = (prevState = initialState, action) => {
    const {type,payload,nextPageToken} = action;

    switch(type) {
        case HOME_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading: true
            }
        
        case HOME_VIDEOS_SUCCESS:
            return {
                ...prevState,
                videos: 
                prevState.activeCategory === payload.category ? [...prevState.videos, ...payload.videos] : payload.videos , 
                nextPageToken: payload.nextPageToken,
                loading: false,
                activeCategory: payload.category
            }

        case HOME_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }

        default:
            return prevState;
    }
}

export const selectedVideoReducer = (prevState = 
    {
        loading: true,
        video: null
    },

     action
     
     ) => {
    
        const {type,payload} = action;

    switch(type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...prevState,
                video:payload,
                loading: false

            }

        case SELECTED_VIDEO_FAILURE: 
            return {
                ...prevState,
                loading:false,
                video: null,
                error:payload
                
            }

        default:
            return prevState;
    }
}


export const relatedVideosReducer = (prevState = 
    {
        loading: true,
        videos: []
    },

     action
     
     ) => {
    
        const {type,payload} = action;

    switch(type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case RELATED_VIDEO_SUCCESS:
            return {
                ...prevState,
                videos:payload,
                loading: false

            }

        case SELECTED_VIDEO_FAILURE: 
            return {
                ...prevState,
                loading:false,
                error:payload
                
            }

        default:
            return prevState;
    }
}

export const searchVideosReducer = (prevState = 
    {
        loading: true,
        videos: []
    },

     action
     
     ) => {
    
        const {type,payload} = action;

    switch(type) {
        case SEARCH_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case SEARCH_VIDEO_SUCCESS:
            return {
                ...prevState,
                videos:payload,
                loading: false

            }

        case SEARCH_VIDEO_FAIL: 
            return {
                ...prevState,
                loading:false,
                error:payload
                
            }

        default:
            return prevState;
    }
}

export const subscriptionsVideosReducer = (prevState = 
    {
        loading: true,
        videos: []
    },

     action
     
     ) => {
    
        const {type,payload} = action;

    switch(type) {
        case SUBSCRIPTIONS_CHANNEL_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case SUBSCRIPTIONS_CHANNEL_SUCCESS:
            return {
                ...prevState,
                videos:payload,
                loading: false

            }

        case SUBSCRIPTIONS_CHANNEL_FAIL: 
            return {
                ...prevState,
                loading:false,
                error:payload
                
            }

        default:
            return prevState;
    }
}