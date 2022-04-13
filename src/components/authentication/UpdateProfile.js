import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { confirmAccount, logIn, logOut, userUpdateProfileInfo } from '../../redux/actions/userActions'

export default function UpdateProfile() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [passwordMatchError, setPasswordMatchError] = useState('')
    const [confirmOpen, setConfirmOpen] = useState(false)

    const updateFormRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const displayNameRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()

    const accountConfirmEmailRef = useRef()
    const accountConfirmPasswordRef = useRef()

    const { currentUser, error, accountConfirmed, loading, errors, messages } = useSelector(state => state.userStatus)
    const dispatch = useDispatch()


    const STEPS = [
        {
            groups: [
                {
                    label: 'Email',
                    for: 'email',
                    type: 'email',
                    ref: emailRef,
                    placeholder: '',
                    defaultValue: currentUser?.email
                },
                {
                    label: 'Password',
                    for: 'password',
                    type: 'password',
                    ref: passwordRef,
                    placeholder: 'Leave blank to keep the same'
                },
                {
                    label: 'Confirm Password',
                    for: 'passwordConfirm',
                    type: 'password',
                    ref: passwordConfirmRef,
                    placeholder: 'Leave blank to keep the same'
                }
            ],
            buttons: [
                {
                    type: 'button', 
                    className: 'auth-btn',
                    text: 'next', 
                    action: 'next'
                }
            ]
        },
        {
            groups: [
                {
                    label: 'First Name',
                    for: 'first-name',
                    type: 'text',
                    ref: firstNameRef,
                    placeholder: '',
                    defaultValue: null
                },
                {
                    label: 'Last Name',
                    for: 'last-name',
                    type: 'text',
                    ref: lastNameRef,
                    placeholder: '',
                    defaultValue: null
                },
                {
                    label: 'Display Name',
                    for: 'display-name',
                    type: 'text',
                    ref: displayNameRef,
                    placeholder: '',
                    defaultValue: currentUser?.displayName
                }
            ],
            buttons: [
                {
                    type: 'button',
                    className: 'auth-btn',
                    text: 'Previous',
                    action: 'previous'
                },
                {
                    type: 'button',
                    className: 'auth-btn',
                    text: 'Next',
                    action: 'next'
                }
            ]
        },
        {
            groups: [
                {
                    label: 'Address',
                    for: 'address',
                    type: 'text',
                    ref: addressRef,
                    placeholder: '',
                    defaultValue: null
                },
                {
                    label: 'Phone Number',
                    for: 'phone',
                    type: 'tel',
                    ref: phoneRef,
                    placeholder: '',
                    defaultValue: null
                }
            ],
            buttons: [
                {
                    type: 'button',
                    className: 'auth-btn',
                    text: 'Previous',
                    action: 'previous'
                },
                {
                    type: 'submit',
                    className: 'submit-btn',
                    text: 'Update'
                }
            ]
        }
    ]

    useEffect(() => {
        if (accountConfirmed && error === '') {
            handleUpdateProfile()
        }

    }, [error, accountConfirmed])

    function handleSubmitClick(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            console.log('not')
            return setPasswordMatchError('Passwords do not match')
        }
        setPasswordMatchError('')
        setConfirmOpen(true)
    }

    function handleConfirmSubmit(e) {
        e.preventDefault() 
        dispatch(confirmAccount(accountConfirmEmailRef.current.value, accountConfirmPasswordRef.current.value))
    }

    function handleUpdateProfile() {

        let email = { changed: false, value: '' }
        let password = { changed: false, value: '' }
        let displayName = { changed: false, value: '' }

        if (emailRef.current.value !== currentUser.email) {
            email = { changed: true, value: emailRef.current.value }
        }

        if (passwordRef.current.value !== '') {
            password = { changed: true, value: passwordRef.current.value }
        }

        if (displayNameRef.current.value !== '' ) {
            displayName = { changed: true, value: displayNameRef.current.value }
        }

        console.log('here')
        dispatch(userUpdateProfileInfo(email, password, null, null, displayName, null, null))
    }

    function handleStepButtonClick(buttonType, buttonAction) {
        if (buttonType === 'submit') return
        setCurrentPageIndex(stepIndex => {
            if (buttonAction === 'next') return stepIndex + 1
            return stepIndex - 1
        })
    }

    function handleConfirmLayerClick(e) {
        if (e.target.closest('[data-account-confirm-form]') == null) {
            setConfirmOpen(false)
        }
    }

    return (
        <div className="auth-page w-screen h-screen flex flex-col relative overflow-clip">
            <h2 className="text-2xl font-semibold text-gray-100 tracking-wide mt-20 text-center">Update Profile</h2>
            <div className='w-96 mx-auto mt-3'>
                {passwordMatchError && <p className="py-2 px-3 font-semibold text-sm bg-red-300 text-red-600 mb-5">{passwordMatchError}</p>}
                {error && <p className="py-2 px-3 mt-7 font-semibold text-sm bg-red-300 text-red-600 mb-5">{error}</p>}
                {errors.length > 0 && errors.map((error, index) => (
                    <p key={`update_error_${index}`} className="py-2 px-3 font-semibold text-sm bg-red-300 text-red-600 mb-5">{error}</p>
                ))}
                {messages.length > 0 && messages.map((message, index) => (
                    <p key={`update_message_${index}`} className="py-2 px-3 font-semibold text-sm bg-green-300 text-green-600 mb-5">{message}</p>
                ))}
            </div>
            <div className="mt-12 flex gap-12 justify-center items-center">
                {STEPS.map((step, index) => (
                    <div 
                        className={`w-24 h-25 border border-gray-100 rounded-sm grid place-items-center cursor-pointer hover:text-sky-900 hover:bg-white transition duration-500 ${index === currentPageIndex ? 'text-sky-900 bg-white' : 'bg-transparent text-white'} relative ${index === STEPS.length - 1 ? '' : 'after:content-[""] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:w-12 after:h-0.5 after:bg-white'}`} 
                        key={`step_followup_${index}`}
                        onClick={() => setCurrentPageIndex(index)}
                    >
                        Step {index + 1}
                    </div>
                ))}
            </div>
            <div className="mt-12 flex justify-center items-start gap-7 grow">
                <div className="flex justify-center items-center w-96">
                    <form className="form w-full relative" onSubmit={handleSubmitClick} ref={updateFormRef}>
                        {STEPS.map((step, index) => (
                            <div className={`form p-7 bg-gray-900 flex-col rounded-lg w-full mx-auto absolute top-0 left-1/2 -translate-x-1/2 transform transition duration-500 ${index === currentPageIndex ? 'opacity-100 pointer-events-auto -translate-x-1/2 delay-250' : 'opacity-0 pointer-events-none translate-x-full'}`} key={`form_step_${index}`} >
                                {step.groups.map((group, groupIndex) => (
                                    <div className={`form-group ${groupIndex > 0 ? 'mt-7' : ''}`} key={`step_${index}_group_${groupIndex}`}>
                                        <label 
                                            className="form-label" 
                                            htmlFor={group.for}
                                        >
                                            {group.label}
                                        </label>
                                        <input 
                                            className="form-input" 
                                            type={group.type} 
                                            id={group.for} 
                                            ref={group.ref} 
                                            defaultValue={group.defaultValue} 
                                            placeholder={group.placeholder} 
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-between items-center mt-7">
                                    {step.buttons.map((button, buttonIndex) => (
                                        <button 
                                            className={`w-max ${button.className}`} 
                                            type={button.type} key={`step_${index}_button_${buttonIndex}`} 
                                            onClick={() => handleStepButtonClick(button.type, button.action)}
                                        >
                                            {button.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
            {loading && 
                <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-10">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-5xl text-sky-500"/>
                </div>
            }

            {confirmOpen &&
                <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center" onClick={handleConfirmLayerClick}>
                    <form className="w-2/5 py-4 px-7 bg-white rounded-sm" data-account-confirm-form onSubmit={handleConfirmSubmit}>
                        <h2 className="text-center text-lg font-semibold">Just a minute!</h2>
                        <p className="text-center text-sm font-thin">Let us know it's really you before updating your profile</p>
                        <div className="form-group mt-7">
                            <label className='form-label text-gray-900' htmlFor='account-confirm-email'>Email:</label>
                            <input className="form-input text-gray-900 border-gray-900" type="email" id='account-confirm-email' required ref={accountConfirmEmailRef} />
                        </div>
                        <div className="form-group mt-7">
                            <label className='form-label text-gray-900' htmlFor='account-confirm-password'>password:</label>
                            <input className="form-input text-gray-900 border-gray-900" type="password" required ref={accountConfirmPasswordRef} />
                        </div>
                        <button type="submit" className="submit-btn mt-7">Confirm</button>
                    </form>
                </div>
            }
        </div>
    )
}
