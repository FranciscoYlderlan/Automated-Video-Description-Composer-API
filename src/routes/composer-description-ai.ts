import { FastifyInstance } from "fastify";

import { z } from 'zod'

import { prisma } from '../lib/prisma.js';
import { openai } from '../lib/openai.js';

import {createReadStream} from 'node:fs'
import { json } from "stream/consumers";

export async function composerDescriptionAIRoute(app : FastifyInstance) {
    
    app.post('/ai/composer', async (req, rep) => {
       
        const bodySchema = z.object({
            id: z.string().uuid(),
            template: z.string(),
            temperature: z.number().min(0).max(1).default(0.5),
        })

        const { id, template, temperature } = bodySchema.parse(req.body)

        const video = await prisma.video.findUniqueOrThrow({
            where:{
                id
            }
        })

        if(!video.transcription) {
            return rep.status(400).send({ error: "O vídeo não gerou transcrição"})
        }

        const promptMessage =  template.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            temperature,
            messages: [ {
                role: 'user', content: promptMessage,
            }]
        })

        return {
            response
        }
    })
}