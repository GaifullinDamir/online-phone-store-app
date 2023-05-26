import {getData, postData, updateData, deleteData} from './http.js';

const _baseURL = 'http://localhost:8080/phones/';

export const createPhone = async (data) => {
    return await postData(`${_baseURL}`, data);
}

export const getPhones = async () => {
    return await getData(`${_baseURL}`);
}

export const updatePhone = async (id, data) => {
    return await updateData(`${_baseURL}${id}`, data);
}

export const deletePhone = async (id) => {
    return await deleteData(`${_baseURL}${id}`);
}