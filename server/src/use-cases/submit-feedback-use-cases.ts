import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repositores"

interface SubmitfeedbackUseCasesRequest{
    type:string;
    comment:string;
    screenshot:string
} 

export class SubmitFeedbackUseCases{
    
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
     
    ) {}
    async execute(request: SubmitfeedbackUseCasesRequest){
        const { type, comment, screenshot} = request

        if(!type){
            throw new Error('no type wrote')
        }

        if(!comment){
            throw new Error('no comment wrote')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('invalid format')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })//envio de email \/
        await this.mailAdapter.sendMail({
            subject: 'novo feedback',
            body: [
                `<div>`,
                `<p> ${type}</p> ${comment}`,
                screenshot ? `<img src="${screenshot}" />`  : null,                 
                `</div>`
            ].join('\n')
            
        })

    }
}