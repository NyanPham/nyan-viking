import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetErrorsAndMessages, signUp } from '../../redux/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [error, setError] = useState('')

    const emailRef= useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, loading, error: signUpError } = useSelector(state => state.userStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (currentUser?.email) {
            dispatch(resetErrorsAndMessages())
            navigate('/')
        }
    }, [currentUser])
    console.log('rendering')
    function handleCreateAccount(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        if (passwordRef.current.value.length > 20 || passwordRef.current.value.length < 6 ) {
            return setError('Password must be between 6 and 20 in characters number')
        }
        setError('')
        dispatch(signUp(emailRef.current.value, passwordRef.current.value))
    }

    return (
        <div className="auth-page w-screen h-screen flex flex-col relative">
            <div className="py-7 px-24 flex justify-between">
                <h2 className="text-2xl font-semibold text-gray-100 tracking-wide">NyanViking</h2>
                <Link to="/login" className="auth-btn">Login</Link>
            </div>
            <div className="py-7 px-24 flex justify-center items-centere gap-7 grow">
                <div className="flex justify-center items-start flex-col w-2/3">
                    <h1 className="uppercase tracking-wide font-semibold text-4xl text-gray-100">Adventrous life in the wild</h1>
                    <p className="text-lg text-gray-100">Let's pack up and explore the nature</p>
                </div>
                <div className="flex justify-center items-center w-1/3">
                    <form className="form p-7 bg-gray-900 flex-col rounded-lg" onSubmit={handleCreateAccount}>
                        {error && <p className="py-2 px-3 font-semibold text-sm bg-red-300 text-red-600 mb-5">{error}</p>}
                        {signUpError && <p className="py-2 px-3 font-semibold text-sm bg-red-300 text-red-600 mb-5">{signUpError}</p>}
                        <div className='form-group'>
                            <label className="form-label" htmlFor='email'>Email:</label>
                            <input className="form-input" type="email" id="email" ref={emailRef} required />
                        </div>
                        <div className='form-group mt-5'>
                            <label className="form-label" htmlFor='password'>Password:</label>
                            <input className="form-input" type="password" id="password" ref={passwordRef} required />
                        </div>
                        <div className='form-group mt-5'>
                            <label className="form-label" htmlFor='passwordConfirm'>Confirm Password:</label>
                            <input className="form-input" type="password" id="passwordConfirm" ref={passwordConfirmRef} required />
                        </div>
                        <button className="submit-btn mt-7" type="submit">Create Account</button>
                        <p className='mt-5 w-4/5 mx-auto text-center text-white text-sm'>
                            By clicking 'Create Account' you agree to the 
                            <a className="text-emerald-500 ml-1 cursor-pointer hover:text-emerald-400 transition" href="#">NyanViking's terms</a>
                        </p>
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
