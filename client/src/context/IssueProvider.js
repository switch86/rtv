import React, { useState } from "react";
import axios from 'axios'

export const IssueContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function IssueProvider(props) {

    const [allIssues, setAllIssues] = useState([])
    const [userIssues, setUserIssues] = useState([])

    const getAllIssues = () => {
            userAxios.get('/api/issues/')
            .then(res => {
                setAllIssues([...res.data])
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    const getUserIssues = () => {
            userAxios.get('/api/issues/user')
            .then(res => setUserIssues([...res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    const addIssue = (newIssue) => {
        userAxios.post('/api/issues/', newIssue)
            .then(res => {
                setUserIssues(prevState => ([...prevState, res.data]))
                setAllIssues(prevState => ([...prevState, res.data]))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    const updateIssue = (issueId, updates) => {
        userAxios.put(`/api/issues/${issueId}`, updates)
            .then(res => {
                getAllIssues()
                getUserIssues()
            })
            .catch(err => console.log(err))
    }

    const deleteIssue = (issueId) => {
        userAxios.delete(`/api/issues/${issueId}`)
            .then(res => {
                getAllIssues()
                getUserIssues()
            })
            .catch(err => console.log(err))
    }


    return (
        <IssueContext.Provider value={{
            getAllIssues,
            getUserIssues,
            allIssues,
            userIssues, 
            addIssue, 
            updateIssue,
            deleteIssue
        }}
        >
            {props.children}
        </IssueContext.Provider>
    )
}