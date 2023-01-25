import React, { useState } from "react";

export default function IssueForm(props) {

    const initInputs = {
        title: '',
        description: ''
    }

    const [inputs, setInputs] = useState(initInputs)
    const {addIssue} = props

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }

    const {title, description} = inputs

    return (
        <form className='profileIssueForm' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title" className="titleLabel">Title: </label>
                <input 
                    className="titleInput"
                    name='title'
                    value={title}
                    onChange={handleChange}
                    placeholder="What's the headline?"
                />
            </div>
                <label className="descriptionLabel" htmlFor="description">Description: </label>
            <div>
                <input 
                    className="descriptionInput"
                    name='description'
                    value={description}
                    onChange={handleChange}
                    placeholder='Tell us more about the issue - we need the juicy details!'
                    />
            </div>
            <button>Add Issue</button>
        </form>
    )
}