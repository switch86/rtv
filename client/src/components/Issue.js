import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { IssueContext } from "../context/IssueProvider";
import { useLocation } from 'react-router-dom'

export default function Issue(props) {

    const {user} = useContext(UserContext)
    const {updateIssue, deleteIssue} = useContext(IssueContext)

    const location = useLocation()

    const {
        title,
        description,
        _id,
        comments,
        upVotes,
        downVotes
    } = props

    const [comment, setComment] = useState('')
    const [commentsToggle, setCommentsToggle] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        updateIssue(_id, {comments: [...comments, {text: comment, username: user.username}]})
        setComment('')
    }

    const isProfilePage = location.pathname.includes('profile')


    return (
        <div className="issueAndComments">
            <div className="issueControls">
                {isProfilePage && <button className='deleteButton' onClick={()=> deleteIssue(_id)}>X</button>}
                <div className="votes">
                    <span onClick={() => updateIssue(_id, {upVoting: true, userId: user._id})}><FontAwesomeIcon icon={faThumbsUp} /></span>
                    <h3>{upVotes.length - downVotes.length}</h3>
                    <span onClick={() => updateIssue(_id, {downVoting: true, userId: user._id})}><FontAwesomeIcon icon={faThumbsDown} /></span>
                </div>
            </div>
            <div className="issue">
                <h1>{title}</h1>
                <h3>{description}</h3>
            </div>
                <p className="commentsToggle" onClick={() => setCommentsToggle(prevState => !prevState)}>Comments</p>
            <div className="commentsCenter">
                {commentsToggle && <div className="comments">
                    {comments.map((comment, index) => <p key={index}>@{comment.username}: {comment.text}</p>)}
                    
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text' 
                            name='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Comment'
                        />
                        <button>Add Comment</button>
                    </form>
                    </div>}
                </div>
            </div>
    )
}