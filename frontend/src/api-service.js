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

    static loadPublishers(token) {
        return fetch(`${HOSTNAME}/api/pattern/publishers/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(resp => resp.json())
    }

    static loadCategories(token) {
        return fetch(`${HOSTNAME}/api/pattern/categories/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(resp => resp.json())
    }

    static loadSizes(token) {
        return fetch(`${HOSTNAME}/api/pattern/sizes/`, {
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
        function handleErrors(resp) {
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp;
        }

        return fetch(`${HOSTNAME}/auth/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(handleErrors)
        
    }

    static registerUser(body) {
        function handleErrors(resp) {
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            return resp;
        }
        return fetch(`${HOSTNAME}/api/registration/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(handleErrors)

    }
}