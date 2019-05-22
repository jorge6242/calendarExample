import AXIOS from '../Config/AxiosConfig';

const Product = {
    get() {
        return AXIOS.get('/product', {
            headers: headers(),
        });
    },
}