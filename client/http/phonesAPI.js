import {getData, postData, updateData, deleteData} from './http.js';

const _baseURL = 'http://localhost:8080/phones/';

export const createPhone = async (phone) => {
    return await postData(`${_baseURL}`, phone);
}

export const getPhones = async () => {
    return await getData(`${_baseURL}`);
}

export const updatePhone = async (id) => {
    return await updateData(`${_baseURL}:${id}`);
}

export const deletePhone = async (id) => {
    return await deleteData(`${_baseURL}:${id}`);
}