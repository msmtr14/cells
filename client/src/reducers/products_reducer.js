import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_BODIES,
    ADD_BODY,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from '../actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload }
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival:  action.payload }
        case GET_BRANDS:
            return {...state, brands: action.payload }
        case ADD_BRAND:
            return {
                ...state, 
                addBrand: action.payload.success , 
                brands:action.payload.brands 
            }
        case GET_BODIES:
            return {...state, bodies: action.payload }
        case ADD_BODY:
            return {
                ...state, 
                addWood: action.payload.success , 
                bodies:action.payload.bodies 
            }
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }
        case ADD_PRODUCT:
            return { ...state,addProduct: action.payload }
        case CLEAR_PRODUCT:
            return { ...state,addProduct: action.payload }
        case GET_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        case CLEAR_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        default:
            return state;
    }
}