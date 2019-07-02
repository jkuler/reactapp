import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false 
}

const purchaseInit = (state = initialState, action) => {
    return updatedObject(state, { purchased: false })
}
const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder =  updatedObject(action.orderData, { id: action.orderId});  
    return updatedObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    });
}
const purchaseBurgerFail = (state, action) => {
    return updatedObject(state, { loading: false })
}

const purchaseFetchOrdersSuccess = (state, action) => {
    return updatedObject(state, {  
        orders: action.orders,
        loading: false})
}
const purchaseOrderStart = (state, action) => {
    return updatedObject(state, { loading: true })
}
const purchaseOdersFail = (state, action) => {
                return updatedObject(state, { loading: true });
}
 
const orderReducer = (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)               
            case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)     
            case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
            case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
            case actionTypes.FETCH_ORDERS_START: return purchaseOrderStart(state, action) 
            case actionTypes.FETCH_ORDERS_SUCCESS: return purchaseFetchOrdersSuccess(state, action)
            case actionTypes.FETCH_ORDERS_FAIL: return purchaseOdersFail(state, action)
            default:
                 return state;
        }
}

export default orderReducer;