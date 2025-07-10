import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { z } from 'zod/v4'
import { eq,desc } from 'drizzle-orm'

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms/:roomID/questions', {
        schema: {
            params: z.object({
                roomID: z.string(),

            }),
        },
    }, async(request) => {
        const {roomID} = request.params

        const result = await db
            .select({
                id:schema.questions.id,
                question:schema.questions.question,
                answer:schema.questions.answer,
                createdAt:schema.questions.createdAt
            })
            .from(schema.questions)
            .where(eq(schema.questions.roomID, roomID))
            .orderBy(desc(schema.questions.createdAt))

        return result
    })

}