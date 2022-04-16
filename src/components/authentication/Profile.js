import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Portrait from '../../assets/portrait.jpg'
import { Link } from 'react-router-dom'
import AddProduct from '../Product/AddProduct'

export default function Profile() {
    const currentUser = useSelector(state => state.userStatus.currentUser)
    const [mounted, setMounted] = useState(false)
    const [addProductFormOpen, setAddProductFormOpen] = useState(false)

    useEffect(() => {
        if (currentUser?.uid) {
            setMounted(true)
        }
    }, [currentUser])

    function handleAddProductLayoutClick(e) {
        if (e.target.closest('#add-product-form') != null) return
        closeAddProductForm()
    }

    function openAddProductForm() {
        setAddProductFormOpen(true)
    }

    function closeAddProductForm() {
        setAddProductFormOpen(false)
    }

    return (
        <div className="w-screen h-screen auth-page relative overflow-clip">
            <div className={`${mounted ? '-translate-y-1/2 opacity-100' : '-translate-y-full opacity-0' } w-36 h-36 rounded-full overflow-hidden bg-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 z-10 transform transition duration-1000`}>
                <img src={Portrait} alt="Nyan's Portrait" className="w-full h-full object-center object-cover"/>
            </div>
            <div className={`${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} h-1/2 w-full bg-gray-900 absolute bottom-0 left-0 z-0 transform transition duration-1000`}>
                <div className="w-1/2 mx-auto mt-24 text-center relative after:content-[''] after:absolute after:-bottom-7 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-white">
                    <p className="text-white tracking-wide text-base">Email: {currentUser?.email}</p>
                    <p className="text-white tracking-wide text-base">Username: {currentUser?.displayName ? currentUser.displayName : 'Anonymous'}</p>
                </div>
                {currentUser?.uid === process.env.REACT_APP_NYAN_VIKING_ADMIN_ID
                    ? (
                        <div className="w-1/3 mx-auto mt-12 text-center relative grid grid-cols-2 grid-rows-2 justify-center items-center gap-3">
                            <Link to="/" className="px-4 py-2 text-white border border-white rounded-sm hover:bg-white hover:text-gray-900 transform transition">Dashboard</Link>
                            <Link to="/update-profile" className="px-4 py-2 text-white border border-white rounded-sm hover:bg-white hover:text-gray-900 transform transition">Update Profile</Link>
                            <button onClick={openAddProductForm} className="px-4 py-2 text-white border border-white rounded-sm hover:bg-white hover:text-gray-900 transform transition col-span-2">Add Product</button>
                        </div>
                    )
                    : (
                        <div className="w-1/2 mx-auto mt-12 text-center relative flex flex-col justify-center items-center gap-3">
                            <Link to="/" className="w-1/2 px-4 py-2 text-white border border-white rounded-sm hover:bg-white hover:text-gray-900 transform transition">Dashboard</Link>
                            <Link to="/update-profile" className="w-1/2 px-4 py-2 text-white border border-white rounded-sm hover:bg-white hover:text-gray-900 transform transition">Update Profile</Link>
                        </div>
                    )
                }
            </div>
            {currentUser?.uid === process.env.REACT_APP_NYAN_VIKING_ADMIN_ID && (
                <div className={`${addProductFormOpen && currentUser.uid === process.env.REACT_APP_NYAN_VIKING_ADMIN_ID ? 'opacity-100 -translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'} fixed inset-0 bg-gray-900/90 flex justify-center items-center z-10 transform transition duration-300`} onClick={handleAddProductLayoutClick}>
                    <AddProduct closeAddProductForm={closeAddProductForm} userId={currentUser.uid} />
                </div>
            )}
        </div>
    )
}
