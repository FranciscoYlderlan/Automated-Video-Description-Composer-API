import { fastify } from "fastify";

const PORT = 3333

const app = fastify()

app.get('/', () => {
    return 'hello word!'
})

//serviços de armazenamento
//amazon S3 aws
//cloundflare r2

app.listen({
    port: PORT, 
    host: '0.0.0.0'
}).then(()=> console.log(`Server is running on port: ${PORT}`))