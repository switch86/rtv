import React from "react";
import Issue from './Issue'

export default function IssueList(props) {

    const {issues} = props

    return (
        <div className="issueList">
            {issues.map(issue => <Issue {...issue} key={issue._id}/>)}
        </div>
    )
}