import { CHANNEL_DETAILS__FAILURE, CHANNEL_DETAILS__REQUEST, CHANNEL_DETAILS__SUCESSS, SET_SUBSCRIPTION_STATUS, SET_SUBS_STATUS } from "../actionTypes";

export const channelDetailsReducer = (prevState = 
    {
        loading: true,
        channel:{},
        subscriptionStatus:false
    },

     action
     
     ) => {
    
        const {type,payload} = action;

    switch(type) {
        case CHANNEL_DETAILS__REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case CHANNEL_DETAILS__SUCESSS:
            return {
                ...prevState,
                channel:payload,
                loading: false
            }

        case CHANNEL_DETAILS__FAILURE: 
            return {
                ...prevState,
                loading:false,
                channel:{},
                error:payload
                
            }

            case SET_SUBSCRIPTION_STATUS: 
             return {
                ...prevState,
                subscriptionStatus:payload
             }

        default:
            return prevState;
    }
}