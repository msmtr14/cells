import axios from 'axios';
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
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';



export function getProductDetail(id){

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}


export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function getProductsToShop(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                });

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export function addProduct(datatoSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/article`,datatoSubmit)
                    .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}




////////////////////////////////////
//////        CATEGORIES
////////////////////////////////////


export function getBrands(){

    const request = axios.get(`${PRODUCT_SERVER}/brands`)
                .then(response => response.data );

    return {
        type: GET_BRANDS,
        payload: request
    }

}

export function addBrand(dataToSubmit, existingBrands){
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
    .then(response=>{
        let brands = [
            ...existingBrands,
            response.data.brand
        ];
        return {
            success: response.data.success,
            brands
        }
    });
    return {
        type: ADD_BRAND,
        payload: request
    }
}


export function addBody(dataToSubmit, existingBodies){
    const request = axios.post(`${PRODUCT_SERVER}/body`,dataToSubmit)
    .then(response=>{
        let bodies = [
            ...existingBodies,
            response.data.body
        ];
        return {
            success: response.data.success,
            bodies
        }
    });
    return {
        type: ADD_BODY,
        payload: request
    }
}



export function getBodies(){
    const request = axios.get(`${PRODUCT_SERVER}/bodies`)
    .then(response => response.data );

    return {
        type: GET_BODIES,
        payload: request
    }
}