const request = async (url, method, data) => {
    const res = await fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    //Возвраащем Promise.
    return await res.json();
}

export const postData = async (url, data) => {
    return await request(url, 'POST', data);
}

export const getData = async (url) => {
    //Поулчаем Promise, который возвращает fetch().
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    //Возвраащем Promise.
    return await res.json();
}

export const updateData = async (url, data) => {
    return await request(url, 'PATCH', data);
}

export const deleteData = async (url, data) => {
    return await request(url, 'DELETE');
}