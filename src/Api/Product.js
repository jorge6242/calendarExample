import AXIOS from '../Config/Axios';

const Product = {
    getAll() {
        return AXIOS.get('/product');
    },
    create(data) {
        return AXIOS.post(`/product`, {
            ...data
        });
    },
    get(id) {
        return AXIOS.get(`/product/${id}`);
    },
    update(data) {
        return AXIOS.put(`/product/${data.id}`, {
            ...data
        });
    },
    remove(id) {
        return AXIOS.delete(`/product/${id}`);
    },
}

export default Product;