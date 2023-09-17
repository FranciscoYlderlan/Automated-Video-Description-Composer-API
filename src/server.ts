import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { composerDescriptionAIRoute } from './routes/composer-description-ai'

const PORT = 3333

const app = fastify()

app.register(fastifyCors, {
    origin: '*',
})

app.register(uploadVideoRoute)
app.register(getAllPromptsRoute)
app.register(createTranscriptionRoute)
app.register(composerDescriptionAIRoute)


//serviços de armazenamento
//amazon S3 aws
//cloundflare r2

app.listen({
    port: PORT, 
    host: '0.0.0.0'
}).then(()=> console.log(`Server is running on port: ${PORT}`))