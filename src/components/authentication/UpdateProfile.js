import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function UpdateProfile() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const displayNameRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()

    const { currentUser, error, message, loading } = useSelector(state => state.userStatus)
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

    function handleUpdateProfile(e) {
        e.preventDefault()
        
    }

    function handleStepButtonClick(buttonType, buttonAction) {
        if (buttonType === 'submit') return
        setCurrentPageIndex(stepIndex => {
            if (buttonAction === 'next') return stepIndex + 1
            return stepIndex - 1
        })
    }

    return (
        <div className="auth-page w-screen h-screen flex flex-col relative overflow-clip">
            <h2 className="text-2xl font-semibold text-gray-100 tracking-wide mt-20 text-center">Update Profile</h2>
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
                <div className="flex justify-center items-center w-1/3">
                    <form className="form w-full relative" onSubmit={handleUpdateProfile}>
                        {STEPS.map((step, index) => (
                            <div className={`form p-7 bg-gray-900 flex-col rounded-lg w-4/5 mx-auto absolute top-0 left-1/2 -translate-x-1/2 transform transition duration-500 ${index === currentPageIndex ? 'opacity-100 pointer-events-auto -translate-x-1/2 delay-250' : 'opacity-0 pointer-events-none translate-x-full'}`} key={`form_step_${index}`} >
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
                <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-5xl text-sky-500"/>
                </div>
            }
        </div>
    )
}
