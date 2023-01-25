import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../context/UserProvider'


export default function Auth() {

    const initInputs = { username: '', password: ''}

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {
        signup, 
        login, 
        errMsg,
        resetAuthErr
    } = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSignup = (e) => {
        e.preventDefault()
        signup(inputs)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(inputs)

    }

    const toggleForm = () => {
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <div>
            <h1 className='authTitle'>Peer Support</h1>
            <div className='authPage'>
                { !toggle ?
                    <>
                        <AuthForm 
                            handleChange={handleChange}
                            handleSubmit={handleLogin}
                            inputs={inputs}
                            btnText="Log In"
                            errMsg={errMsg}
                        />
                        <p className='loginToggle' onClick={toggleForm}>New User? Click here to register!</p>

                    </>
                    :
                    <>
                        <AuthForm 
                            handleChange={handleChange}
                            handleSubmit={handleSignup}
                            inputs={inputs}
                            btnText="Sign Up"
                            errMsg={errMsg}
                        />
                        <p className='loginToggle' onClick={toggleForm}>Already a member? Click here to log in!</p>
                    </>
                }   
            </div>
        </div>
    )
}