import Product from '../Api/Product';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET: 'product/get',
};



/**
 * @param  {object} value - Group object
 */
export const createGroupAsync = () => async dispatch => {
    try {
        const {
            data,
            status
        } = await Product.get();
        let createGroupResponse = [];
        if (status === 200) {
            createGroupResponse = data;
            console.log('data ', data);
        }
        return createGroupResponse;
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