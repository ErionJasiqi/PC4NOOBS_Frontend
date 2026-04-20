import { useAuth } from './auth'

const backend = 'https://apiv1.erion-jasiqi.bbzwinf.ch'

const { token, setToken } = useAuth()

export async function loginT (email, password) {
    const response = await request(`/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

    return response
}



// Sendet das Login-Formular ans Backend.
export async function loginUser (email, password) {
    const response = await request(`/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })

    if (!response.token) {
        throw new Error('Login failed due to an unknown error')
    }

    setToken(response.token)

    return response.token
}


// Überprüft, ob das Session-Token gültig ist.
export async function checkAuth () {
    try {
        const response = await request(`/auth`, {
            method: 'GET',
        })

        if (response.token) {
            setToken(response.token)
        }

        return response
    } catch (error) {
        setToken('')
        return false
    }
}

// Generische Request-Funktion.
async function request (url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }

    if (token.value) {
        headers['Authorization'] = 'Bearer ' + token.value
    }

    const response = await fetch(backend + url, { headers, ...options })

    if (response.ok) {
        return response.json()
    } else if (response.status === 422) {
        const data = await response.json()

        throw new ValidationError('validation failed', data.errors)
    } else {
        throw new Error(`Server error: ${await response.text()}`)
    }
}


class ValidationError {
    message
    errors

    constructor (message, errors) {
        this.message = message
        this.errors = errors
    }
}