import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import NyanLogo from '../assets/nyan-logo.png'
import BlueNyanLogo from '../assets/blue-nyan-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { logOut } from '../redux/actions/userActions'

export default function Header({ documentRef }) {
    const [userOpen, setUserOpen] = useState(false)
    const {currentUser, loading, error} = useSelector(state => state.userStatus) 
    const dispatch = useDispatch()
    const { ref: headerRef, inView } = useInView({
        threshold: 0.5
    })

    useEffect(() => {
        if (documentRef.current) {
            documentRef.current.addEventListener('click', handleOutClick)
        }

        function handleOutClick(e) {
            console.log(userOpen && e.target.closest('[data-user]') == null)
            if (userOpen && e.target.closest('[data-user]') == null) {
                setUserOpen(false)
            }
        }

        return () => documentRef.current.removeEventListener('click', handleOutClick)
    }, [documentRef, userOpen])

    function handleLogout() {
        dispatch(logOut())
    }

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error])

    return (
        <header>
            {/* header */}
            <div className="py-7 px-12 flex flex-row justify-between items-center absolute top-0 left-0 w-full z-10" ref={headerRef}>
                <div className="flex flex-row justify-start items-center gap-7">
                    <div className="w-32 h-12">
                        <img src={NyanLogo} alt="Nyan Viking Logo" className="max-h-full max-w-full" />
                    </div>
                    <nav>
                        <ul  className="flex justify-between items-center gap-7">
                            <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">For Men <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">For Women <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">For Kids <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">Junior <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-white group hover:text-sky-300">Activity <span className="arrow-down"/></a></li>
                        </ul>
                    </nav>
                </div>
                {currentUser?.email 
                    ? (
                        <div className="flex justify-center items-center gap-5">
                            <div className="relative" data-user>
                                <div className="cursor-pointer group" onClick={() => setUserOpen(prevOpen => !prevOpen)}>
                                    <FontAwesomeIcon icon={faUserCircle} className="text-xl text-white group-hover:-translate-y-0.5 group-hover:text-sky-300 transform transition" />
                                    <span className="text-white uppercase ml-3 tracking-wide group-hover:text-sky-300">User</span>
                                </div>
                                <div className={`${userOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'} flex flex-col items-center absolute top-full left-0 bg-white rounded-sm transform transition shadow-lg`}>
                                    <Link to="/profile" className="w-full py-3 px-4 border-b border-gray-500 hover:bg-gray-300 transition">Profile</Link>
                                    <button className="w-full py-3 px-4 hover:bg-gray-300 transition" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            <div className="cursor-pointer group">
                                <FontAwesomeIcon icon={faCartShopping} className="text-xl text-white group-hover:-translate-y-0.5 group-hover:text-sky-300 transform transition" />
                                <span className="text-white uppercase ml-3 tracking-wide group-hover:text-sky-300">Items: 0</span>
                            </div>
                        </div>
                    )
                    : (
                        <Link to="/login" className="auth-btn block">Login</Link>
                    )
                }
            </div>

            {/* fixed header */}
            <div className={`${inView ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-1'} py-3 px-12 flex flex-row justify-between items-center bg-white fixed top-0 left-0 w-full z-20 transform transition shadow-md`}>
                <div className="flex flex-row justify-start items-center gap-7">
                    <div className="w-32 h-12">
                        <img src={BlueNyanLogo} alt="Nyan Viking Logo" className="max-h-full max-w-full" />
                    </div>
                    <nav>
                        <ul  className="flex justify-between items-center gap-7">
                            <li className="cursor-pointer"><a className="text-lg text-gray-900 group hover:text-sky-300">For Men <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-gray-900 group hover:text-sky-300">For Women <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-gray-900 group hover:text-sky-300">For Kids <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-gray-900 group hover:text-sky-300">Junior <span className="arrow-down"/></a></li>
                            <li className="cursor-pointer"><a className="text-lg text-gray-900 group hover:text-sky-300">Activity <span className="arrow-down"/></a></li>
                        </ul>
                    </nav>
                </div>
                {currentUser?.email 
                    ? (
                        <div className="flex justify-center items-center gap-5">
                            <div className="relative" data-user>
                                <div className="cursor-pointer group" onClick={() => setUserOpen(prevOpen => !prevOpen)}>
                                    <FontAwesomeIcon icon={faUserCircle} className="text-xl text-gray-900 group-hover:-translate-y-0.5 group-hover:text-sky-300 transform transition" />
                                    <span className="text-gray-900 uppercase ml-3 tracking-wide group-hover:text-sky-300">User</span>
                                </div>
                                <div className={`${userOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'} flex flex-col items-center absolute top-full left-0 bg-white rounded-sm transform transition shadow-2xl border border-gray-300`}>
                                    <Link to="/profile" className="w-full py-3 px-4 border-b border-gray-500 hover:bg-gray-300 transition">Profile</Link>
                                    <button className="w-full py-3 px-4 hover:bg-gray-300 transition" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            <div className="cursor-pointer group">
                                <FontAwesomeIcon icon={faCartShopping} className="text-xl text-gray-900 group-hover:-translate-y-0.5 group-hover:text-sky-300 transform transition" />
                                <span className="text-gray-900 uppercase ml-3 tracking-wide group-hover:text-sky-300">Items: 0</span>
                            </div>
                        </div>
                    )
                    : (
                        <Link to="/login" className="auth-btn block bg-sky-900 hover:bg-sky-800 hover:text-white">Login</Link>
                    )
                }
            </div>
            {loading && ReactDOM.createPortal(
                <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-5xl text-sky-500"/>
                </div>,
                document.getElementById('root')
            )}
        </header>
    )
}
