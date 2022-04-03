import Home from './Home'
import { Routes, Route } from 'react-router-dom'

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
	return (
		<div className="">
			<Routes>
				<Route path="/" element={<Home /> } />
			</Routes>
		</div>
	);
}

export default App;
