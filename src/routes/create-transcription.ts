import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from '../lib/prisma.ts';

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

        return {
            id,
            prompt,
        }
    })
}