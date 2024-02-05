import { H3Event } from 'h3'
import { verify } from 'jsonwebtoken'
import { SECRET } from './login.post'


export default eventHandler((event) => {
    const user = ensureAuth(event)
    return user
})

const TOKEN_TYPE = 'Bearer'

const ensureAuth = (event: H3Event) => {
    const authHeaderValue = getRequestHeader(event, 'authorization')
    if (typeof authHeaderValue === 'undefined') {
        throw createError({ statusCode: 403, statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint' })
    }

    const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `)
    try {
        return verify(token, SECRET)
    } catch (error) {
        console.error('Login failed. Here\'s the raw error:', error)
        throw createError({ statusCode: 403, statusMessage: 'You must be logged in to use this endpoint' })
    }
}