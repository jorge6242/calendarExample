import Product from '../Api/Product';
import {
    ACTIONS as ACTIONS_FORM
} from './productFormActions';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'product/get_all',
    GET: 'product/get',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.getAll();
        let getAllProducts = [];
        if (status === 200) {
            getAllProducts = data;
            dispatch({
                type: ACTIONS.GET_ALL,
                payload: getAllProducts
            });
        }
        return getAllProducts;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const create = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.create(body);
        let createProductResponse = [];
        console.log('status ', status);
        if (status === 200 || status === 201) {
            createProductResponse = {
                data,
                status
            };
            console.log('createProductResponse ', data);
        }
        return createProductResponse;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const get = id => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.get(id);
        let productResponse = [];
        if (status === 200) {
            productResponse = data;
            dispatch({
                type: ACTIONS_FORM.SET_EDIT,
                payload: data
            });
        }
        return productResponse;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const update = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.update(body);
        let productResponse = [];
        if (status === 200) {
            productResponse = {
                data,
                status
            };
            console.log('data ', data);
        }
        return productResponse;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const remove = id => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.remove(id);
        let productResponse = [];
        if (status === 200) {
            productResponse = {
                data,
                status
            };
            console.log('data remove ', data);
        }
        return productResponse;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};