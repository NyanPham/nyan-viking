import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { formatPrice } from "../../helper";
import useAmountWithUpdate, {
  ACTIONS as AMOUNT_ACTIONS,
} from "../../hooks/useAmountWithUpdate";
import {
  removeItemFromCart,
  updateCartItemAmount,
} from "../../redux/actions/cartActions";
import { showWarning } from "../../redux/actions/warningActions";

export default function ProductControl(props) {
  const {
    docId,
    code,
    imageURL,
    title,
    selectedColor,
    selectedSize,
    selectedAmount,
    productId,
    price,
  } = props;

  const location = useLocation();
  const isInCheckout = location.pathname.split("/").includes("checkout");
  const products = useSelector((state) => state.productStatus.products);
  const currentProduct = products.find((product) => product.code === code);
  const [amount, dispatchAmount] = useAmountWithUpdate(selectedAmount);
  const dispatch = useDispatch();
  const amountInputRef = useRef();

  function handleAmountChange(e) {
    const dispatchDatabaseAmount = (value) => {
      dispatch(updateCartItemAmount(docId, parseInt(value)));
    };

    dispatchAmount({
      type: AMOUNT_ACTIONS.INPUT_CHANGE,
      payload: {
        e: e,
        dispatch: dispatch,
        amountInStock: currentProduct.amountInStock,
        title: currentProduct.title,
        showWarning: showWarning,
        dispatchDatabaseAmount: dispatchDatabaseAmount,
      },
    });
  }

  function handleAmountClick(e) {
    const dispatchDatabaseAmount = (value) => {
      dispatch(updateCartItemAmount(docId, parseInt(value)));
    };

    dispatchAmount({
      type: AMOUNT_ACTIONS.BUTTON_CLICK,
      payload: {
        e: e,
        dispatch: dispatch,
        amountInStock: currentProduct.amountInStock,
        title: currentProduct.title,
        showWarning: showWarning,
        dispatchDatabaseAmount: dispatchDatabaseAmount,
      },
    });
  }

  function handleRemoveItem() {
    dispatch(removeItemFromCart(docId));
  }

  return (
    <div
      className={`w-full flex justify-between border border-gray-200 transform transition md:justify-center`}
    >
      <div className="p-5 pr-0 mr-4 flex justify-center items-center w-28 md:mr-0">
        <Link className="w-full p-0 inline-block" to={`/product/${productId}`}>
          <img
            src={imageURL}
            alt={title}
            className="max-w-full max-h-full object-cover object-center"
          />
        </Link>
      </div>
      <div
        className={`${
          isInCheckout ? "" : ""
        } flex w-2/3 flex-col md:flex-row md:grow`}
      >
        <div
          className={`${
            isInCheckout ? "lg:pr-2" : ""
          } p-5 w-full md:w-36 md:grow`}
        >
          <h2 className="font-medium text-lg text-gray-900">
            <Link to={`/product/${productId}`}>{title}</Link>
          </h2>
          <h4 className="text-sm capitalize text-gray-500">
            Color: {selectedColor}
          </h4>
          <h4 className="text-sm uppercase text-gray-500">
            Size: {selectedSize}
          </h4>
          <h4 className="text-sm">
            {currentProduct?.salePercent > 0 ? (
              <>
                <span className="line-through text-xs inline-block mr-1">
                  {formatPrice(currentProduct.price, "USD")}
                </span>
                &nbsp;
                <span className="inline-block text-emerald-500 font-semibold">
                  {formatPrice(
                    currentProduct.price -
                      currentProduct.price * (currentProduct.salePercent / 100),
                    "USD"
                  )}
                </span>
              </>
            ) : (
              <span className="inline-block">
                {formatPrice(currentProduct.price, "USD")}
              </span>
            )}
          </h4>
        </div>
        <div
          className={`${
            isInCheckout ? "p-5 w-36 lg:pr-3 lg:w-28" : ""
          } p-5 pt-0 w-full flex flex-col justify-center items-start md:pt-5 md:w-36 md:justify-center md:items-center`}
        >
          <div className="flex justify-center items-center">
            <button
              className="h-7 w-7 border border-gray-300 rounded-l-sm flex justify-center items-center text-xl"
              type="button"
              onClick={handleAmountClick}
              data-action="subtract"
            >
              -
            </button>
            <input
              type="text"
              className="w-8 h-7 text-center border-t border-b border-gray-300 flex justify-center items-center text-sm"
              value={amount}
              onChange={handleAmountChange}
              onKeyDown={handleAmountChange}
              ref={amountInputRef}
            />
            <button
              className="h-7 w-7 border border-gray-300 rounded-r-sm flex justify-center items-center text-xl"
              type="button"
              onClick={handleAmountClick}
              data-action="add"
            >
              +
            </button>
          </div>
          <button className="text-xs mt-3" onClick={handleRemoveItem}>
            Remove
          </button>
        </div>
        <div
          className={`${
            isInCheckout ? "p-5 w-36 lg:pl-3 lg:w-32" : ""
          } p-5 w-full hidden md:w-36 md:justify-center md:items-center md:flex`}
        >
          <h2 className="text-sm">
            {currentProduct?.salePercent > 0
              ? formatPrice(
                  (currentProduct.price -
                    currentProduct.price * (currentProduct.salePercent / 100)) *
                    selectedAmount,
                  "USD"
                )
              : formatPrice(currentProduct.price * selectedAmount, "USD")}
          </h2>
        </div>
      </div>
    </div>
  );
}
