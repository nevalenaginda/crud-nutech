import axios from "axios"
const urlApi = process.env.REACT_APP_API_URL;

export const getAllProducts = (search = "", limit = "5", page = "1") => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: "REQ_GET_ALL_PRODUCTS"
        })
        axios
            .get(`${urlApi}/product?sort-by=name&search-by=name&item=${search}&limit=${limit}&page=${page}`)
            .then((res) => {
                dispatch({
                    type: "GET_ALL_PRODUCTS",
                    payload: res.data
                })
                resolve(res)
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: "GET_ALL_PRODUCTS_FAIL",
                    error: err.response.data.message
                })
                reject(err)
            });
    })
}

export const deleteProducts = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${urlApi}/product/${id}`)
            .then((res) => {

                resolve(res)
            })
            .catch((err) => {
                reject(err)
            });
    })
}

export const addProducts = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${urlApi}/product`, data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            });
    })
}

export const editProducts = (id, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`${urlApi}/product/${id}`, data)
            .then((res) => {
                dispatch({
                    type: "FIRE_EVENT_EDIT_PRODUCTS"
                })
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            });
    })
}