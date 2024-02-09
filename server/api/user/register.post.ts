export default defineEventHandler(async(event) =>{
    const body = await readBody(event)
    throw createError({
        statusCode: 401,
        statusMessage: 'Error Dude,,...'
    })
})