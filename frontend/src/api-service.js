//TODO Extract these values to system
const HOSTNAME = 'http://localhost:8000/api'
const TOKEN = "d1aaeaef2a1e7bae4afbf2e2b52db00c6ffbab66"

export class API {
    static updatePattern(pattern_id, body) {
        return fetch(`${HOSTNAME}/patterns/${pattern_id}/`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
    static loadPatterns() {
        return fetch(`${HOSTNAME}/patterns/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        }).then(resp => resp.json())
    }
    static createPattern(body) {
        return fetch(`${HOSTNAME}/patterns/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
    static deletePattern(pattern_id) {
        return fetch(`${HOSTNAME}/patterns/${pattern_id}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        })
    }
}