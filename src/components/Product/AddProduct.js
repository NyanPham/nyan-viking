import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { addProduct } from '../../redux/actions/productActions'

export const IMAGE_EXTENSIONS = ['image/jpeg', 'image/jpg', 'image/png']
const numberFields = ['price', 'salePercent', 'amountInStock']
const arrayFields = ['colors', 'sizes', 'collections', 'tags']
const initialProductData = {
    code: '',
    title: '',
    description: '',
    price: 0,
    salePercent: 0,
    colors: '',
    sizes: '',
    category: 'top',
    collections: '',
    tags: '',
    amountInStock: 0,
}

export default function AddProduct({ closeAddProductForm, userId }) {
    const imageInputRef = useRef()
    const [loadingImage, setLoadingImage] = useState(false)
    const [image, setImage] = useState()
    const [imageURL, setImageURL] = useState()
    const [dataValid, setDataValid] = useState(false)
    const [dataChangeCount, setDataChangeCount] = useState(0)
    const [productData, setProductData] = useState(initialProductData)

    const { products, loading, error, message } = useSelector(state => state.productStatus)
    const dispatch = useDispatch()
    console.log(products)
    useEffect(() => {
        validateData()
    }, [dataChangeCount])

    useEffect(() => {
        if (message !== '') {
            setProductData(initialProductData)
            setDataValid(false)
        }
    }, [message])

    function handleAddImageClick() {
        imageInputRef.current.click()
    }

    function handleAddImage(e) {
        e.preventDefault()
        const imageFile = e.target.files[0]
        if (!IMAGE_EXTENSIONS.includes(imageFile.type)) return alert('Please select a valid image!') 
        setLoadingImage(true)
        const fileReader = new FileReader
        
        fileReader.onload = () => {
            const imageURL = fileReader.result
            if (!imageURL) return 
            setImageURL(imageURL)
            setImage(imageFile)
            setLoadingImage(false)
            setDataChangeCount(prevCount => prevCount + 1)
        }

        fileReader.readAsDataURL(imageFile)
    }

    function handleInputChange(e) {
        setProductData((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
        setDataChangeCount(prevCount => prevCount + 1)
    }

    function handleAddProduct(e) {
        e.preventDefault()
        if (!dataValid) return
        const product = {
            ...productData,
            image
        }
        dispatch(addProduct(product))
    }

    function validateData() {
        let isValid = true
        const fields = Object.keys(productData)

        if (image == null) return setDataValid(false)

        isValid = fields.every(field => {
            if (numberFields.includes(field)) return true
            return productData[field] !== ''
        })

        setDataValid(isValid)
    }
    return (
        <form className="h-4/5 w-1/3 py-7 px-10 bg-white overflow-y-auto rounded-sm relative" id="add-product-form" onSubmit={handleAddProduct}>
            <button className="absolute top-3 right-3 text-xl text-gray-700 hover:text-gray-500 transition" type="button" onClick={closeAddProductForm}>&times;</button>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-wide text-center">Add Product</h2>
            {message && <p className="success-alert">{message}</p>}
            {error && <p className="error-alert">{error}</p>}
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-code">Code:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="code" 
                    id="product-code" 
                    value={productData.code} 
                    placeholder="e.g.JK-GRT"
                    onChange={handleInputChange}  
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-title">Title:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="title" 
                    id="product-title" 
                    value={productData.title} 
                    placeholder="e.g.Short Sleeve T-shirt"
                    onChange={handleInputChange}  
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-description">Description:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="description" 
                    id="product-description" 
                    value={productData.description} 
                    placeholder="e.g.This product is the best for winter"
                    onChange={handleInputChange} 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product_image">Image:
                    <span className="font-normal ml-2">{image?.name || ''}</span>
                </label>
                <div className={`${loadingImage ? 'pointer-events-none' : 'pointer-events-auto'} w-full h-36 border border-gray-600 flex justify-center items-center overflow-clip cursor-pointer group hover:border-gray-400 transition`} onClick={handleAddImageClick}>
                    {imageURL
                        ? (<img src={imageURL} alt={image.name} className="max-w-full max-h-full object-cover object-center"/>)
                        : loadingImage && !image
                            ? <FontAwesomeIcon icon={faSpinner} className="text-3xl text-sky-600 group-hover:text-gray-400 transition animate-spin" />
                            : <FontAwesomeIcon icon={faFileArrowUp} className="text-3xl text-gray-600 group-hover:text-gray-400 transition" />
                    }
                </div>
                <input 
                    className="form-input" 
                    type="file" 
                    name="image" 
                    id="product-image" 
                    hidden={true} 
                    onChange={handleAddImage} 
                    ref={imageInputRef} 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-price">Price:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="number" 
                    name="price" 
                    min={0} 
                    id="product-price" 
                    value={productData.price} 
                    placeholder="Leave blank or 0 if free"
                    onChange={handleInputChange} 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-sale-percent">Sale Percent:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="number" 
                    name="salePercent" 
                    min={0} 
                    id="product-sale-percent" 
                    value={productData.salePercent} 
                    onChange={handleInputChange} 
                    placeholder="Leave blank or 0 if not on sale" 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-colors">Colors:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="colors" 
                    id="product-colors" 
                    value={productData.colors} 
                    onChange={handleInputChange} 
                    placeholder="e.g.blue, green, sky" 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-sizes">Sizes:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="sizes" 
                    id="product-sizes" 
                    value={productData.sizes} 
                    onChange={handleInputChange} 
                    placeholder="e.g.S, M, L" 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-category">Category:</label>
                <select 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="category" 
                    id="product-category" 
                    value={productData.category}
                    onChange={handleInputChange} 
                >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="footwear">Footwear</option>
                    <option value="underwear">Underwear</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="else">Else</option>
                </select>
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-collections">Collections:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="collections" 
                    id="product-collections" 
                    value={productData.collections} 
                    placeholder="e.g.New Arrival, Winter"
                    onChange={handleInputChange}  
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-tags">Tags:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="text" 
                    name="tags" 
                    id="product-tags" 
                    value={productData.tags} 
                    onChange={handleInputChange} 
                    placeholder="e.g.shoes, short sleeve" 
                />
            </div>
            <div className="form-group mt-7">
                <label className='form-label text-gray-700' htmlFor="product-instock">Number in stock:</label>
                <input 
                    className="form-input border-gray-600 text-gray-600" 
                    type="number" 
                    name="amountInStock"
                    min={0} 
                    id="product-instock" 
                    value={productData.amountInStock} 
                    onChange={handleInputChange} 
                    placeholder="Leave blank or 0 for unavailability" 
                />
            </div>
            <button type="submit" className="submit-btn mt-7 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-500" disabled={!dataValid | loading}>Add</button>
        </form>
    )
}
