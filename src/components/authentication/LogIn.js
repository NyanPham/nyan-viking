import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, resetErrorsAndMessages } from '../../redux/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

export default function LogIn() {

    const emailRef= useRef()
    const passwordRef = useRef()
    const { currentUser, loading, error } = useSelector(state => state.userStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (currentUser?.email) {
            dispatch(resetErrorsAndMessages())
            navigate('/')
        }
    }, [currentUser])

    function handleLogIn(e) {
        e.preventDefault()

        dispatch(logIn(emailRef.current.value, passwordRef.current.value))
    }

    return (
        <div className="auth-page w-screen h-screen flex flex-col relative">
            <h2 className="text-2xl font-semibold text-gray-100 tracking-wide mt-28 text-center">Welcome Back!</h2>
            <div className="mt-8 flex justify-center items-start gap-7 grow">
                <div className="flex justify-center items-center w-1/3">
                    <form className="form p-7 bg-gray-900 flex-col rounded-lg w-4/5" onSubmit={handleLogIn}>
                        {error && <p className="error-alert">{error}</p>}
                        <div className='form-group'>
                            <label className="form-label" htmlFor='email'>Email:</label>
                            <input className="form-input" type="email" id="email" ref={emailRef} required />
                        </div>
                        <div className='form-group mt-5'>
                            <label className="form-label" htmlFor='password'>Password:</label>
                            <input className="form-input" type="password" id="password" ref={passwordRef} required />
                        </div>
                        <button className="submit-btn mt-7" type="submit">Log In</button>
                        <p className='mt-5 w-full mx-auto text-center text-white text-sm'>
                            Don't have an account?
                            <Link to="/signup" className="text-base text-emerald-500 ml-1 cursor-pointer hover:text-emerald-400 transition inline-block">Sign up</Link>
                        </p>
                        <Link to="/forgot-password" className="text-center text-base text-emerald-500 ml-1 cursor-pointer hover:text-emerald-400 transition block mt-2">Forgot Password?</Link>
                    </form>
                </div>
            </div>
            {loading && 
                <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-5xl text-sky-500"/>
                </div>}
        </div>
    )
}
