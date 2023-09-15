import { fastify } from "fastify";

const PORT = 3333

const app = fastify()

app.get('/', () => {
    return 'hello word!'
})

app.listen({
    port: PORT, 
    host: '0.0.0.0'
}).then(()=> console.log(`Server is running on port: ${PORT}`))