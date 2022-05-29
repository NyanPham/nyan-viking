import { useReducer } from "react";

export const ACTIONS = {
	BUTTON_CLICK: "button-click",
	INPUT_CHANGE: "input-change",
};

function amountReducer(amount, { type, payload = null }) {
	switch (type) {
		case ACTIONS.BUTTON_CLICK: {
			const { e, dispatch, amountInStock, title, showWarning, dispatchDatabaseAmount = null } = payload

			const action = e.target.dataset.action;
			let newValue
			if (action === "subtract") newValue = parseInt(amount) - 1;
			if (action === "add") newValue = parseInt(amount) + 1;

			if (newValue <= 0) newValue = 1;
			if (newValue > amountInStock) {
				dispatch(
					showWarning(
						`You cannot add more than ${amountInStock} of ${title} to your cart`
					)
				);
				newValue = amountInStock
			}
			
			if (dispatchDatabaseAmount !== null) {
				dispatchDatabaseAmount(parseInt(newValue))
			}

			return newValue
		}
			
		case ACTIONS.INPUT_CHANGE: {
			const { e, dispatch, amountInStock, title, showWarning, dispatchDatabaseAmount = null } = payload
			let newValue

			if (e.type === 'keydown') {
				
				if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return amount

				if (e.key === 'ArrowUp') newValue = parseInt(amount) + 1 
				
				if (e.key === 'ArrowDown') newValue = parseInt(amount) - 1

				if (newValue <= 0) return 1
				if (newValue > amountInStock) {
					newValue = amountInStock
					dispatch(showWarning(`You cannot add more than ${amountInStock} of ${title} to your cart`))
				}

				if (isNaN(newValue)) {
					newValue = 1
				}

				if (dispatchDatabaseAmount !== null) {
					dispatchDatabaseAmount(parseInt(newValue))
				}

				return newValue 
			}
			
			if (!/^\d+$/g.test(e.target.value)) {
				newValue = amount
			}

			if (parseInt(e.target.value) <= 0) {
				newValue = 1
			}
			
			if (parseInt(e.target.value) > amountInStock) {
				dispatch(showWarning(`You cannot add more than ${amountInStock} of ${title} to your cart`))
				newValue = amountInStock
			}

			if (dispatchDatabaseAmount !== null) {
				dispatchDatabaseAmount(parseInt(newValue))
			}
			return newValue 
		}

		default:
			return amount
	}
}

export default function useAmountWithUpdate(initialAmount = 1) {
	const [selectedAmount, setSelectedAmount] = useReducer(
		amountReducer,
		initialAmount
	);

	return [selectedAmount, setSelectedAmount];
}
