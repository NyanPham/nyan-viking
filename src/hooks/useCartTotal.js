import { useSelector } from "react-redux";

export default function useCartTotal() {
    const cartItems = useSelector(state => state.cartStatus.cartItems)
    const products = useSelector(state => state.productStatus.products)
    return cartItems.reduce((amount, item) => {
        const product = products.find(product => product.code === item.code)
        const itemTotal = product.salePercent > 0 ? item.selectedAmount * (product.price - (product.price * (product.salePercent / 100))) : item.selectedAmount * product.price
        return amount += itemTotal
    }, 0)
}