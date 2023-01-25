import React, { useContext } from "react";
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import { UserContext } from "../context/UserProvider";
import { IssueContext } from "../context/IssueProvider";

export default function Profile() {

    const {user: {username}} = useContext(UserContext)
    const {addIssue, userIssues} = useContext(IssueContext)

    return (
        <div className="profile">
            <h1 className="profileName">Welcome @{username}!</h1>
            <div className="profileAddIssue">
                <h3>Get Advice</h3>
                <IssueForm addIssue={addIssue}/> 
            </div>
            <div className="profilePastIssues">
                <h2 className="profileIssuesTitle">Past Issues</h2>
                <IssueList issues={userIssues}/>
            </div>
        </div>
    )
}