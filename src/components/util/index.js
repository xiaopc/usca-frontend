import querystring from 'querystring'
import store from '../../store'

function handleErrors(response) {
    if (!response.ok) {
        console.error(Date().toString() + ': Network error - ' + response.statusText);
        return {
            json : () => {
                return {
                    error: 1,
                    errmsg: '网络错误: ' + response.statusText
                }
            }
        }
        // throw Error(response.statusText);
    }
    return response;
}

// function convertErrors(response) {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }

export async function loginFetch(values) {
    const response = await fetch("/login", {
        body: querystring.stringify(values),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
    }).then(handleErrors);
    return await response.json();
}

export async function logoutFetch() {
    const response = await fetch("/logout", {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
    }).then(handleErrors);
    return await response.json();
}

export async function userInfoFetch() {
    const response = await fetch("/user/info", {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
    }).then(handleErrors);
    return await response.json();
}

export async function userInfoUpdate() {
    store.commit('startUserUpdate');
    const body = await userInfoFetch();
    if (body.error == 0)
        store.commit('updateUser', body.data);
}

export async function registerFetch(values) {
    const response = await fetch("/user/register", {
        body: JSON.stringify(values),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    }).then(handleErrors);
    return await response.json();
}

export async function checkUsername(value) {
    const response = await fetch("/api/check?username=" + value);
    return await response.json();
}

export async function fetchTagSuggest(value) {
    const response = await fetch("/api/taglist?text=" + encodeURIComponent(value));
    return await response.json();
}

export async function tagsFetch() {
    const response = await fetch("/user/tags", {
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'GET',
    }).then(handleErrors);
    return await response.json();
}

export async function tagsUpdate() {
    store.commit('startProfileUpdate');
    const body = await tagsFetch();
    if (body.error == 0)
        store.commit('updateTags', body.data);
    store.commit('finishProfileUpdate');
}

export async function submitTags(values) {
    const response = await fetch("/user/tags", {
        body: JSON.stringify(values),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    }).then(handleErrors);
    return await response.json();
}

export async function userJobFetch() {
    const response = await fetch("/user/job", {
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'GET',
    }).then(handleErrors);
    return await response.json();
}

export async function userJobFetchUpdate() {
    store.commit('startProfileUpdate');
    const body = await userJobFetch();
    if (body.error == 0)
        store.commit('updateSelectJob', body.data);
    store.commit('finishProfileUpdate');
}

export async function analysisJobsFetch() {
    const response = await fetch("/analysis/jobs", {
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'GET',
    }).then(handleErrors);
    return await response.json();
}

export async function oldAnalysisJobsFetch() {
    const response = await fetch("/user/joblist", {
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'GET',
    }).then(handleErrors);
    return await response.json();
}

export async function submitUserJob(value) {
    const response = await fetch("/user/job", {
        body: JSON.stringify(value),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    }).then(handleErrors);
    return await response.json();
}

export async function analysisJobsUpdate(isrefresh) {
    store.commit('startAnalysisUpdate');
    if (isrefresh) {
        var body = await analysisJobsFetch();
    } else {
        var body = await oldAnalysisJobsFetch();
    }
    if (body.error == 0)
        store.commit('updateAnalysis', body.data);
    store.commit('finishAnalysisUpdate');
}

export async function analysisJobTagsFetch(value) {
    const response = await fetch("/analysis/tags?job=" + encodeURIComponent(value), {
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'GET',
    }).then(handleErrors);
    return await response.json();
}