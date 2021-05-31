import request from "../../axios"
import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../actionTypes"

export const getCommentListById = id => async dispatch => {
    try {
        dispatch({
            type: COMMENT_LIST_REQUEST
        })

    const {data} = await request("/commentThreads", {
        params: {
            part:"snippet",
            videoId:id
        }
    })

    dispatch({
        type:COMMENT_LIST_SUCCESS,
        payload: data.items
    })

        
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:COMMENT_LIST_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const addComment = (id,text) => async (dispatch, getState) => {
    try {

        console.log("Comment: ",text)

        const obj = {
            snippet: {
                videoId: id,
                topLevelComment: {
                    snippet: {
                        originalText:text
                    }
                }
            }
        }
        
        await request.post('/commentThreads', obj, {
        params: {
            part:'snippet',
        },
        headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`
        }
        
    })

    dispatch({
        type:CREATE_COMMENT_SUCCESS,
 
    })

    dispatch(getCommentListById(id))

        
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:CREATE_COMMENT_FAIL,
            payload: error.response.data.message
        })
        
    }
}