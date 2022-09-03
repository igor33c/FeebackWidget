import { FeedbacksRepository } from "../feedbacks-repositores";
import { FeedbackCreateData } from "../feedbacks-repositores";
import { prisma } from "../../prisma"

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({type, comment, screenshot}: FeedbackCreateData){
        await prisma.feedBack.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })

    }
}