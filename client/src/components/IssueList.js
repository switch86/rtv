import React from "react";
import Issue from './Issue'
import {useContext} from "react"
import IssueProvider from "../context/IssueProvider";

export default function IssueList(props) {

    const {issues} = props

    return (
        <div className="issueList">
            {issues.map(issue => <Issue {...issue} key={issue._id}/>)}
        </div>
    )
}