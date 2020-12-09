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