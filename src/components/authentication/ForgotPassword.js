import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetErrorsAndMessages, resetPassword } from '../../redux/actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom'

export default function ForgotPassword() {

    const emailRef= useRef()
    const { loading, error, message } = useSelector(state => state.userStatus)
    const dispatch = useDispatch()

    function handleResetPassword(e) {
        e.preventDefault()

        dispatch(resetPassword(emailRef.current.value))
    }

    return (
        <div className="auth-page w-screen h-screen flex flex-col relative">
            <h2 className="text-2xl font-semibold text-gray-100 tracking-wide mt-28 text-center">NyanViking</h2>
            <div className="mt-8 flex justify-center items-start gap-7 grow">
                <div className="flex justify-center items-center w-1/3">
                    <form className="form p-7 bg-gray-900 flex-col rounded-lg w-4/5" onSubmit={handleResetPassword}>
                        {error && <p className="py-2 px-3 font-semibold text-sm bg-red-300 text-red-600 mb-5">{error}</p>}
                        {message && <p className="py-2 px-3 font-semibold text-sm bg-green-300 text-green-600 mb-5">{message}</p>}
                        <div className='form-group'>
                            <label className="form-label" htmlFor='email'>Email:</label>
                            <input className="form-input" type="email" id="email" ref={emailRef} required />
                        </div>
                        <button className="submit-btn mt-7" type="submit">Reset Password</button>
                        <p className='mt-5 w-full mx-auto text-center text-white text-sm'>
                            Have your password?
                            <Link to="/login" className="text-base text-emerald-500 ml-1 cursor-pointer hover:text-emerald-400 transition inline-block">Log In</Link>
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
