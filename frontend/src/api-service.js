//TODO Extract these values to system
const HOSTNAME = 'http://localhost:8000'

export class API {

    static updatePattern(pattern_id, body, token) {
        return fetch(`${HOSTNAME}/api/patterns/${pattern_id}/`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
    static loadPatterns(token) {
        return fetch(`${HOSTNAME}/api/patterns/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(resp => resp.json())
    }
    static createPattern(body, token) {
        return fetch(`${HOSTNAME}/api/patterns/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
    static deletePattern(pattern_id, token) {
        return fetch(`${HOSTNAME}/api/patterns/${pattern_id}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }

    static loginUser(body) {
        return fetch(`${HOSTNAME}/auth/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())

    }

    static registerUser(body) {
        return fetch(`${HOSTNAME}/api/registration/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())

    }
}