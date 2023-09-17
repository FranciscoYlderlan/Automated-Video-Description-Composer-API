import { FastifyInstance } from "fastify";

import { z } from 'zod'

import { prisma } from '../lib/prisma.js';
import { openai } from '../lib/openai.js';

import {createReadStream} from 'node:fs'
import { json } from "stream/consumers";

export async function composerDescriptionAIRoute(app : FastifyInstance) {
    
    app.post('/videos/:id/transcription', async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid() 
        })
        
        const { id } = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            prompt: z.string() 
        })

        const { prompt } = bodySchema.parse(req.body)
