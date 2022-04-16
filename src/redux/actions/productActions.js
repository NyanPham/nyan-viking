import { auth, db, storage } from '../../firebase'
import { uploadBytesResumable, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { formatDoc } from '../../helper'

const ACTIONS = {
    ADD_PRODUCT_START: 'add-product-start',
    ADD_PRODUCT_FAIL: 'add-product-fail',
    ADD_PRODUCT_SUCCESS: 'add-product-success',


    GET_PRODUCT_START: 'get-product-start',
    GET_PRODUCT_FAIL: 'get-product-fail',
    GET_PRODUCT_SUCCESS: 'get-product-success'
}

export function addProduct(product) {
    return async (dispatch) => {
        try {
            dispatch({ type: ACTIONS.ADD_PRODUCT_START })
            // uploading image
            const imagePath = `/products/${product.image.name}`
            const storageRef = ref(storage, imagePath)
            await uploadBytes(storageRef, product.image)

            // getting image url then add product to the database
            const imageURL = await getDownloadURL(storageRef) 
            const productToAdd = {
                code: product.code,
                title: product.title,
                description: product.description,
                price: parseFloat(product.price),
                salePercent: parseFloat(product.salePercent),
                category: product.category,
                colors: product.colors.split(', '),
                sizes: product.sizes.split(', '),
                collections: product.collections.split(', '),
                tags: product.tags.split(', '),
                amountInStock: parseFloat(product.amountInStock),
                imageURL,
                visibility: 'public'
            }
            await addDoc(collection(db, 'products'), productToAdd)

            dispatch({ 
                type: ACTIONS.ADD_PRODUCT_SUCCESS,
                payload: {
                    newProduct: productToAdd
                }
            })
        } catch (error) {
            dispatch({
                type: ACTIONS.ADD_PRODUCT_FAIL,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export function getProducts() {
    return (dispatch) => {
        try {
            dispatch({ type: ACTIONS.GET_PRODUCT_START })
            const q = query(collection(db, 'products'), where('visibility', '==', 'public'))
            const unsubscribe = onSnapshot(q, snapshot => {
                const products = snapshot.docs.map(formatDoc)
                dispatch({
                    type: ACTIONS.GET_PRODUCT_SUCCESS,
                    payload: {
                        products,
                        unsubscribe
                    }
                })
            })
        } catch {
            dispatch({ type: ACTIONS.GET_PRODUCT_FAIL })
        }
    }
}

export default ACTIONS