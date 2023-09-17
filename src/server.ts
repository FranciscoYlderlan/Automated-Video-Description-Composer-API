import { fastify } from 'fastify'

import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'

const PORT = 3333

const app = fastify()

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)

//serviços de armazenamento
//amazon S3 aws
//cloundflare r2

app.listen({
    port: PORT, 
    host: '0.0.0.0'
}).then(()=> console.log(`Server is running on port: ${PORT}`))