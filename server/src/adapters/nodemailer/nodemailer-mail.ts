import nodemailer from 'nodemailer'
import { MailAdapter, sendMailData } from "../mail-adapters";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "10a225a2d661f2",
      pass: "89d3825417b1bd"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({ subject, body}: sendMailData){
        //para usar subjec e bod precisamos: sendMailData, de onde vem os parametros
        await transport.sendMail({
            from: 'equipeFeedget <oi@feedget.com>',
            to: 'Igor Augusto <igoraugusto33@gmail.com',
            subject: subject,
            html: body,
        });
    }
        
    
}