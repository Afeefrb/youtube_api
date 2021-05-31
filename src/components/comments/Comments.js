import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getCommentListById } from '../../redux/actions/comment.action'
import Comment from '../comment/Comment'
import './_comments.scss'

const Comments = ({videoId, totalComments}) => {

    const [text, setText] = useState("");


    const handleComment= (e) => {
        e.preventDefault();
        if(text.length ===  0) return;
        dispatch(addComment(videoId,text));
        setText("");
    }

    const dispatch = useDispatch()

    const comments = useSelector(state => state.commentList.comments);

    const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet);

    useEffect(() => {
       dispatch(getCommentListById(videoId))
  
    },[dispatch, videoId])

    return (
        <div className="comments">
            <p>{totalComments} Comments</p>
            <div className="comments__form d-flex w-100 my-2">
                <img src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" alt=""
                className="rounded-circle mr-3" />
                <form className="d-flex flex-grow-1"
                onSubmit={handleComment} >

               <input
                  type="text"
                  className="flex-grow-1"
                  placeholder="Write a comment" 
                  value={text}
                  onChange={e => setText(e.target.value)} />

                <button className="border-0 p-2">Comment</button>

                </form>
            </div>

            <div className="comments__list">
                {
                    _comments?.map((comment,i) => (
                        <Comment comment={comment} key={i} />
                    ))
                }
            </div>
        </div>
    )
}

export default Comments
