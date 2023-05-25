'use strict'

const postData = async (url, data) => {
    //Поулчаем Promise, который возвращает fetch().
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    //Возвраащем Promise.
    return await res.json();
}

const getResources = async (url) => {
    //Поулчаем Promise, который возвращает fetch().
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    //Возвраащем Promise.
    return await res.json();
}