const api_url = 'http://localhost:3001/api';

export async function login(email, password) {
    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({ email: email, password: password }),
    }

    const response = await fetch(api_url + `/admin/login`, options);
    return response;
}

export async function getAllUser(token) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/admin/do/get-all-user`, options);
    return response;
}

export async function lockAccount(token, id) {
    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({ id: id }),
    }

    const response = await fetch(api_url + `/admin/do/lock-account`, options);
    return response;
}

export async function getUser(token, id) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/admin/do/get-user?id=${id}`, options);
    return response;
}

export async function getAllRoom(token) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/admin/do/get-all-room`, options);
    return response;
}

export async function getAllGameOfUser(token, id) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }

    const response = await fetch(api_url + `/admin/do/get-all-room-by-id?id=${id}`, options);
    return response;
}