import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from '../lib/prisma.ts';

import {createReadStream} from 'node:fs'

export async function createTranscriptionRoute(app : FastifyInstance) {
    
    app.post('/videos/:id/transcription', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid() 
        })
        
        const { id } = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            prompt: z.string() 
        })

        const { prompt } = bodySchema.parse(req.body)

        const video = await prisma.video.findUniqueOrThrow({
          where: {
            id:id,
          }
        })

        const videoPath =  video.path
        const audioReadStream = createReadStream(videoPath)

        

        return {
            id,
            prompt,
            videoPath,
        }
    })
}