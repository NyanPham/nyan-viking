import ReactDOM from 'react-dom'
import { useEffect } from 'react';
import Home from './Home'
import { Routes, Route } from 'react-router-dom'
import SignUp from './authentication/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserProfileInfo, removeUser, setUser } from '../redux/actions/userActions';
import LogIn from './authentication/LogIn';
import { useRef } from 'react';
import ForgotPassword from './authentication/ForgotPassword';
import Profile from './authentication/Profile';
import UpdateProfile from './authentication/UpdateProfile';
import PRODUCT_ACTIONS from '../redux/actions/productActions';
import { getProducts } from '../redux/actions/productActions';
import ProductDetails from './Product/ProductDetails';
import Footer from './Footer';
import Header from './Header';
import { getCart } from '../redux/actions/cartActions';
import Cart from './Cart/Cart';
import Checkout from './Cart/Checkout';
import ToastContainer from './toast/ToastContainer';
import WarningContainer from './toast/WarningContainer';
import RecentlyViewed from './Popups/RecentlyViewed';
import RecentlyViewedContextProvider from '../contexts/RecentlyViewedContextProvider';

export const PRODUCTS = [
	{
		id: 'MYD-DRA',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['top-pick'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA2',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag 2',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['top-pick'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA3',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag 3',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['top-pick'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA4',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag 4',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['top-pick'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA5',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag Performance 1',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['performance'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA6',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag Performance 2',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['performance'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA7',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag Performance 3',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['performance'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},
	{
		id: 'MYD-DRA8',
		imageURL: '../assets/boot.jpg',
		name: 'My Drag Performance 4',
		description: 'High cut hunting boot',
		price: 300,
		colors: ['red', 'blue', 'brown'],
		sizes: ['39', '40', '41'],
		tags: ['performance'],
		categories: ['footwear'],
		salePercent: 20,
		is_top_pick: true
	},

]

function App() {
	const documentRef = useRef()
	const dispatch = useDispatch()

	
	useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

	onAuthStateChanged(auth, user => {
		if (user) {
			dispatch(setUser(user))
			dispatch(getUserProfileInfo(user.uid))
			dispatch(getCart(user.uid))
		} else {
			dispatch(removeUser())
		}
	})

	const products = useSelector(state => state.productStatus.products)
	return (
		<div className="" ref={documentRef}>
			<RecentlyViewedContextProvider>
				<Routes>
					<Route path="/" element={<Home documentRef={documentRef} />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<LogIn />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/update-profile" element={<UpdateProfile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/product/:productId" element={<><Header documentRef={documentRef}/><ProductDetails /><Footer /></>} />
					<Route path="/cart" element={<><Header documentRef={documentRef} /><Cart /><Footer /> </>} />
					<Route path="/checkout" element={<Checkout />} />
				</Routes>
				{ReactDOM.createPortal(
					<>
						<ToastContainer />
						<WarningContainer />
						<RecentlyViewed />
					</>,
					document.getElementById('root')
				)}
			</RecentlyViewedContextProvider>
		</div>
	);
}

export default App;
