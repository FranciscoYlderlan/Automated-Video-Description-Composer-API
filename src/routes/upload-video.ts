import { FastifyInstance } from "fastify"
import { fastifyMultipart } from "@fastify/multipart"

import { prisma } from '../lib/prisma.ts'


import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'

const pump = promisify(pipeline)


export async function uploadVideoRoute(app : FastifyInstance) {
    
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 25, // 25mb 
        }
    })

    app.post('/videos', async (req, rep) => {
        const data  = await req.file()
        const validFormat = '.mp3'
        if (!data) {
            return rep.status(400).send({error: 'Arquivo não encontrado.'})
        }
        
        const extension = path.extname(data.filename)

        if (extension !== validFormat) {
            return rep.status(400).send({error:`Arquivo inválido, apenas arquivos ${validFormat}`})
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        const uploadDestination = path.resolve(__dirname, '../../temp', fileUploadName)
        
        await pump(data.file, fs.createWriteStream(uploadDestination))
        
    })
}