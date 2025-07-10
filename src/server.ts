import {fastify} from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import {fastifyCors} from '@fastify/cors'
import dotenv from 'dotenv';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { createRoomRoute } from './http/routes/create-rooms.ts';
import { getRoomQuestions } from './http/routes/get-rooms-questions.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';

dotenv.config();

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
const PORT = process.env.PORT || 3333;

app.get('/health', () => {
    return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestions)
app.register(createQuestionRoute)

app.listen({ port: Number(PORT)}).then(() => {
    console.log("HTTP SERVER RUNNING!");
});

