import {fastify} from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'

import {fastifyCors} from '@fastify/cors'
import { sql } from './db/connection.ts';
import dotenv from 'dotenv';

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

app.listen({ port: Number(PORT)}).then(() => {
    console.log("HTTP SERVER RUNNING!");
});

