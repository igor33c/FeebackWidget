import { SubmitFeedbackUseCases } from './submit-feedback-use-cases'

const createSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCases(
    { create: createSpy},
    { sendMail: sendMailSpy }
)

describe('Submit Feedback', () =>{

    it('should be able to submit a feedback', async () => {    
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example',
            screenshot: 'data:image/png;base64,98612312'
        })).resolves.not.toThrow()
        expect(createSpy).toHaveBeenCalled
        expect(sendMailSpy).toHaveBeenCalled
    });
    it('should not', async () => {    
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example',
            screenshot: 'data:image/png;base64,986123121clear'
        })).rejects.toThrow()
    });
    
    it('fail comment', async () => {    
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,986123121clear'
        })).rejects.toThrow()
    });

    it('screenshot', async () => {    
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example',
            screenshot: '321'
        })).rejects.toThrow()
    });    
       
})