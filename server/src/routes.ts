import express from 'express'
import nodemailer from 'nodemailer'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail'
import { prisma } from './prisma'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCases }from './use-cases/submit-feedback-use-cases'

export const routes = express.Router()


routes.post('/feedbacks', async(req, res) => {    
    const {type, comment, screenshot} = req.body    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter
    const submitFeedbackUseCases = new SubmitFeedbackUseCases(
        prismaFeedbacksRepository,
        nodemailerMailAdapter        
    )

    await submitFeedbackUseCases.execute({
        type,
        comment,
        screenshot
    })
    
        return res.status(201).send()
})